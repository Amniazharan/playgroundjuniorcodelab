import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'

// Pizza Base Blocks
Blockly.Blocks['pizza_base_thin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍞 Thin Crust Base')
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Start with a thin crust pizza base')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['pizza_base_thick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍞 Thick Crust Base')
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Start with a thick crust pizza base')
    this.setHelpUrl('')
  }
}

// Topping Blocks
Blockly.Blocks['add_cheese'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🧀 Add Cheese')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add cheese layer')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_tomato'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍅 Add Tomato')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add tomato sauce')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_mushroom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍄 Add Mushroom')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add mushroom topping')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_pepperoni'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🥓 Add Pepperoni')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add pepperoni topping')
    this.setHelpUrl('')
  }
}

// Action Block
Blockly.Blocks['bake_pizza'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔥 Bake Pizza!')
    this.setPreviousStatement(true, null)
    this.setColour('#FF6347')
    this.setTooltip('Bake the pizza')
    this.setHelpUrl('')
  }
}

// Python Code Generators
pythonGenerator.forBlock['pizza_base_thin'] = function(block) {
  return 'add_base("thin")\n'
}

pythonGenerator.forBlock['pizza_base_thick'] = function(block) {
  return 'add_base("thick")\n'
}

pythonGenerator.forBlock['add_cheese'] = function(block) {
  return 'add_topping("cheese")\n'
}

pythonGenerator.forBlock['add_tomato'] = function(block) {
  return 'add_topping("tomato")\n'
}

pythonGenerator.forBlock['add_mushroom'] = function(block) {
  return 'add_topping("mushroom")\n'
}

pythonGenerator.forBlock['add_pepperoni'] = function(block) {
  return 'add_topping("pepperoni")\n'
}

pythonGenerator.forBlock['bake_pizza'] = function(block) {
  return 'bake_pizza()\n'
}

export default {}
