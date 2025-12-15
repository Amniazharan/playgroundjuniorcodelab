// Code executors to interpret Blockly-generated code into visual output

// Helper function to convert Python code to JavaScript
const pythonToJS = (pythonCode) => {
  let jsCode = pythonCode

  // Convert Python for loops to JavaScript
  jsCode = jsCode.replace(/for i in range\((\d+)\):/g, 'for (let i = 0; i < $1; i++) {')

  // Convert Python if statements to JavaScript
  jsCode = jsCode.replace(/if (.*?):/g, 'if ($1) {')
  jsCode = jsCode.replace(/else:/g, '} else {')

  // Convert Python True/False to JavaScript
  jsCode = jsCode.replace(/\bTrue\b/g, 'true')
  jsCode = jsCode.replace(/\bFalse\b/g, 'false')

  // Add closing braces for Python indented blocks
  // This is a simple approach - count indentation levels
  const lines = jsCode.split('\n')
  const result = []
  const indentStack = [0]

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '' || line.trim() === 'pass') continue

    // Calculate current indentation
    const match = line.match(/^(\s*)/)
    const currentIndent = match ? match[1].length : 0

    // Close braces if indentation decreased
    while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
      indentStack.pop()
      const closeBraceIndent = ' '.repeat(indentStack[indentStack.length - 1])
      result.push(closeBraceIndent + '}')
    }

    // Add current line (remove Python indentation, use JS style)
    result.push(line)

    // Track indentation for blocks
    if (line.includes('{') && !line.includes('}')) {
      indentStack.push(currentIndent + 2) // Expect next lines to be indented
    }
  }

  // Close any remaining open braces
  while (indentStack.length > 1) {
    indentStack.pop()
    const closeBraceIndent = ' '.repeat(indentStack[indentStack.length - 1])
    result.push(closeBraceIndent + '}')
  }

  return result.join('\n')
}

export const executePizzaCode = (code) => {
  const pizzaData = {
    base: null,
    toppings: [],
    baked: false
  }

  // Create safe execution environment with Python-style function names
  const add_base = (type) => {
    pizzaData.base = type
  }

  const add_topping = (topping) => {
    pizzaData.toppings.push(topping)
  }

  const bake_pizza = () => {
    pizzaData.baked = true
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('add_base', 'add_topping', 'bake_pizza', jsCode)
    executeCode(add_base, add_topping, bake_pizza)
  } catch (error) {
    console.error('Error executing pizza code:', error)
  }

  return pizzaData
}

export const executeBurgerCode = (code) => {
  const burgerData = {
    hasBottomBun: false,
    layers: [],
    hasTopBun: false
  }

  const add_bottom_bun = () => {
    burgerData.hasBottomBun = true
  }

  const add_top_bun = () => {
    burgerData.hasTopBun = true
  }

  const add_layer = (layer) => {
    burgerData.layers.push(layer)
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('add_bottom_bun', 'add_top_bun', 'add_layer', jsCode)
    executeCode(add_bottom_bun, add_top_bun, add_layer)
  } catch (error) {
    console.error('Error executing burger code:', error)
  }

  return burgerData
}

export const executeIceCreamCode = (code) => {
  const iceCreamData = {
    base: null,
    scoops: [],
    toppings: []
  }

  const set_base = (type) => {
    iceCreamData.base = type
  }

  const add_scoop = (flavor) => {
    if (iceCreamData.scoops.length < 10) { // Increased limit to support repeat blocks
      iceCreamData.scoops.push(flavor)
    }
  }

  const add_topping = (topping) => {
    iceCreamData.toppings.push(topping)
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('set_base', 'add_scoop', 'add_topping', jsCode)
    executeCode(set_base, add_scoop, add_topping)
  } catch (error) {
    console.error('Error executing ice cream code:', error)
  }

  return iceCreamData
}

// Snowman executor
export const executeSnowmanCode = (code) => {
  const snowmanData = {
    snowballs: [],
    accessories: []
  }

  const add_snowball = (size) => {
    snowmanData.snowballs.push(size)
  }

  const add_accessory = (type) => {
    snowmanData.accessories.push(type)
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('add_snowball', 'add_accessory', jsCode)
    executeCode(add_snowball, add_accessory)
  } catch (error) {
    console.error('Error executing snowman code:', error)
  }

  return snowmanData
}

// Garden executor
export const executeGardenCode = (code) => {
  const gardenData = {
    plants: [],
    watered: false,
    sunshine: false,
    fertilized: false
  }

  const plant_seed = (type) => {
    gardenData.plants.push(type)
  }

  const water_plants = () => {
    gardenData.watered = true
  }

  const add_sunshine = () => {
    gardenData.sunshine = true
  }

  const add_fertilizer = () => {
    gardenData.fertilized = true
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('plant_seed', 'water_plants', 'add_sunshine', 'add_fertilizer', jsCode)
    executeCode(plant_seed, water_plants, add_sunshine, add_fertilizer)
  } catch (error) {
    console.error('Error executing garden code:', error)
  }

  return gardenData
}

// Rainbow executor
export const executeRainbowCode = (code) => {
  const rainbowData = {
    colors: [],
    decorations: []
  }

  const paint_color = (color) => {
    rainbowData.colors.push(color)
  }

  const add_decoration = (decoration) => {
    rainbowData.decorations.push(decoration)
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('paint_color', 'add_decoration', jsCode)
    executeCode(paint_color, add_decoration)
  } catch (error) {
    console.error('Error executing rainbow code:', error)
  }

  return rainbowData
}

// Aquarium executor
export const executeAquariumCode = (code) => {
  const aquariumData = {
    water: false,
    bottom: [],
    fish: [],
    decorations: []
  }

  const fill_water = () => {
    aquariumData.water = true
  }

  const add_bottom = (type) => {
    aquariumData.bottom.push(type)
  }

  const add_fish = (type) => {
    aquariumData.fish.push(type)
  }

  const add_decoration = (decoration) => {
    aquariumData.decorations.push(decoration)
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('fill_water', 'add_bottom', 'add_fish', 'add_decoration', jsCode)
    executeCode(fill_water, add_bottom, add_fish, add_decoration)
  } catch (error) {
    console.error('Error executing aquarium code:', error)
  }

  return aquariumData
}

// Rocket executor
export const executeRocketCode = (code) => {
  const rocketData = {
    parts: [],
    fueled: false,
    launched: false
  }

  const add_part = (part) => {
    rocketData.parts.push(part)
  }

  const fuel_rocket = () => {
    rocketData.fueled = true
  }

  const launch_rocket = () => {
    rocketData.launched = true
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('add_part', 'fuel_rocket', 'launch_rocket', jsCode)
    executeCode(add_part, fuel_rocket, launch_rocket)
  } catch (error) {
    console.error('Error executing rocket code:', error)
  }

  return rocketData
}

// Cake executor
export const executeCakeCode = (code) => {
  const cakeData = {
    layers: [],
    frostings: [],
    decorations: []
  }

  const add_layer = (flavor) => {
    cakeData.layers.push(flavor)
  }

  const add_frosting = (color) => {
    cakeData.frostings.push(color)
  }

  const add_decoration = (decoration) => {
    cakeData.decorations.push(decoration)
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('add_layer', 'add_frosting', 'add_decoration', jsCode)
    executeCode(add_layer, add_frosting, add_decoration)
  } catch (error) {
    console.error('Error executing cake code:', error)
  }

  return cakeData
}

// Butterfly Metamorphosis executor
export const executeButterflyCode = (code) => {
  const butterflyData = {
    stages: [],
    environment: []
  }

  const add_stage = (stage) => {
    butterflyData.stages.push(stage)
  }

  const add_environment = (item) => {
    butterflyData.environment.push(item)
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('add_stage', 'add_environment', jsCode)
    executeCode(add_stage, add_environment)
  } catch (error) {
    console.error('Error executing butterfly code:', error)
  }

  return butterflyData
}

// Electric Circuit executor
export const executeCircuitCode = (code) => {
  const circuitData = {
    components: [],
    circuitClosed: false,
    switchOn: false
  }

  const add_component = (component) => {
    circuitData.components.push(component)
  }

  const close_circuit = () => {
    circuitData.circuitClosed = true
  }

  const turn_on_switch = () => {
    circuitData.switchOn = true
  }

  const turn_off_switch = () => {
    circuitData.switchOn = false
  }

  try {
    const jsCode = pythonToJS(code)
    const executeCode = new Function('add_component', 'close_circuit', 'turn_on_switch', 'turn_off_switch', jsCode)
    executeCode(add_component, close_circuit, turn_on_switch, turn_off_switch)
  } catch (error) {
    console.error('Error executing circuit code:', error)
  }

  return circuitData
}
