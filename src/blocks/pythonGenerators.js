import { pythonGenerator } from 'blockly/python'

// This file contains all Python code generators for our custom blocks

// ==================== PIZZA BLOCKS ====================
pythonGenerator.forBlock['pizza_base_thin'] = function() {
  return 'add_base("thin")\n'
}

pythonGenerator.forBlock['pizza_base_thick'] = function() {
  return 'add_base("thick")\n'
}

pythonGenerator.forBlock['add_cheese'] = function() {
  return 'add_topping("cheese")\n'
}

pythonGenerator.forBlock['add_tomato'] = function() {
  return 'add_topping("tomato")\n'
}

pythonGenerator.forBlock['add_mushroom'] = function() {
  return 'add_topping("mushroom")\n'
}

pythonGenerator.forBlock['add_pepperoni'] = function() {
  return 'add_topping("pepperoni")\n'
}

pythonGenerator.forBlock['bake_pizza'] = function() {
  return 'bake_pizza()\n'
}

// ==================== BURGER BLOCKS ====================
pythonGenerator.forBlock['burger_bun_bottom'] = function() {
  return 'add_bottom_bun()\n'
}

pythonGenerator.forBlock['burger_bun_top'] = function() {
  return 'add_top_bun()\n'
}

pythonGenerator.forBlock['add_patty'] = function() {
  return 'add_layer("patty")\n'
}

pythonGenerator.forBlock['add_burger_cheese'] = function() {
  return 'add_layer("cheese")\n'
}

pythonGenerator.forBlock['add_lettuce'] = function() {
  return 'add_layer("lettuce")\n'
}

pythonGenerator.forBlock['add_burger_tomato'] = function() {
  return 'add_layer("tomato")\n'
}

// ==================== ICE CREAM BLOCKS ====================
pythonGenerator.forBlock['ice_cream_cone'] = function() {
  return 'set_base("cone")\n'
}

pythonGenerator.forBlock['ice_cream_cup'] = function() {
  return 'set_base("cup")\n'
}

pythonGenerator.forBlock['scoop_vanilla'] = function() {
  return 'add_scoop("vanilla")\n'
}

pythonGenerator.forBlock['scoop_chocolate'] = function() {
  return 'add_scoop("chocolate")\n'
}

pythonGenerator.forBlock['scoop_strawberry'] = function() {
  return 'add_scoop("strawberry")\n'
}

pythonGenerator.forBlock['scoop_mint'] = function() {
  return 'add_scoop("mint")\n'
}

pythonGenerator.forBlock['add_sprinkles'] = function() {
  return 'add_topping("sprinkles")\n'
}

pythonGenerator.forBlock['add_cherry'] = function() {
  return 'add_topping("cherry")\n'
}

pythonGenerator.forBlock['add_chocolate_sauce'] = function() {
  return 'add_topping("chocolate_sauce")\n'
}

// ==================== SNOWMAN BLOCKS ====================
pythonGenerator.forBlock['large_snowball'] = function() {
  return 'add_snowball("large")\n'
}

pythonGenerator.forBlock['medium_snowball'] = function() {
  return 'add_snowball("medium")\n'
}

pythonGenerator.forBlock['small_snowball'] = function() {
  return 'add_snowball("small")\n'
}

pythonGenerator.forBlock['add_eyes'] = function() {
  return 'add_accessory("eyes")\n'
}

pythonGenerator.forBlock['add_carrot_nose'] = function() {
  return 'add_accessory("nose")\n'
}

pythonGenerator.forBlock['add_buttons'] = function() {
  return 'add_accessory("buttons")\n'
}

pythonGenerator.forBlock['add_hat'] = function() {
  return 'add_accessory("hat")\n'
}

pythonGenerator.forBlock['add_scarf'] = function() {
  return 'add_accessory("scarf")\n'
}

// ==================== GARDEN BLOCKS ====================
pythonGenerator.forBlock['plant_flower'] = function() {
  return 'plant_seed("flower")\n'
}

pythonGenerator.forBlock['plant_tree'] = function() {
  return 'plant_seed("tree")\n'
}

pythonGenerator.forBlock['plant_grass'] = function() {
  return 'plant_seed("grass")\n'
}

pythonGenerator.forBlock['water_plants'] = function() {
  return 'water_plants()\n'
}

pythonGenerator.forBlock['add_sunshine'] = function() {
  return 'add_sunshine()\n'
}

pythonGenerator.forBlock['add_fertilizer'] = function() {
  return 'add_fertilizer()\n'
}

// ==================== RAINBOW BLOCKS ====================
pythonGenerator.forBlock['paint_red'] = function() {
  return 'paint_color("red")\n'
}

pythonGenerator.forBlock['paint_orange'] = function() {
  return 'paint_color("orange")\n'
}

pythonGenerator.forBlock['paint_yellow'] = function() {
  return 'paint_color("yellow")\n'
}

pythonGenerator.forBlock['paint_green'] = function() {
  return 'paint_color("green")\n'
}

pythonGenerator.forBlock['paint_blue'] = function() {
  return 'paint_color("blue")\n'
}

pythonGenerator.forBlock['paint_purple'] = function() {
  return 'paint_color("purple")\n'
}

pythonGenerator.forBlock['add_cloud'] = function() {
  return 'add_decoration("cloud")\n'
}

pythonGenerator.forBlock['add_sun'] = function() {
  return 'add_decoration("sun")\n'
}

// ==================== AQUARIUM BLOCKS ====================
pythonGenerator.forBlock['fill_water'] = function() {
  return 'fill_water()\n'
}

pythonGenerator.forBlock['add_sand'] = function() {
  return 'add_bottom("sand")\n'
}

pythonGenerator.forBlock['add_rocks'] = function() {
  return 'add_bottom("rocks")\n'
}

pythonGenerator.forBlock['add_goldfish'] = function() {
  return 'add_fish("goldfish")\n'
}

pythonGenerator.forBlock['add_clownfish'] = function() {
  return 'add_fish("clownfish")\n'
}

pythonGenerator.forBlock['add_angelfish'] = function() {
  return 'add_fish("angelfish")\n'
}

pythonGenerator.forBlock['add_seaweed'] = function() {
  return 'add_decoration("seaweed")\n'
}

pythonGenerator.forBlock['add_bubbles'] = function() {
  return 'add_decoration("bubbles")\n'
}

pythonGenerator.forBlock['add_castle'] = function() {
  return 'add_decoration("castle")\n'
}

// ==================== ROCKET BLOCKS ====================
pythonGenerator.forBlock['rocket_body'] = function() {
  return 'add_part("body")\n'
}

pythonGenerator.forBlock['rocket_nose'] = function() {
  return 'add_part("nose")\n'
}

pythonGenerator.forBlock['rocket_wings'] = function() {
  return 'add_part("wings")\n'
}

pythonGenerator.forBlock['rocket_engine'] = function() {
  return 'add_part("engine")\n'
}

pythonGenerator.forBlock['fuel_rocket'] = function() {
  return 'fuel_rocket()\n'
}

pythonGenerator.forBlock['launch_rocket'] = function() {
  return 'launch_rocket()\n'
}

// ==================== CAKE BLOCKS ====================
pythonGenerator.forBlock['chocolate_layer'] = function() {
  return 'add_layer("chocolate")\n'
}

pythonGenerator.forBlock['vanilla_layer'] = function() {
  return 'add_layer("vanilla")\n'
}

pythonGenerator.forBlock['strawberry_layer'] = function() {
  return 'add_layer("strawberry")\n'
}

pythonGenerator.forBlock['pink_frosting'] = function() {
  return 'add_frosting("pink")\n'
}

pythonGenerator.forBlock['white_frosting'] = function() {
  return 'add_frosting("white")\n'
}

pythonGenerator.forBlock['chocolate_frosting'] = function() {
  return 'add_frosting("chocolate")\n'
}

pythonGenerator.forBlock['add_cake_sprinkles'] = function() {
  return 'add_decoration("sprinkles")\n'
}

pythonGenerator.forBlock['add_strawberries'] = function() {
  return 'add_decoration("strawberries")\n'
}

pythonGenerator.forBlock['add_candles'] = function() {
  return 'add_decoration("candles")\n'
}

// ==================== TRAFFIC LIGHT BLOCKS ====================
pythonGenerator.forBlock['build_pole'] = function() {
  return 'build_pole()\n'
}

pythonGenerator.forBlock['attach_lights'] = function() {
  return 'attach_lights()\n'
}

pythonGenerator.forBlock['light_red'] = function() {
  return 'turn_on_light("red")\n'
}

pythonGenerator.forBlock['light_yellow'] = function() {
  return 'turn_on_light("yellow")\n'
}

pythonGenerator.forBlock['light_green'] = function() {
  return 'turn_on_light("green")\n'
}

// ==================== CONTROL FLOW BLOCKS ====================
pythonGenerator.forBlock['controls_if_simple'] = function(block) {
  const condition = pythonGenerator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False'
  const branch = pythonGenerator.statementToCode(block, 'DO')
  return `if ${condition}:\n${branch || pythonGenerator.INDENT + 'pass\n'}`
}

pythonGenerator.forBlock['controls_if_else'] = function(block) {
  const condition = pythonGenerator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False'
  const branchIf = pythonGenerator.statementToCode(block, 'DO')
  const branchElse = pythonGenerator.statementToCode(block, 'ELSE')
  return `if ${condition}:\n${branchIf || pythonGenerator.INDENT + 'pass\n'}else:\n${branchElse || pythonGenerator.INDENT + 'pass\n'}`
}

pythonGenerator.forBlock['controls_repeat'] = function(block) {
  const times = block.getFieldValue('TIMES')
  const branch = pythonGenerator.statementToCode(block, 'DO')
  return `for i in range(${times}):\n${branch || pythonGenerator.INDENT + 'pass\n'}`
}

pythonGenerator.forBlock['controls_for_each'] = function(block) {
  const branch = pythonGenerator.statementToCode(block, 'DO')
  return `# For each loop\n${branch || 'pass\n'}`
}

pythonGenerator.forBlock['logic_compare'] = function(block) {
  const operators = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  }
  const operator = operators[block.getFieldValue('OP')]
  const valueA = pythonGenerator.valueToCode(block, 'A', pythonGenerator.ORDER_RELATIONAL) || '0'
  const valueB = pythonGenerator.valueToCode(block, 'B', pythonGenerator.ORDER_RELATIONAL) || '0'
  return [`${valueA} ${operator} ${valueB}`, pythonGenerator.ORDER_RELATIONAL]
}

pythonGenerator.forBlock['logic_boolean'] = function(block) {
  const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'True' : 'False'
  return [code, pythonGenerator.ORDER_ATOMIC]
}

pythonGenerator.forBlock['math_number'] = function(block) {
  const code = block.getFieldValue('NUM')
  return [code, pythonGenerator.ORDER_ATOMIC]
}

export default {}
