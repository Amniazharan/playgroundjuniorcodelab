import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Burger Bun Blocks
Blockly.Blocks['burger_bun_bottom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍞 Bottom Bun')
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Start with bottom bun')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['burger_bun_top'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍞 Top Bun')
    this.setPreviousStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Finish with top bun')
    this.setHelpUrl('')
  }
}

// Filling Blocks
Blockly.Blocks['add_patty'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🥩 Add Patty')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add beef patty')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_burger_cheese'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🧀 Add Cheese')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add cheese slice')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_lettuce'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🥬 Add Lettuce')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add fresh lettuce')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_burger_tomato'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍅 Add Tomato')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add tomato slice')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['burger_bun_bottom'] = function(block) {
  return 'addBottomBun();\n'
}

javascriptGenerator.forBlock['burger_bun_top'] = function(block) {
  return 'addTopBun();\n'
}

javascriptGenerator.forBlock['add_patty'] = function(block) {
  return 'addLayer("patty");\n'
}

javascriptGenerator.forBlock['add_burger_cheese'] = function(block) {
  return 'addLayer("cheese");\n'
}

javascriptGenerator.forBlock['add_lettuce'] = function(block) {
  return 'addLayer("lettuce");\n'
}

javascriptGenerator.forBlock['add_burger_tomato'] = function(block) {
  return 'addLayer("tomato");\n'
}

export default {}
