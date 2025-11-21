import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

// Structure Blocks
Blockly.Blocks['build_pole'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🏗️ Build Pole')
    this.setNextStatement(true, null)
    this.setColour('#708090')
    this.setTooltip('Build traffic light pole')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['attach_lights'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💡 Attach Lights')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#708090')
    this.setTooltip('Attach light housing')
    this.setHelpUrl('')
  }
}

// Light Control Blocks
Blockly.Blocks['light_red'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔴 Turn Red ON')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Turn on red light (STOP)')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['light_yellow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🟡 Turn Yellow ON')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Turn on yellow light (READY)')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['light_green'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🟢 Turn Green ON')
    this.setPreviousStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Turn on green light (GO)')
    this.setHelpUrl('')
  }
}

// Code Generators
javascriptGenerator.forBlock['build_pole'] = function(block) {
  return 'buildPole();\n'
}

javascriptGenerator.forBlock['attach_lights'] = function(block) {
  return 'attachLights();\n'
}

javascriptGenerator.forBlock['light_red'] = function(block) {
  return 'turnOnLight("red");\n'
}

javascriptGenerator.forBlock['light_yellow'] = function(block) {
  return 'turnOnLight("yellow");\n'
}

javascriptGenerator.forBlock['light_green'] = function(block) {
  return 'turnOnLight("green");\n'
}

export default {}
