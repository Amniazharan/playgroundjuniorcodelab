import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'

// Stage Blocks - Butterfly Life Cycle
Blockly.Blocks['add_egg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🥚 Telur (Egg)')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#90EE90')
    this.setTooltip('Stage 1: Kupu-kupu bermula sebagai telur kecil')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_caterpillar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🐛 Ulat (Caterpillar)')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#90EE90')
    this.setTooltip('Stage 2: Telur menetas jadi ulat')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_chrysalis'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🟤 Kepompong (Chrysalis)')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#90EE90')
    this.setTooltip('Stage 3: Ulat buat kepompong')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_butterfly'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🦋 Kupu-kupu (Butterfly)')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#90EE90')
    this.setTooltip('Stage 4: Kepompong jadi kupu-kupu cantik!')
    this.setHelpUrl('')
  }
}

// Environment Blocks
Blockly.Blocks['add_leaf'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🍃 Daun (Leaf)')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#228B22')
    this.setTooltip('Tambah daun untuk telur dan ulat')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_flower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🌸 Bunga (Flower)')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FF69B4')
    this.setTooltip('Tambah bunga untuk kupu-kupu')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_sun'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('☀️ Matahari (Sun)')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Matahari untuk kehangatan')
    this.setHelpUrl('')
  }
}

// Python Code Generators
pythonGenerator.forBlock['add_egg'] = function(block) {
  return 'add_stage("egg")\n'
}

pythonGenerator.forBlock['add_caterpillar'] = function(block) {
  return 'add_stage("caterpillar")\n'
}

pythonGenerator.forBlock['add_chrysalis'] = function(block) {
  return 'add_stage("chrysalis")\n'
}

pythonGenerator.forBlock['add_butterfly'] = function(block) {
  return 'add_stage("butterfly")\n'
}

pythonGenerator.forBlock['add_leaf'] = function(block) {
  return 'add_environment("leaf")\n'
}

pythonGenerator.forBlock['add_flower'] = function(block) {
  return 'add_environment("flower")\n'
}

pythonGenerator.forBlock['add_sun'] = function(block) {
  return 'add_environment("sun")\n'
}

export default {}
