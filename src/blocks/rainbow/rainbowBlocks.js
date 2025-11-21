import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Color Blocks
Blockly.Blocks['paint_red'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔴 Paint Red')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Paint red arc')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['paint_orange'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🟠 Paint Orange')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Paint orange arc')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['paint_yellow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🟡 Paint Yellow')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Paint yellow arc')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['paint_green'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🟢 Paint Green')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Paint green arc')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['paint_blue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔵 Paint Blue')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Paint blue arc')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['paint_purple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🟣 Paint Purple')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFB6C1')
    this.setTooltip('Paint purple arc')
    this.setHelpUrl('')
  }
}

// Decoration Blocks
Blockly.Blocks['add_cloud'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('☁️ Add Cloud')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add a cloud')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_sun'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('☀️ Add Sun')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add the sun')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['paint_red'] = function(block) {
  return 'paintColor("red");\n'
}

javascriptGenerator.forBlock['paint_orange'] = function(block) {
  return 'paintColor("orange");\n'
}

javascriptGenerator.forBlock['paint_yellow'] = function(block) {
  return 'paintColor("yellow");\n'
}

javascriptGenerator.forBlock['paint_green'] = function(block) {
  return 'paintColor("green");\n'
}

javascriptGenerator.forBlock['paint_blue'] = function(block) {
  return 'paintColor("blue");\n'
}

javascriptGenerator.forBlock['paint_purple'] = function(block) {
  return 'paintColor("purple");\n'
}

javascriptGenerator.forBlock['add_cloud'] = function(block) {
  return 'addDecoration("cloud");\n'
}

javascriptGenerator.forBlock['add_sun'] = function(block) {
  return 'addDecoration("sun");\n'
}

// Condition Checker Blocks for Science Logic
Blockly.Blocks['has_cloud'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('☁️ has cloud (rain)?')
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('Check if there is cloud/rain')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['has_sun'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('☀️ has sun (light)?')
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('Check if there is sunlight')
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

Blockly.Blocks['logic_not'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('NOT')
    this.appendValueInput('BOOL')
        .setCheck('Boolean')
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('Returns the opposite of the input')
    this.setHelpUrl('')
  }
}

// Code Generators for Condition Checkers
javascriptGenerator.forBlock['has_cloud'] = function(block) {
  return ['hasCloud()', javascriptGenerator.ORDER_ATOMIC]
}

javascriptGenerator.forBlock['has_sun'] = function(block) {
  return ['hasSun()', javascriptGenerator.ORDER_ATOMIC]
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

javascriptGenerator.forBlock['logic_not'] = function(block) {
  const value = javascriptGenerator.valueToCode(block, 'BOOL', javascriptGenerator.ORDER_LOGICAL_NOT) || 'false'
  return [`!(${value})`, javascriptGenerator.ORDER_LOGICAL_NOT]
}

export default {}
