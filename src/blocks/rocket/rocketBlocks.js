import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Rocket Part Blocks
Blockly.Blocks['rocket_body'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🚀 Rocket Body')
    this.setNextStatement(true, null)
    this.setColour('#FF6347')
    this.setTooltip('Add rocket body')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['rocket_nose'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔺 Rocket Nose')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FF6347')
    this.setTooltip('Add nose cone')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['rocket_wings'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🪂 Rocket Wings')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FF6347')
    this.setTooltip('Add wings')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['rocket_engine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔥 Rocket Engine')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FF6347')
    this.setTooltip('Add engine')
    this.setHelpUrl('')
  }
}

// Action Blocks
Blockly.Blocks['fuel_rocket'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⛽ Fuel Rocket')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add fuel to rocket')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['launch_rocket'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🎆 Launch Rocket')
    this.setPreviousStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Launch the rocket!')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['rocket_body'] = function(block) {
  return 'addPart("body");\n'
}

javascriptGenerator.forBlock['rocket_nose'] = function(block) {
  return 'addPart("nose");\n'
}

javascriptGenerator.forBlock['rocket_wings'] = function(block) {
  return 'addPart("wings");\n'
}

javascriptGenerator.forBlock['rocket_engine'] = function(block) {
  return 'addPart("engine");\n'
}

javascriptGenerator.forBlock['fuel_rocket'] = function(block) {
  return 'fuelRocket();\n'
}

javascriptGenerator.forBlock['launch_rocket'] = function(block) {
  return 'launchRocket();\n'
}

export default {}
