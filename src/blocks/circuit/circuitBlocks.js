import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'

// Component Blocks
Blockly.Blocks['add_battery'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔋 Add Battery')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add battery (sumber tenaga)')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_bulb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💡 Add Bulb')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add light bulb (mentol)')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['connect_wire'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('➰ Connect Wire')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Connect components with wire')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['add_switch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔘 Add Switch')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FFD700')
    this.setTooltip('Add switch to control circuit')
    this.setHelpUrl('')
  }
}

// Action Blocks
Blockly.Blocks['turn_on_switch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('✅ Turn ON Switch')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#27AE60')
    this.setTooltip('Turn switch ON to complete circuit')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['turn_off_switch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('❌ Turn OFF Switch')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#E74C3C')
    this.setTooltip('Turn switch OFF to break circuit')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['close_circuit'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⚡ Close Circuit')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#FF6347')
    this.setTooltip('Complete the circuit to light up bulb')
    this.setHelpUrl('')
  }
}

// Python Code Generators
pythonGenerator.forBlock['add_battery'] = function(block) {
  return 'add_component("battery")\n'
}

pythonGenerator.forBlock['add_bulb'] = function(block) {
  return 'add_component("bulb")\n'
}

pythonGenerator.forBlock['connect_wire'] = function(block) {
  return 'add_component("wire")\n'
}

pythonGenerator.forBlock['add_switch'] = function(block) {
  return 'add_component("switch")\n'
}

pythonGenerator.forBlock['turn_on_switch'] = function(block) {
  return 'turn_on_switch()\n'
}

pythonGenerator.forBlock['turn_off_switch'] = function(block) {
  return 'turn_off_switch()\n'
}

pythonGenerator.forBlock['close_circuit'] = function(block) {
  return 'close_circuit()\n'
}

export default {}
