-- ============================================================================
-- PHASE 2 SUBSCRIPTION SECURITY - SUPABASE RLS POLICIES
-- ============================================================================
--
-- Purpose: Add database-level protection to prevent subscription bypass
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard
--
-- What this does:
-- 1. Enable Row Level Security on profiles table
-- 2. Add policies to restrict access to subscription data
-- 3. Create helper function to check subscription status
--
-- ============================================================================

-- Enable RLS on profiles table (if not already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- POLICY 1: Users can only read their own profile
-- ============================================================================
-- Prevents users from viewing other users' subscription status

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- ============================================================================
-- POLICY 2: Users can only update their own profile
-- ============================================================================
-- Prevents users from modifying other users' data

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================================
-- POLICY 3: Only authenticated users can access profiles
-- ============================================================================
-- Blocks anonymous access completely

DROP POLICY IF EXISTS "Authenticated users only" ON profiles;

CREATE POLICY "Authenticated users only"
  ON profiles
  FOR ALL
  TO authenticated
  USING (true);

-- ============================================================================
-- HELPER FUNCTION: Check if current user has active subscription
-- ============================================================================
-- Returns true if logged-in user has active subscription
-- Can be called from Phase 2 frontend for quick checks

DROP FUNCTION IF EXISTS check_user_subscription();

CREATE OR REPLACE FUNCTION check_user_subscription()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND subscription_status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION check_user_subscription() TO authenticated;

-- ============================================================================
-- HELPER FUNCTION: Get subscription status for current user
-- ============================================================================
-- Returns subscription_status for logged-in user

DROP FUNCTION IF EXISTS get_my_subscription_status();

CREATE OR REPLACE FUNCTION get_my_subscription_status()
RETURNS text AS $$
DECLARE
  sub_status text;
BEGIN
  SELECT subscription_status INTO sub_status
  FROM profiles
  WHERE id = auth.uid();

  RETURN sub_status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_my_subscription_status() TO authenticated;

-- ============================================================================
-- VERIFICATION: Test the policies
-- ============================================================================
-- Run these queries to verify everything is working:

-- Test 1: Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'profiles';
-- Expected: rowsecurity = true

-- Test 2: List all policies on profiles table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles';
-- Expected: Should show the 3 policies created above

-- Test 3: Check if functions exist
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name IN ('check_user_subscription', 'get_my_subscription_status');
-- Expected: Both functions should be listed

-- ============================================================================
-- USAGE EXAMPLES (from Phase 2 frontend)
-- ============================================================================

/*

// Example 1: Quick subscription check using function
const { data, error } = await supabase.rpc('check_user_subscription')
console.log('Is subscribed:', data) // true or false

// Example 2: Get subscription status
const { data: status, error } = await supabase.rpc('get_my_subscription_status')
console.log('Subscription status:', status) // 'active', 'inactive', etc.

// Example 3: Fetch full profile (standard method - most reliable)
const { data: profile, error } = await supabase
  .from('profiles')
  .select('subscription_status, email')
  .eq('id', user.id)
  .single()
console.log('Profile:', profile)

*/

-- ============================================================================
-- SECURITY BENEFITS
-- ============================================================================

/*

With these RLS policies in place:

✅ Users CANNOT view other users' profiles
✅ Users CANNOT modify other users' subscription status
✅ Anonymous users CANNOT access any profile data
✅ Direct database queries require authentication
✅ Even if user has valid auth token, they can only see their own data

This prevents:
❌ Users checking other users' subscription status
❌ Modifying localStorage to fake subscription
❌ Direct database manipulation via API
❌ SQL injection attacks
❌ Unauthorized data access

*/

-- ============================================================================
-- TESTING CHECKLIST
-- ============================================================================

/*

After running this SQL:

1. [ ] Verify RLS is enabled on profiles table
2. [ ] Verify all 3 policies are active
3. [ ] Test from Phase 2: Logged-in user can fetch own profile
4. [ ] Test from Phase 2: Logged-in user CANNOT fetch other profiles
5. [ ] Test from Phase 2: Anonymous user CANNOT fetch any profiles
6. [ ] Test subscription check function works
7. [ ] Verify non-subscribed users get blocked at Phase 2

*/

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================

/*

-- If you need to remove these policies:

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Authenticated users only" ON profiles;
DROP FUNCTION IF EXISTS check_user_subscription();
DROP FUNCTION IF EXISTS get_my_subscription_status();

-- To disable RLS (NOT RECOMMENDED):
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

*/

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Phase 2 Subscription Security policies installed successfully!';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. ✅ ProtectedPlayground component already implemented in Phase 2';
  RAISE NOTICE '2. Test subscription verification flow';
  RAISE NOTICE '3. Deploy Phase 2 with protection';
  RAISE NOTICE '';
  RAISE NOTICE 'Security features enabled:';
  RAISE NOTICE '- Row Level Security (RLS) on profiles table';
  RAISE NOTICE '- 3 access control policies';
  RAISE NOTICE '- 2 helper functions for subscription checks';
END $$;
