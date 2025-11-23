-- ============================================================================
-- DIAGNOSTIC: Check Profiles Table Structure
-- ============================================================================
-- Run this in Supabase SQL Editor to verify your table setup
-- ============================================================================

-- 1. Check if profiles table exists
SELECT
  table_name,
  table_schema
FROM information_schema.tables
WHERE table_name = 'profiles';
-- Expected: Should return 1 row with table_name = 'profiles'

-- 2. Check all columns in profiles table
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;
-- Expected: Should show id, email, subscription_status, full_name, etc.

-- 3. Check if subscription_status column exists
SELECT EXISTS (
  SELECT 1
  FROM information_schema.columns
  WHERE table_name = 'profiles'
  AND column_name = 'subscription_status'
) as subscription_status_exists;
-- Expected: true

-- 4. Sample data from profiles (first 5 rows)
SELECT
  id,
  email,
  subscription_status,
  created_at
FROM profiles
LIMIT 5;
-- Expected: Shows your actual profile data

-- 5. Check subscription status values in use
SELECT
  subscription_status,
  COUNT(*) as count
FROM profiles
GROUP BY subscription_status;
-- Expected: Shows distribution (e.g., 'active': 10, 'inactive': 50)

-- ============================================================================
-- IF SUBSCRIPTION_STATUS COLUMN MISSING - ADD IT
-- ============================================================================

-- Uncomment and run ONLY if subscription_status column doesn't exist:

/*
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';

-- Add check constraint for valid values
ALTER TABLE profiles
ADD CONSTRAINT valid_subscription_status
CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'expired'));

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status
ON profiles(subscription_status);

-- Update existing users (example - adjust as needed)
-- Set all to inactive by default
UPDATE profiles
SET subscription_status = 'inactive'
WHERE subscription_status IS NULL;
*/

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'profiles';
-- Expected: rls_enabled = true

-- List all RLS policies on profiles
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as command,
  qual as using_expression
FROM pg_policies
WHERE tablename = 'profiles';
-- Expected: Shows your RLS policies

-- ============================================================================
-- TEST QUERY AS AUTHENTICATED USER
-- ============================================================================

-- This simulates what Phase 2 app does
-- Replace 'YOUR-USER-ID' with actual user ID for testing

/*
SELECT
  id,
  email,
  subscription_status,
  full_name
FROM profiles
WHERE id = 'YOUR-USER-ID';
*/

-- ============================================================================
-- COMMON ISSUES & FIXES
-- ============================================================================

/*

ISSUE 1: Column 'subscription_status' doesn't exist
FIX: Run the ALTER TABLE command above to add the column

ISSUE 2: RLS blocking all queries (PGRST116 error)
FIX: Make sure you have this policy:

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

ISSUE 3: No data returned for authenticated user
FIX: Check that:
- User's ID exists in profiles table
- RLS policies allow user to see their own row
- auth.uid() returns correct user ID

ISSUE 4: Subscription status always 'inactive'
FIX: Update the specific user's status:

UPDATE profiles
SET subscription_status = 'active'
WHERE email = 'test@example.com';

*/

-- ============================================================================
-- QUICK FIX: Make test user active for testing
-- ============================================================================

-- Uncomment and modify to test with your account:

/*
UPDATE profiles
SET subscription_status = 'active'
WHERE email = 'YOUR-EMAIL@example.com';

-- Verify it worked
SELECT email, subscription_status
FROM profiles
WHERE email = 'YOUR-EMAIL@example.com';
*/

-- ============================================================================
-- SUCCESS CRITERIA
-- ============================================================================

/*

After running checks, you should have:

✅ profiles table exists
✅ subscription_status column exists (type: TEXT)
✅ RLS is enabled
✅ At least one policy allows SELECT
✅ Test user can query their own profile
✅ Test user has subscription_status = 'active' (for testing)

*/
