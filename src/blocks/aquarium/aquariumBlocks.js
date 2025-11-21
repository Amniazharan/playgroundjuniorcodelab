import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Setup Blocks
Blockly.Blocks['fill_water'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💧 Fill Water')
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Fill tank with water')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_sand'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🏖️ Add Sand')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add sand to bottom')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_rocks'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🪨 Add Rocks')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#87CEEB')
    this.setTooltip('Add rocks to bottom')
    this.setHelpUrl('')
  }
}

// Fish Blocks
Blockly.Blocks['add_goldfish'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🐠 Add Goldfish')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add a goldfish')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_clownfish'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🐟 Add Clownfish')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add a clownfish')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_angelfish'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🐡 Add Angelfish')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add an angelfish')
    this.setHelpUrl('')
  }
}

// Decoration Blocks
Blockly.Blocks['add_seaweed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌿 Add Seaweed')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#98FB98')
    this.setTooltip('Add seaweed plant')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_bubbles'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💭 Add Bubbles')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#98FB98')
    this.setTooltip('Add bubbles')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_castle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🏰 Add Castle')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#98FB98')
    this.setTooltip('Add castle decoration')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['fill_water'] = function(block) {
  return 'fillWater();\n'
}

javascriptGenerator.forBlock['add_sand'] = function(block) {
  return 'addBottom("sand");\n'
}

javascriptGenerator.forBlock['add_rocks'] = function(block) {
  return 'addBottom("rocks");\n'
}

javascriptGenerator.forBlock['add_goldfish'] = function(block) {
  return 'addFish("goldfish");\n'
}

javascriptGenerator.forBlock['add_clownfish'] = function(block) {
  return 'addFish("clownfish");\n'
}

javascriptGenerator.forBlock['add_angelfish'] = function(block) {
  return 'addFish("angelfish");\n'
}

javascriptGenerator.forBlock['add_seaweed'] = function(block) {
  return 'addDecoration("seaweed");\n'
}

javascriptGenerator.forBlock['add_bubbles'] = function(block) {
  return 'addDecoration("bubbles");\n'
}

javascriptGenerator.forBlock['add_castle'] = function(block) {
  return 'addDecoration("castle");\n'
}

export default {}
