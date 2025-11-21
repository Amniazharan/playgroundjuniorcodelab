import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// If-Else Block
Blockly.Blocks['controls_if_simple'] = {
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('if')
    this.appendStatementInput('DO')
        .appendField('do')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFAB19')
    this.setTooltip('If condition is true, do something')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['controls_if_else'] = {
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('if')
    this.appendStatementInput('DO')
        .appendField('do')
    this.appendStatementInput('ELSE')
        .appendField('else')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFAB19')
    this.setTooltip('If-else condition')
    this.setHelpUrl('')
  }
}

// Repeat Loop Block
Blockly.Blocks['controls_repeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('repeat')
        .appendField(new Blockly.FieldNumber(10, 1, 100), 'TIMES')
        .appendField('times')
    this.appendStatementInput('DO')
        .appendField('do')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFAB19')
    this.setTooltip('Repeat actions multiple times')
    this.setHelpUrl('')
  }
}

// For Each Loop
Blockly.Blocks['controls_for_each'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('for each item')
    this.appendStatementInput('DO')
        .appendField('do')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFAB19')
    this.setTooltip('Do something for each item')
    this.setHelpUrl('')
  }
}

// Comparison Blocks
Blockly.Blocks['logic_compare'] = {
  init: function() {
    this.appendValueInput('A')
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['<', 'LT'],
          ['≤', 'LTE'],
          ['>', 'GT'],
          ['≥', 'GTE']
        ]), 'OP')
    this.appendValueInput('B')
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('Compare two values')
    this.setHelpUrl('')
  }
}

// Boolean Values
Blockly.Blocks['logic_boolean'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['true', 'TRUE'],
          ['false', 'FALSE']
        ]), 'BOOL')
    this.setOutput(true, 'Boolean')
    this.setColour('#5CB1D6')
    this.setTooltip('Boolean value: true or false')
    this.setHelpUrl('')
  }
}

// Number Block
Blockly.Blocks['math_number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), 'NUM')
    this.setOutput(true, 'Number')
    this.setColour('#5C81A6')
    this.setTooltip('A number')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['controls_if_simple'] = function(block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'false'
  const branch = javascriptGenerator.statementToCode(block, 'DO')
  return `if (${condition}) {\n${branch}}\n`
}

javascriptGenerator.forBlock['controls_if_else'] = function(block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'false'
  const branchIf = javascriptGenerator.statementToCode(block, 'DO')
  const branchElse = javascriptGenerator.statementToCode(block, 'ELSE')
  return `if (${condition}) {\n${branchIf}} else {\n${branchElse}}\n`
}

javascriptGenerator.forBlock['controls_repeat'] = function(block) {
  const times = block.getFieldValue('TIMES')
  const branch = javascriptGenerator.statementToCode(block, 'DO')
  return `for (let i = 0; i < ${times}; i++) {\n${branch}}\n`
}

javascriptGenerator.forBlock['controls_for_each'] = function(block) {
  const branch = javascriptGenerator.statementToCode(block, 'DO')
  return `// For each loop\n${branch}`
}

javascriptGenerator.forBlock['logic_compare'] = function(block) {
  const operators = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  }
  const operator = operators[block.getFieldValue('OP')]
  const valueA = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_RELATIONAL) || '0'
  const valueB = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_RELATIONAL) || '0'
  return [`${valueA} ${operator} ${valueB}`, javascriptGenerator.ORDER_RELATIONAL]
}

javascriptGenerator.forBlock['logic_boolean'] = function(block) {
  const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false'
  return [code, javascriptGenerator.ORDER_ATOMIC]
}

javascriptGenerator.forBlock['math_number'] = function(block) {
  const code = block.getFieldValue('NUM')
  return [code, javascriptGenerator.ORDER_ATOMIC]
}

export default {}
