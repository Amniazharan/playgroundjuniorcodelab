import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Snowball Blocks
Blockly.Blocks['large_snowball'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⚪ Large Snowball')
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add large snowball (base)')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['medium_snowball'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⚪ Medium Snowball')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add medium snowball (middle)')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['small_snowball'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⚪ Small Snowball')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add small snowball (head)')
    this.setHelpUrl('')
  }
}

// Accessory Blocks
Blockly.Blocks['add_eyes'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('👀 Add Eyes')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add eyes to snowman')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_carrot_nose'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🥕 Add Carrot Nose')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add carrot nose')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_buttons'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔘 Add Buttons')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add buttons to body')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_hat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🎩 Add Hat')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add top hat')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_scarf'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🧣 Add Scarf')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add scarf')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['large_snowball'] = function(block) {
  return 'addSnowball("large");\n'
}

javascriptGenerator.forBlock['medium_snowball'] = function(block) {
  return 'addSnowball("medium");\n'
}

javascriptGenerator.forBlock['small_snowball'] = function(block) {
  return 'addSnowball("small");\n'
}

javascriptGenerator.forBlock['add_eyes'] = function(block) {
  return 'addAccessory("eyes");\n'
}

javascriptGenerator.forBlock['add_carrot_nose'] = function(block) {
  return 'addAccessory("nose");\n'
}

javascriptGenerator.forBlock['add_buttons'] = function(block) {
  return 'addAccessory("buttons");\n'
}

javascriptGenerator.forBlock['add_hat'] = function(block) {
  return 'addAccessory("hat");\n'
}

javascriptGenerator.forBlock['add_scarf'] = function(block) {
  return 'addAccessory("scarf");\n'
}

export default {}
