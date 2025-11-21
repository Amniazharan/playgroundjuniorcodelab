import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Plant Blocks
Blockly.Blocks['plant_flower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌸 Plant Flower')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#98FB98')
    this.setTooltip('Plant a flower')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['plant_tree'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌳 Plant Tree')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#98FB98')
    this.setTooltip('Plant a tree')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['plant_grass'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌱 Plant Grass')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#98FB98')
    this.setTooltip('Plant grass')
    this.setHelpUrl('')
  }
}

// Care Blocks
Blockly.Blocks['water_plants'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💧 Water Plants')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Water all plants')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_sunshine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('☀️ Add Sunshine')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add sunshine')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_fertilizer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌿 Add Fertilizer')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add fertilizer')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['plant_flower'] = function(block) {
  return 'plantSeed("flower");\n'
}

javascriptGenerator.forBlock['plant_tree'] = function(block) {
  return 'plantSeed("tree");\n'
}

javascriptGenerator.forBlock['plant_grass'] = function(block) {
  return 'plantSeed("grass");\n'
}

javascriptGenerator.forBlock['water_plants'] = function(block) {
  return 'waterPlants();\n'
}

javascriptGenerator.forBlock['add_sunshine'] = function(block) {
  return 'addSunshine();\n'
}

javascriptGenerator.forBlock['add_fertilizer'] = function(block) {
  return 'addFertilizer();\n'
}

// Condition Checker Blocks for Science Logic
Blockly.Blocks['has_water'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💧 has water?')
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('Check if garden has water')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['has_sunshine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('☀️ has sunshine?')
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('Check if garden has sunshine')
    this.setHelpUrl('')
  }
}

// Logic Operation Blocks
Blockly.Blocks['logic_and'] = {
  init: function() {
    this.appendValueInput('A')
        .setCheck('Boolean')
    this.appendDummyInput()
        .appendField('AND')
    this.appendValueInput('B')
        .setCheck('Boolean')
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('True if both conditions are true')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['logic_or'] = {
  init: function() {
    this.appendValueInput('A')
        .setCheck('Boolean')
    this.appendDummyInput()
        .appendField('OR')
    this.appendValueInput('B')
        .setCheck('Boolean')
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('True if either condition is true')
    this.setHelpUrl('')
  }
}

// Code Generators for Condition Checkers
javascriptGenerator.forBlock['has_water'] = function(block) {
  return ['hasWater()', javascriptGenerator.ORDER_ATOMIC]
}

javascriptGenerator.forBlock['has_sunshine'] = function(block) {
  return ['hasSunshine()', javascriptGenerator.ORDER_ATOMIC]
}

javascriptGenerator.forBlock['logic_and'] = function(block) {
  const valueA = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_AND) || 'false'
  const valueB = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_AND) || 'false'
  return [`(${valueA} && ${valueB})`, javascriptGenerator.ORDER_AND]
}

javascriptGenerator.forBlock['logic_or'] = function(block) {
  const valueA = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_OR) || 'false'
  const valueB = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_OR) || 'false'
  return [`(${valueA} || ${valueB})`, javascriptGenerator.ORDER_OR]
}

export default {}
