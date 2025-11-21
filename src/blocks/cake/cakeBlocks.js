import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Cake Layer Blocks
Blockly.Blocks['chocolate_layer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍫 Chocolate Layer')
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Add chocolate cake layer')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['vanilla_layer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🤍 Vanilla Layer')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Add vanilla cake layer')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['strawberry_layer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍓 Strawberry Layer')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Add strawberry cake layer')
    this.setHelpUrl('')
  }
}

// Frosting Blocks
Blockly.Blocks['pink_frosting'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💗 Pink Frosting')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add pink frosting')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['white_frosting'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🤍 White Frosting')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add white frosting')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['chocolate_frosting'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍫 Chocolate Frosting')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add chocolate frosting')
    this.setHelpUrl('')
  }
}

// Decoration Blocks
Blockly.Blocks['add_cake_sprinkles'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌈 Add Sprinkles')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add sprinkles')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_strawberries'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍓 Add Strawberries')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add strawberries on top')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_candles'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🕯️ Add Candles')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add birthday candles')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_chocolate_chips'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍫 Chocolate Chips')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add chocolate chips')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_rainbow_sprinkles'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('✨ Rainbow Sprinkles')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add rainbow sprinkles')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_stars'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⭐ Add Stars')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add star decorations')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_heart_decoration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💖 Heart Decoration')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add heart decoration')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['chocolate_layer'] = function(block) {
  return 'addLayer("chocolate");\n'
}

javascriptGenerator.forBlock['vanilla_layer'] = function(block) {
  return 'addLayer("vanilla");\n'
}

javascriptGenerator.forBlock['strawberry_layer'] = function(block) {
  return 'addLayer("strawberry");\n'
}

javascriptGenerator.forBlock['pink_frosting'] = function(block) {
  return 'addFrosting("pink");\n'
}

javascriptGenerator.forBlock['white_frosting'] = function(block) {
  return 'addFrosting("white");\n'
}

javascriptGenerator.forBlock['chocolate_frosting'] = function(block) {
  return 'addFrosting("chocolate");\n'
}

javascriptGenerator.forBlock['add_cake_sprinkles'] = function(block) {
  return 'addDecoration("sprinkles");\n'
}

javascriptGenerator.forBlock['add_strawberries'] = function(block) {
  return 'addDecoration("strawberries");\n'
}

javascriptGenerator.forBlock['add_candles'] = function(block) {
  return 'addDecoration("candles");\n'
}

javascriptGenerator.forBlock['add_chocolate_chips'] = function(block) {
  return 'addDecoration("chocolate_chips");\n'
}

javascriptGenerator.forBlock['add_rainbow_sprinkles'] = function(block) {
  return 'addDecoration("rainbow_sprinkles");\n'
}

javascriptGenerator.forBlock['add_stars'] = function(block) {
  return 'addDecoration("stars");\n'
}

javascriptGenerator.forBlock['add_heart_decoration'] = function(block) {
  return 'addDecoration("heart");\n'
}

export default {}
