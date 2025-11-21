import { useEffect, useRef, useState } from 'react'
import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'

export default function BlocklyWorkspace({ toolbox, onCodeGenerated, exercise }) {
  const blocklyDiv = useRef(null)
  const workspaceRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!blocklyDiv.current || workspaceRef.current) return

    // Check if mobile/small screen
    const isMobile = window.innerWidth < 768

    // Initialize Blockly workspace
    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox,
      scrollbars: true,
      trashcan: true,
      zoom: {
        controls: true,
        wheel: true,
        startScale: isMobile ? 0.8 : 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#e5e7eb',
        snap: true
      },
      move: {
        scrollbars: {
          horizontal: true,
          vertical: true
        },
        drag: true,
        wheel: true
      },
      toolboxPosition: isMobile ? 'end' : 'start',
      horizontalLayout: false,
      renderer: 'zelos'
    })

    workspaceRef.current = workspace
    setIsReady(true)

    // Cleanup
    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose()
        workspaceRef.current = null
      }
    }
  }, [toolbox])

  const handleRunCode = () => {
    if (!workspaceRef.current) return

    try {
      // Generate Python code from blocks
      const code = pythonGenerator.workspaceToCode(workspaceRef.current)

      if (onCodeGenerated) {
        onCodeGenerated(code)
      }
    } catch (error) {
      console.error('Error generating code:', error)
    }
  }

  const handleReset = () => {
    if (!workspaceRef.current) return

    if (confirm('Reset workspace? All blocks will be removed.')) {
      workspaceRef.current.clear()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Action Buttons */}
      <div className="bg-white border-b px-4 py-3 flex gap-2">
        <button
          onClick={handleRunCode}
          disabled={!isReady}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>�</span> Run Code
        </button>
        <button
          onClick={handleReset}
          disabled={!isReady}
          className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>=</span> Reset
        </button>
      </div>

      {/* Blockly Workspace */}
      <div
        ref={blocklyDiv}
        className="flex-1 bg-gray-50 w-full h-full"
        style={{ minHeight: '400px', minWidth: '100%' }}
      />
    </div>
  )
}
