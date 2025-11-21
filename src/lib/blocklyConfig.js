import * as Blockly from 'blockly';

export const playgroundTheme = Blockly.Theme.defineTheme('playground', {
  'base': Blockly.Themes.Classic,
  'blockStyles': {
    'logic_blocks': {
      'colourPrimary': '#FFB6C1',      // Pink
      'colourSecondary': '#FFC0CB',
      'colourTertiary': '#FF69B4'
    },
    'loop_blocks': {
      'colourPrimary': '#87CEEB',      // Sky blue
      'colourSecondary': '#ADD8E6',
      'colourTertiary': '#4682B4'
    },
    'math_blocks': {
      'colourPrimary': '#FFD700',      // Gold
      'colourSecondary': '#FFED4E',
      'colourTertiary': '#FFA500'
    },
    'data_blocks': {
      'colourPrimary': '#98FB98',      // Pale green
      'colourSecondary': '#90EE90',
      'colourTertiary': '#3CB371'
    },
    'shape_blocks': {
      'colourPrimary': '#DDA0DD',      // Plum
      'colourSecondary': '#EE82EE',
      'colourTertiary': '#BA55D3'
    }
  },
  'componentStyles': {
    'workspaceBackgroundColour': '#F8FAFC',
    'toolboxBackgroundColour': '#FFFFFF',
    'flyoutBackgroundColour': '#F1F5F9',
    'scrollbarColour': '#CBD5E1',
    'insertionMarkerColour': '#10B981',
    'insertionMarkerOpacity': 0.3
  },
  'fontStyle': {
    'family': 'Fredoka, system-ui, sans-serif',
    'weight': '500',
    'size': 14
  }
});