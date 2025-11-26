// Exercise definitions for JuniorCodeLab Playground
// Phase 2: Simplified flow with no scoring

export const categories = [
  { id: 'decomposition', name: 'Decomposition', emoji: '🧩', color: '#FFB6C1' },
  { id: 'patterns', name: 'Patterns', emoji: '🎨', color: '#87CEEB' },
  { id: 'algorithms', name: 'Algorithms', emoji: '🤖', color: '#FFD700' },
  { id: 'logic', name: 'Logic', emoji: '🧠', color: '#98FB98' },
  { id: 'loops', name: 'Loops', emoji: '🔁', color: '#DDA0DD' },
  { id: 'data', name: 'Data', emoji: '📊', color: '#FF6347' },
  { id: 'coding-terms', name: 'Belajar Term Coding', emoji: '📚', color: '#9370DB' }
]

export const exercises = [
  {
    id: 1,
    title: "Pizza Builder",
    emoji: "🍕",
    category: "decomposition",
    difficulty: "easy",
    duration: "10 min",
    description: "Susun blok untuk buat pizza yang sedap!",
    
    instructions: [
      "Pilih pizza base (thin atau thick)",
      "Tambah cheese sebagai lapisan pertama",
      "Pilih topping kesukaan kamu (boleh guna 'repeat' untuk tambah banyak!)",
      "Cuba guna block 'repeat 3 times' untuk tambah banyak pepperoni",
      "Guna 'if-else' untuk pilih topping based on condition",
      "Akhir sekali, bake pizza!"
    ],

    hint: "💡 Tip: Guna 'Control 🔁' blocks untuk repeat toppings! Contoh: Repeat 5 times → Add Pepperoni",
    
    // Blockly configuration
    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Bases 🍞",
          colour: "#FFB6C1",
          contents: [
            { kind: "block", type: "pizza_base_thin" },
            { kind: "block", type: "pizza_base_thick" }
          ]
        },
        {
          kind: "category",
          name: "Toppings 🧀",
          colour: "#FFD700",
          contents: [
            { kind: "block", type: "add_cheese" },
            { kind: "block", type: "add_tomato" },
            { kind: "block", type: "add_mushroom" },
            { kind: "block", type: "add_pepperoni" }
          ]
        },
        {
          kind: "category",
          name: "Actions 🔥",
          colour: "#FF6347",
          contents: [
            { kind: "block", type: "bake_pizza" }
          ]
        },
        {
          kind: "category",
          name: "Control 🔁",
          colour: "#FFAB19",
          contents: [
            { kind: "block", type: "controls_repeat" },
            { kind: "block", type: "controls_if_simple" },
            { kind: "block", type: "controls_if_else" }
          ]
        },
        {
          kind: "category",
          name: "Logic 🧠",
          colour: "#5CB1D6",
          contents: [
            { kind: "block", type: "logic_compare" },
            { kind: "block", type: "logic_boolean" },
            { kind: "block", type: "math_number" }
          ]
        }
      ]
    },
    
    // Output rendering
    output: {
      type: "animation",
      width: 400,
      height: 400,
      renderer: "pizzaRenderer"
    },
    
    // Navigation
    next: 2,
    prev: null
  },
  
  {
    id: 2,
    title: "Burger Builder",
    emoji: "🍔",
    category: "decomposition",
    difficulty: "easy",
    duration: "10 min",
    description: "Buat burger yang sedap dengan banyak layers!",

    instructions: [
      "Pilih burger bun (bottom)",
      "Guna 'repeat 2 times' untuk tambah 2 patties (double burger)!",
      "Letak cheese, lettuce, tomato",
      "Cuba guna 'if-else': Jika True → add cheese, Jika False → add lettuce",
      "Tutup dengan top bun!"
    ],

    hint: "💡 Tip: Burger mesti ada bun bawah dulu! Cuba 'repeat 3 times' + 'add cheese' untuk extra cheesy burger! 🧀",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Buns 🍞",
          colour: "#FFB6C1",
          contents: [
            { kind: "block", type: "burger_bun_bottom" },
            { kind: "block", type: "burger_bun_top" }
          ]
        },
        {
          kind: "category",
          name: "Fillings 🥩",
          colour: "#FFD700",
          contents: [
            { kind: "block", type: "add_patty" },
            { kind: "block", type: "add_burger_cheese" },
            { kind: "block", type: "add_lettuce" },
            { kind: "block", type: "add_burger_tomato" }
          ]
        },
        {
          kind: "category",
          name: "Control 🔁",
          colour: "#FFAB19",
          contents: [
            { kind: "block", type: "controls_repeat" },
            { kind: "block", type: "controls_if_simple" },
            { kind: "block", type: "controls_if_else" }
          ]
        },
        {
          kind: "category",
          name: "Logic 🧠",
          colour: "#5CB1D6",
          contents: [
            { kind: "block", type: "logic_compare" },
            { kind: "block", type: "logic_boolean" },
            { kind: "block", type: "math_number" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "burgerRenderer"
    },

    next: 3,
    prev: 1
  },

  {
    id: 3,
    title: "Ice Cream Maker",
    emoji: "🍦",
    category: "decomposition",
    difficulty: "easy",
    duration: "10 min",
    description: "Cipta ice cream dengan flavours yang menarik!",

    instructions: [
      "Pilih cone atau cup sebagai base",
      "Guna 'repeat' block untuk tambah 3 scoops chocolate yang sama!",
      "Atau guna 'if' block: Jika True → tambah vanilla scoop",
      "Tambah toppings (sprinkles, chocolate sauce)",
      "Letak cherry on top!"
    ],

    hint: "💡 Tip: Cuba 'repeat 3 times' + 'add strawberry scoop' untuk triple strawberry ice cream! 🍓🍓🍓",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Base 🍨",
          colour: "#FFB6C1",
          contents: [
            { kind: "block", type: "ice_cream_cone" },
            { kind: "block", type: "ice_cream_cup" }
          ]
        },
        {
          kind: "category",
          name: "Flavours 🍓",
          colour: "#87CEEB",
          contents: [
            { kind: "block", type: "scoop_vanilla" },
            { kind: "block", type: "scoop_chocolate" },
            { kind: "block", type: "scoop_strawberry" },
            { kind: "block", type: "scoop_mint" }
          ]
        },
        {
          kind: "category",
          name: "Toppings ✨",
          colour: "#FFD700",
          contents: [
            { kind: "block", type: "add_sprinkles" },
            { kind: "block", type: "add_cherry" },
            { kind: "block", type: "add_chocolate_sauce" }
          ]
        },
        {
          kind: "category",
          name: "Control 🔁",
          colour: "#FFAB19",
          contents: [
            { kind: "block", type: "controls_repeat" },
            { kind: "block", type: "controls_if_simple" },
            { kind: "block", type: "controls_if_else" }
          ]
        },
        {
          kind: "category",
          name: "Logic 🧠",
          colour: "#5CB1D6",
          contents: [
            { kind: "block", type: "logic_compare" },
            { kind: "block", type: "logic_boolean" },
            { kind: "block", type: "math_number" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "iceCreamRenderer"
    },

    next: 4,
    prev: 2
  },

  {
    id: 4,
    title: "Build a Snowman",
    emoji: "⛄",
    category: "patterns",
    difficulty: "easy",
    duration: "12 min",
    description: "Susun snowballs untuk buat snowman yang comel!",

    instructions: [
      "Letak large snowball sebagai base",
      "Tambah medium snowball untuk kepala",
      "Tambah mata, hidung, dan buttons untuk muka!",
      "Letak hat di atas kepala snowman",
      "Tambah scarf untuk bagi snowman nampak comel!"
    ],

    hint: "💡 Tip: Snowman mesti ada 2 snowballs: large (body) + medium (head)! Jangan lupa accessories untuk bagi snowman hidup!",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Snowballs ☃️",
          colour: "#87CEEB",
          contents: [
            { kind: "block", type: "large_snowball" },
            { kind: "block", type: "medium_snowball" }
          ]
        },
        {
          kind: "category",
          name: "Accessories 🎩",
          colour: "#FFD700",
          contents: [
            { kind: "block", type: "add_eyes" },
            { kind: "block", type: "add_carrot_nose" },
            { kind: "block", type: "add_buttons" },
            { kind: "block", type: "add_hat" },
            { kind: "block", type: "add_scarf" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "snowmanRenderer"
    },

    next: 5,
    prev: 3
  },

  {
    id: 5,
    title: "Garden Planter",
    emoji: "🌻",
    category: "patterns",
    difficulty: "medium",
    duration: "15 min",
    description: "Tanam bunga dan pokok dalam garden yang cantik!",

    instructions: [
      "Konsep SAINS: Bunga perlu AIR dan CAHAYA untuk hidup! 🌸💧☀️",
      "1️⃣ Add water plants",
      "2️⃣ Add sunshine",
      "3️⃣ Plant flower (atau tree) - akan hidup sebab ada water + sunshine!",
      "Cuba 'repeat 5 times' untuk tanam banyak bunga!"
    ],

    hint: "💡 Photosynthesis: Plants perlu WATER + SUNLIGHT untuk hidup! Add kedua-dua, then plant flower. Guna repeat untuk banyak bunga! 🌸",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Care 💧☀️",
          colour: "#87CEEB",
          contents: [
            { kind: "block", type: "water_plants" },
            { kind: "block", type: "add_sunshine" }
          ]
        },
        {
          kind: "category",
          name: "Seeds 🌱",
          colour: "#98FB98",
          contents: [
            { kind: "block", type: "plant_flower" },
            { kind: "block", type: "plant_tree" },
            { kind: "block", type: "plant_grass" }
          ]
        },
        {
          kind: "category",
          name: "Control 🔁",
          colour: "#FFAB19",
          contents: [
            { kind: "block", type: "controls_repeat" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "gardenRenderer"
    },

    next: 6,
    prev: 4
  },

  {
    id: 6,
    title: "Rainbow Painter",
    emoji: "🌈",
    category: "patterns",
    difficulty: "medium",
    duration: "12 min",
    description: "Lukis rainbow dengan warna-warna yang cantik!",

    instructions: [
      "Konsep SAINS: Rainbow muncul bila ada HUJAN + CAHAYA MATAHARI! 🌈☔☀️",
      "1️⃣ Add cloud (hujan)",
      "2️⃣ Add sun (cahaya matahari)",
      "3️⃣ Paint rainbow colors ikut urutan: Red → Orange → Yellow → Green → Blue → Purple",
      "Rainbow akan muncul sebab ada cloud DAN sun! Cantik!"
    ],

    hint: "💡 Rainbow Science: Perlu RAIN (cloud) + SUNLIGHT! Letak cloud + sun, then paint 6 warna rainbow. Urutan ROYGBP! 🌈",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Weather ☁️☀️",
          colour: "#87CEEB",
          contents: [
            { kind: "block", type: "add_cloud" },
            { kind: "block", type: "add_sun" }
          ]
        },
        {
          kind: "category",
          name: "Colors 🎨",
          colour: "#FFB6C1",
          contents: [
            { kind: "block", type: "paint_red" },
            { kind: "block", type: "paint_orange" },
            { kind: "block", type: "paint_yellow" },
            { kind: "block", type: "paint_green" },
            { kind: "block", type: "paint_blue" },
            { kind: "block", type: "paint_purple" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "rainbowRenderer"
    },

    next: 7,
    prev: 5
  },

  {
    id: 7,
    title: "Aquarium Builder",
    emoji: "🐠",
    category: "algorithms",
    difficulty: "medium",
    duration: "15 min",
    description: "Buat aquarium dengan ikan dan decorations!",

    instructions: [
      "Set up tank dengan water",
      "Add sand atau rocks di bawah",
      "Guna 'repeat 3 times' untuk add banyak ikan yang sama!",
      "Guna 'if-else': Jika True → add goldfish, Jika False → add clownfish",
      "Tambah plants dan bubbles untuk aquarium yang cantik!"
    ],

    hint: "💡 Tip: Tank perlu water dulu sebelum masuk ikan! Cuba 'repeat 5 times' + 'add goldfish' untuk school of fish! 🐟",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Setup 🏗️",
          colour: "#87CEEB",
          contents: [
            { kind: "block", type: "fill_water" },
            { kind: "block", type: "add_sand" },
            { kind: "block", type: "add_rocks" }
          ]
        },
        {
          kind: "category",
          name: "Fish 🐟",
          colour: "#FFD700",
          contents: [
            { kind: "block", type: "add_goldfish" },
            { kind: "block", type: "add_clownfish" },
            { kind: "block", type: "add_angelfish" }
          ]
        },
        {
          kind: "category",
          name: "Decorations 🌿",
          colour: "#98FB98",
          contents: [
            { kind: "block", type: "add_seaweed" },
            { kind: "block", type: "add_bubbles" },
            { kind: "block", type: "add_castle" }
          ]
        },
        {
          kind: "category",
          name: "Control 🔁",
          colour: "#FFAB19",
          contents: [
            { kind: "block", type: "controls_repeat" },
            { kind: "block", type: "controls_if_simple" },
            { kind: "block", type: "controls_if_else" }
          ]
        },
        {
          kind: "category",
          name: "Logic 🧠",
          colour: "#5CB1D6",
          contents: [
            { kind: "block", type: "logic_compare" },
            { kind: "block", type: "logic_boolean" },
            { kind: "block", type: "math_number" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "aquariumRenderer"
    },

    next: 8,
    prev: 6
  },

  {
    id: 8,
    title: "Space Rocket",
    emoji: "🚀",
    category: "algorithms",
    difficulty: "medium",
    duration: "15 min",
    description: "Build rocket dan launch ke space!",

    instructions: [
      "Build rocket body dan nose",
      "Attach wings pada side",
      "Add engine di bawah rocket",
      "Fuel rocket dengan minyak",
      "Guna 'if': Kalau ada minyak DAN ada engine → launch rocket! 🚀",
      "Kalau tak ada minyak atau engine → rocket tak launch"
    ],

    hint: "💡 Tip: Rocket MESTI ada engine DAN minyak (fuel) untuk boleh launch! Guna 'if' untuk check! 🚀",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Rocket Parts 🔧",
          colour: "#FF6347",
          contents: [
            { kind: "block", type: "rocket_body" },
            { kind: "block", type: "rocket_nose" },
            { kind: "block", type: "rocket_wings" },
            { kind: "block", type: "rocket_engine" }
          ]
        },
        {
          kind: "category",
          name: "Actions 🎆",
          colour: "#FFD700",
          contents: [
            { kind: "block", type: "fuel_rocket" },
            { kind: "block", type: "launch_rocket" }
          ]
        },
        {
          kind: "category",
          name: "Control 🔁",
          colour: "#FFAB19",
          contents: [
            { kind: "block", type: "controls_if_simple" }
          ]
        },
        {
          kind: "category",
          name: "Logic 🧠",
          colour: "#5CB1D6",
          contents: [
            { kind: "block", type: "logic_compare" },
            { kind: "block", type: "logic_boolean" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "rocketRenderer"
    },

    next: 9,
    prev: 7
  },

  {
    id: 9,
    title: "Butterfly Metamorphosis",
    emoji: "🦋",
    category: "science",
    difficulty: "easy",
    duration: "10 min",
    description: "Belajar kitaran hidup kupu-kupu - daripada telur hingga kupu-kupu cantik!",

    instructions: [
      "📚 SAINS: Metamorfosis = Proses perubahan bentuk dalam kitaran hidup kupu-kupu!",
      "1️⃣ STAGE 1: Mulakan dengan EGG (telur kecil pada daun)",
      "2️⃣ STAGE 2: Egg menetas jadi CATERPILLAR (ulat yang makan daun)",
      "3️⃣ STAGE 3: Ulat buat CHRYSALIS (kepompong - tidur & berubah!)",
      "4️⃣ STAGE 4: Kepompong pecah, keluar BUTTERFLY cantik! 🦋",
      "Tambah LEAF (daun), FLOWER (bunga), dan SUN (matahari) untuk environment!"
    ],

    hint: "💡 Fakta Sains: Metamorfosis ambil masa 3-4 minggu! Telur → Ulat (2 minggu) → Kepompong (10 hari) → Kupu-kupu! Proses ajaib alam semula jadi! 🦋✨",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Life Stages 🔄",
          colour: "#90EE90",
          contents: [
            { kind: "block", type: "add_egg" },
            { kind: "block", type: "add_caterpillar" },
            { kind: "block", type: "add_chrysalis" },
            { kind: "block", type: "add_butterfly" }
          ]
        },
        {
          kind: "category",
          name: "Environment 🌿",
          colour: "#87CEEB",
          contents: [
            { kind: "block", type: "add_leaf" },
            { kind: "block", type: "add_flower" },
            { kind: "block", type: "add_sun" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "butterflyRenderer"
    },

    next: 10,
    prev: 8
  },

  {
    id: 10,
    title: "Electric Circuit",
    emoji: "🔋",
    category: "logic",
    difficulty: "medium",
    duration: "12 min",
    description: "Bina litar elektrik dan hidupkan mentol!",

    instructions: [
      "📚 KONSEP SAINS: Elektrik perlu LITAR LENGKAP untuk mengalir!",
      "1️⃣ Tambah BATTERY (🔋 sumber tenaga elektrik)",
      "2️⃣ Sambung WIRE (➰ kabel untuk alirkan elektrik)",
      "3️⃣ Tambah BULB (💡 mentol akan menyala bila dapat elektrik)",
      "4️⃣ Tambah SWITCH (🔘 untuk control on/off) - optional!",
      "5️⃣ TUTUP litar dengan 'Close Circuit'",
      "6️⃣ Kalau ada switch, TURN ON switch untuk nyalakan mentol!",
      "7️⃣ Lihat result: Bila lengkap → mentol MENYALA! ⚡"
    ],

    hint: "💡 Tip Sains: Litar lengkap = Battery + Wire + Bulb + Close Circuit. Kalau ada Switch, kena Turn ON! Switch ni macam penutup litar - ON = tutup, OFF = buka! 🔋➰💡🔘⚡",

    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Components 🔌",
          colour: "#FFD700",
          contents: [
            { kind: "block", type: "add_battery" },
            { kind: "block", type: "add_bulb" },
            { kind: "block", type: "connect_wire" },
            { kind: "block", type: "add_switch" }
          ]
        },
        {
          kind: "category",
          name: "Actions ⚡",
          colour: "#FF6347",
          contents: [
            { kind: "block", type: "close_circuit" },
            { kind: "block", type: "turn_on_switch" },
            { kind: "block", type: "turn_off_switch" }
          ]
        },
        {
          kind: "category",
          name: "Control 🔁",
          colour: "#FFAB19",
          contents: [
            { kind: "block", type: "controls_if_simple" }
          ]
        },
        {
          kind: "category",
          name: "Logic 🧠",
          colour: "#5CB1D6",
          contents: [
            { kind: "block", type: "logic_compare" },
            { kind: "block", type: "logic_boolean" }
          ]
        }
      ]
    },

    output: {
      type: "canvas",
      width: 400,
      height: 400,
      renderer: "circuitRenderer"
    },

    next: null,
    prev: 9
  }
]

// Helper function to get exercise by ID
export const getExerciseById = (id) => {
  return exercises.find(ex => ex.id === parseInt(id))
}

// Helper function to get exercises by category
export const getExercisesByCategory = (category) => {
  if (category === 'all') return exercises
  return exercises.filter(ex => ex.category === category)
}

// Helper function to get category info
export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id)
}
