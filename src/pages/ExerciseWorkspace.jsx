import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExerciseById } from '../data/exercises'
import BlocklyWorkspace from '../components/BlocklyWorkspace'
import OutputCanvas from '../components/OutputCanvas'
import {
  executePizzaCode,
  executeBurgerCode,
  executeIceCreamCode,
  executeSnowmanCode,
  executeGardenCode,
  executeRainbowCode,
  executeAquariumCode,
  executeRocketCode,
  executeButterflyCode,
  executeCircuitCode
} from '../lib/codeExecutors'
import '../blocks/pizza/pizzaBlocks'
import '../blocks/burger/burgerBlocks'
import '../blocks/icecream/iceCreamBlocks'
import '../blocks/snowman/snowmanBlocks'
import '../blocks/garden/gardenBlocks'
import '../blocks/rainbow/rainbowBlocks'
import '../blocks/aquarium/aquariumBlocks'
import '../blocks/rocket/rocketBlocks'
import '../blocks/butterfly/butterflyBlocks'
import '../blocks/circuit/circuitBlocks'
import '../blocks/common/controlBlocks'
import '../blocks/pythonGenerators'

export default function ExerciseWorkspace() {
  const { id } = useParams()
  const navigate = useNavigate()
  const exercise = getExerciseById(id)
  const [output, setOutput] = useState(null)
  const [generatedCode, setGeneratedCode] = useState('')

  const handleCodeGenerated = (code) => {
    console.log('========= CODE GENERATION DEBUG =========')
    console.log('Generated code:', code)
    console.log('Exercise ID:', exercise.id, 'Type:', typeof exercise.id)
    console.log('Code length:', code ? code.length : 0)

    setGeneratedCode(code)

    // Check if code is empty
    if (!code || code.trim() === '') {
      console.warn('⚠️ No code generated - workspace might be empty')
      setOutput(null)
      return
    }

    // Execute code based on exercise ID
    let result
    try {
      switch (exercise.id) {
        case 1: // Pizza Builder
          console.log('🍕 Executing Pizza Code')
          result = executePizzaCode(code)
          break
        case 2: // Burger Builder
          console.log('🍔 Executing Burger Code')
          result = executeBurgerCode(code)
          break
        case 3: // Ice Cream Maker
          console.log('🍦 Executing Ice Cream Code')
          result = executeIceCreamCode(code)
          break
        case 4: // Snowman
          console.log('⛄ Executing Snowman Code')
          result = executeSnowmanCode(code)
          break
        case 5: // Garden
          console.log('🌻 Executing Garden Code')
          result = executeGardenCode(code)
          break
        case 6: // Rainbow
          console.log('🌈 Executing Rainbow Code')
          result = executeRainbowCode(code)
          break
        case 7: // Aquarium
          console.log('🐠 Executing Aquarium Code')
          result = executeAquariumCode(code)
          break
        case 8: // Rocket
          console.log('🚀 Executing Rocket Code')
          result = executeRocketCode(code)
          break
        case 9: // Butterfly
          console.log('🦋 Executing Butterfly Code')
          result = executeButterflyCode(code)
          break
        case 10: // Electric Circuit
          console.log('⚡ Executing Circuit Code')
          result = executeCircuitCode(code)
          break
        default:
          console.warn('❌ Unknown exercise ID:', exercise.id)
          result = null
      }

      console.log('✅ Execution result:', result)
      console.log('========================================')
    } catch (error) {
      console.error('❌ Error during execution:', error)
      result = null
    }

    setOutput(result)
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Exercise not found</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
            🎮 JuniorCodeLab
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-all"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Instruction Panel */}
        <div className="lg:w-[30%] bg-white p-4 sm:p-6 overflow-y-auto border-r h-auto lg:h-full">
          <div className="text-5xl mb-4">{exercise.emoji}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{exercise.title}</h1>

          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Instructions:</h2>
            <ol className="space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-gray-600 flex gap-2">
                  <span className="font-bold">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {exercise.hint && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">{exercise.hint}</p>
            </div>
          )}

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition-all"
          >
            Back to Dashboard
          </button>

          {exercise.prev && (
            <button
              onClick={() => navigate(`/exercise/${exercise.prev}`)}
              className="w-full mt-2 bg-gray-100 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-all"
            >
              Previous Exercise
            </button>
          )}

          {exercise.next && (
            <button
              onClick={() => navigate(`/exercise/${exercise.next}`)}
              className="w-full mt-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Next Exercise
            </button>
          )}
        </div>

        {/* Workspace Panel */}
        <div className="lg:w-[70%] flex flex-col h-[600px] lg:h-full">
          {/* Blockly Workspace */}
          <div className="flex-1 h-full">
            <BlocklyWorkspace
              toolbox={exercise.toolbox}
              onCodeGenerated={handleCodeGenerated}
            />
          </div>

          {/* Output Canvas and Code Display - Always visible after first run */}
          {(output || generatedCode) && (
            <div className="bg-gray-100 p-4 sm:p-6 border-t">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
                {/* Output Canvas */}
                <div className="flex justify-center items-start">
                  {output ? (
                    <OutputCanvas
                      exerciseId={exercise.id}
                      outputData={output}
                      width={350}
                      height={350}
                    />
                  ) : (
                    <div className="w-[350px] h-[350px] bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500 text-center px-4">
                        {generatedCode ? 'Output akan appear di sini' : 'Drag blocks dan click Run!'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Generated Code */}
                <div className="flex flex-col">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">💻</span>
                    Generated Code
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto flex-1">
                    <pre className="text-xs sm:text-sm text-green-400 font-mono leading-relaxed">
                      {generatedCode || '# Drag blocks dan click Run Code!'}
                    </pre>
                  </div>

                  {/* Code explanation */}
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs sm:text-sm text-blue-800">
                      <span className="font-semibold">💡 Tip:</span> Ini adalah Python code yang dihasilkan dari blocks kamu!
                      Setiap block bertukar jadi code yang komputer boleh faham.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
