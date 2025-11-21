import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Base Blocks
Blockly.Blocks['ice_cream_cone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍦 Cone Base')
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Start with a cone')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['ice_cream_cup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🥤 Cup Base')
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Start with a cup')
    this.setHelpUrl('')
  }
}

// Scoop Blocks
Blockly.Blocks['scoop_vanilla'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🤍 Vanilla Scoop')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add vanilla scoop')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['scoop_chocolate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🤎 Chocolate Scoop')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add chocolate scoop')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['scoop_strawberry'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💗 Strawberry Scoop')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add strawberry scoop')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['scoop_mint'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💚 Mint Scoop')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add mint scoop')
    this.setHelpUrl('')
  }
}

// Topping Blocks
Blockly.Blocks['add_sprinkles'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌈 Add Sprinkles')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add colorful sprinkles')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_cherry'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍒 Add Cherry')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add cherry on top')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_chocolate_sauce'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍫 Add Chocolate Sauce')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Drizzle chocolate sauce')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['ice_cream_cone'] = function(block) {
  return 'setBase("cone");\n'
}

javascriptGenerator.forBlock['ice_cream_cup'] = function(block) {
  return 'setBase("cup");\n'
}

javascriptGenerator.forBlock['scoop_vanilla'] = function(block) {
  return 'addScoop("vanilla");\n'
}

javascriptGenerator.forBlock['scoop_chocolate'] = function(block) {
  return 'addScoop("chocolate");\n'
}

javascriptGenerator.forBlock['scoop_strawberry'] = function(block) {
  return 'addScoop("strawberry");\n'
}

javascriptGenerator.forBlock['scoop_mint'] = function(block) {
  return 'addScoop("mint");\n'
}

javascriptGenerator.forBlock['add_sprinkles'] = function(block) {
  return 'addTopping("sprinkles");\n'
}

javascriptGenerator.forBlock['add_cherry'] = function(block) {
  return 'addTopping("cherry");\n'
}

javascriptGenerator.forBlock['add_chocolate_sauce'] = function(block) {
  return 'addTopping("chocolate_sauce");\n'
}

export default {}
