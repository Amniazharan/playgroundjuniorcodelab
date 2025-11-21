import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function OutputCanvas({ exerciseId, outputData, width = 350, height = 350 }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !outputData || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Get container width for responsive sizing
    const containerWidth = containerRef.current.offsetWidth
    const canvasSize = Math.min(containerWidth - 32, width) // 32px padding

    // Set canvas size
    canvas.width = canvasSize
    canvas.height = canvasSize

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize)

    // Draw based on exercise type
    switch(exerciseId) {
      case 1:
        drawPizza(ctx, outputData, canvasSize, canvasSize)
        break
      case 2:
        drawBurger(ctx, outputData, canvasSize, canvasSize)
        break
      case 3:
        drawIceCream(ctx, outputData, canvasSize, canvasSize)
        break
      case 4:
        drawSnowman(ctx, outputData, canvasSize, canvasSize)
        break
      case 5:
        drawGarden(ctx, outputData, canvasSize, canvasSize)
        break
      case 6:
        drawRainbow(ctx, outputData, canvasSize, canvasSize)
        break
      case 7:
        drawAquarium(ctx, outputData, canvasSize, canvasSize)
        break
      case 8:
        drawRocket(ctx, outputData, canvasSize, canvasSize)
        break
      case 9:
        drawButterfly(ctx, outputData, canvasSize, canvasSize)
        break
      case 10:
        drawCircuit(ctx, outputData, canvasSize, canvasSize)
        break
      default:
        drawPlaceholder(ctx, exerciseId, canvasSize, canvasSize)
    }
  }, [exerciseId, outputData, width, height])

  const drawPizza = (ctx, data, w, h) => {
    const centerX = w / 2
    const centerY = h / 2
    const baseRadius = Math.min(w, h) * 0.35

    // Draw base
    if (data.base) {
      ctx.fillStyle = data.base === 'thin' ? '#F5DEB3' : '#D2691E'
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
      ctx.fill()

      // Add crust edge
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = data.base === 'thin' ? 3 : 8
      ctx.stroke()
    }

    // Draw toppings
    if (data.toppings && data.toppings.length > 0) {
      data.toppings.forEach((topping, index) => {
        const layerRadius = baseRadius - (index * 15)

        switch(topping) {
          case 'cheese':
            ctx.fillStyle = 'rgba(255, 215, 0, 0.8)'
            ctx.beginPath()
            ctx.arc(centerX, centerY, layerRadius, 0, Math.PI * 2)
            ctx.fill()
            break

          case 'tomato':
            ctx.fillStyle = '#FF6347'
            for (let i = 0; i < 8; i++) {
              const angle = (Math.PI * 2 * i) / 8
              const x = centerX + Math.cos(angle) * (layerRadius * 0.6)
              const y = centerY + Math.sin(angle) * (layerRadius * 0.6)
              ctx.beginPath()
              ctx.arc(x, y, 15, 0, Math.PI * 2)
              ctx.fill()
            }
            break

          case 'mushroom':
            ctx.fillStyle = '#8B4513'
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI * 2 * i) / 6
              const x = centerX + Math.cos(angle) * (layerRadius * 0.7)
              const y = centerY + Math.sin(angle) * (layerRadius * 0.7)
              ctx.beginPath()
              ctx.arc(x, y, 12, 0, Math.PI * 2)
              ctx.fill()
              ctx.fillStyle = '#D2691E'
              ctx.beginPath()
              ctx.arc(x - 3, y - 3, 4, 0, Math.PI * 2)
              ctx.fill()
              ctx.fillStyle = '#8B4513'
            }
            break

          case 'pepperoni':
            ctx.fillStyle = '#DC143C'
            for (let i = 0; i < 10; i++) {
              const angle = (Math.PI * 2 * i) / 10
              const x = centerX + Math.cos(angle) * (layerRadius * 0.75)
              const y = centerY + Math.sin(angle) * (layerRadius * 0.75)
              ctx.beginPath()
              ctx.arc(x, y, 18, 0, Math.PI * 2)
              ctx.fill()
              ctx.strokeStyle = '#8B0000'
              ctx.lineWidth = 2
              ctx.stroke()
            }
            break
        }
      })
    }

    // If baked, add golden effect
    if (data.baked) {
      ctx.fillStyle = 'rgba(255, 165, 0, 0.2)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FFD700'
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5
        const x = centerX + Math.cos(angle) * (baseRadius * 0.8)
        const y = centerY + Math.sin(angle) * (baseRadius * 0.8)
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawBurger = (ctx, data, w, h) => {
    const centerX = w / 2
    const scale = w / 400
    let currentY = h * 0.75

    // Background - warm kitchen atmosphere
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h)
    bgGradient.addColorStop(0, '#FFF8DC')
    bgGradient.addColorStop(1, '#FFE4B5')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, w, h)

    // Wooden table/plate base
    ctx.fillStyle = '#D2691E'
    ctx.fillRect(0, h * 0.8, w, h * 0.2)

    // Plate
    const plateGradient = ctx.createRadialGradient(
      centerX, h * 0.78, 20 * scale,
      centerX, h * 0.78, 140 * scale
    )
    plateGradient.addColorStop(0, '#FFFFFF')
    plateGradient.addColorStop(0.8, '#F5F5F5')
    plateGradient.addColorStop(1, '#E0E0E0')
    ctx.fillStyle = plateGradient
    ctx.beginPath()
    ctx.ellipse(centerX, h * 0.78, 130 * scale, 15 * scale, 0, 0, Math.PI * 2)
    ctx.fill()

    // Plate rim
    ctx.strokeStyle = '#D3D3D3'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw bottom bun with realistic gradient and texture
    if (data.hasBottomBun) {
      // Bottom bun with improved shape - more rounded and realistic
      const bunBottomGradient = ctx.createRadialGradient(
        centerX - 15 * scale, currentY - 8 * scale, 15 * scale,
        centerX, currentY, 90 * scale
      )
      bunBottomGradient.addColorStop(0, '#E8B88A')
      bunBottomGradient.addColorStop(0.4, '#D2691E')
      bunBottomGradient.addColorStop(0.7, '#CD853F')
      bunBottomGradient.addColorStop(1, '#A0522D')

      ctx.fillStyle = bunBottomGradient
      ctx.beginPath()
      ctx.ellipse(centerX, currentY, 85 * scale, 28 * scale, 0, 0, Math.PI * 2)
      ctx.fill()

      // Bun bottom edge shadow for depth
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Add subtle sesame seeds on bottom bun
      ctx.save()
      const bottomSeedPositions = [
        [centerX - 40 * scale, currentY - 8 * scale],
        [centerX - 20 * scale, currentY - 12 * scale],
        [centerX, currentY - 14 * scale],
        [centerX + 20 * scale, currentY - 12 * scale],
        [centerX + 40 * scale, currentY - 8 * scale],
        [centerX - 30 * scale, currentY - 5 * scale],
        [centerX + 30 * scale, currentY - 5 * scale]
      ]

      bottomSeedPositions.forEach(([x, y]) => {
        // Seed shadow
        ctx.fillStyle = '#D2B48C'
        ctx.beginPath()
        ctx.ellipse(x + 0.5 * scale, y + 0.5 * scale, 2 * scale, 3 * scale, Math.random() * Math.PI, 0, Math.PI * 2)
        ctx.fill()

        // Seed
        ctx.fillStyle = '#F5DEB3'
        ctx.beginPath()
        ctx.ellipse(x, y, 2 * scale, 3 * scale, Math.random() * Math.PI, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // Glossy highlight on bottom bun
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.beginPath()
      ctx.arc(centerX - 20 * scale, currentY - 10 * scale, 20 * scale, 0, Math.PI * 2)
      ctx.fill()

      currentY -= 32 * scale
    }

    // Draw layers with realistic appearance
    const layerHeights = {
      patty: 20 * scale,
      cheese: 8 * scale,
      lettuce: 12 * scale,
      tomato: 10 * scale
    }

    data.layers.forEach((layer, index) => {
      const height = layerHeights[layer] || 15 * scale
      const yPos = currentY - height

      if (layer === 'patty') {
        // Juicy beef patty with grill marks
        const pattyGradient = ctx.createLinearGradient(
          centerX - 80 * scale, yPos, centerX + 80 * scale, yPos
        )
        pattyGradient.addColorStop(0, '#654321')
        pattyGradient.addColorStop(0.5, '#8B4513')
        pattyGradient.addColorStop(1, '#654321')

        ctx.fillStyle = pattyGradient
        ctx.beginPath()
        ctx.ellipse(centerX, yPos + height / 2, 80 * scale, height / 2, 0, 0, Math.PI * 2)
        ctx.fill()

        // Grill marks
        ctx.strokeStyle = '#3D2817'
        ctx.lineWidth = 2
        for (let i = 0; i < 4; i++) {
          ctx.beginPath()
          ctx.moveTo(centerX - 60 * scale + i * 30 * scale, yPos + 5 * scale)
          ctx.lineTo(centerX - 50 * scale + i * 30 * scale, yPos + height - 5 * scale)
          ctx.stroke()
        }

        // Crispy edges
        ctx.strokeStyle = '#2F1810'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.ellipse(centerX, yPos + height / 2, 80 * scale, height / 2, 0, 0, Math.PI * 2)
        ctx.stroke()

      } else if (layer === 'cheese') {
        // Melted cheese with drips
        const cheeseGradient = ctx.createLinearGradient(
          0, yPos, 0, yPos + height
        )
        cheeseGradient.addColorStop(0, '#FFD700')
        cheeseGradient.addColorStop(1, '#FFA500')

        ctx.fillStyle = cheeseGradient

        // Main cheese slice - slightly larger than patty
        ctx.beginPath()
        ctx.moveTo(centerX - 85 * scale, yPos)
        ctx.lineTo(centerX + 85 * scale, yPos)
        ctx.lineTo(centerX + 80 * scale, yPos + height)
        ctx.lineTo(centerX - 80 * scale, yPos + height)
        ctx.closePath()
        ctx.fill()

        // Cheese drips
        ctx.fillStyle = '#FFA500'
        for (let i = 0; i < 6; i++) {
          const x = centerX - 70 * scale + i * 28 * scale
          ctx.beginPath()
          ctx.moveTo(x, yPos + height)
          ctx.quadraticCurveTo(x + 5 * scale, yPos + height + 8 * scale, x + 2 * scale, yPos + height + 12 * scale)
          ctx.quadraticCurveTo(x - 2 * scale, yPos + height + 8 * scale, x - 4 * scale, yPos + height)
          ctx.closePath()
          ctx.fill()
        }

      } else if (layer === 'lettuce') {
        // Crispy lettuce with wavy edges
        ctx.fillStyle = '#90EE90'
        ctx.beginPath()
        // Wavy top edge
        for (let i = 0; i <= 20; i++) {
          const x = centerX - 85 * scale + (i * 8.5 * scale)
          const y = yPos + Math.sin(i * 0.8) * 4 * scale
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineTo(centerX + 85 * scale, yPos + height)
        ctx.lineTo(centerX - 85 * scale, yPos + height)
        ctx.closePath()
        ctx.fill()

        // Lettuce veins
        ctx.strokeStyle = '#228B22'
        ctx.lineWidth = 1.5
        for (let i = 0; i < 8; i++) {
          ctx.beginPath()
          ctx.moveTo(centerX - 60 * scale + i * 15 * scale, yPos)
          ctx.lineTo(centerX - 60 * scale + i * 15 * scale, yPos + height)
          ctx.stroke()
        }

        // Dark green edge
        ctx.strokeStyle = '#228B22'
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let i = 0; i <= 20; i++) {
          const x = centerX - 85 * scale + (i * 8.5 * scale)
          const y = yPos + Math.sin(i * 0.8) * 4 * scale
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

      } else if (layer === 'tomato') {
        // Juicy tomato slices
        const tomatoGradient = ctx.createRadialGradient(
          centerX, yPos + height / 2, 10 * scale,
          centerX, yPos + height / 2, 75 * scale
        )
        tomatoGradient.addColorStop(0, '#FF6347')
        tomatoGradient.addColorStop(0.8, '#FF4500')
        tomatoGradient.addColorStop(1, '#DC143C')

        ctx.fillStyle = tomatoGradient
        ctx.beginPath()
        ctx.ellipse(centerX, yPos + height / 2, 75 * scale, height / 2, 0, 0, Math.PI * 2)
        ctx.fill()

        // Tomato seeds/pulp
        ctx.fillStyle = 'rgba(255, 160, 122, 0.6)'
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8
          const x = centerX + Math.cos(angle) * 35 * scale
          const y = yPos + height / 2 + Math.sin(angle) * 18 * scale
          ctx.beginPath()
          ctx.arc(x, y, 3 * scale, 0, Math.PI * 2)
          ctx.fill()
        }

        // Glossy highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.beginPath()
        ctx.arc(centerX - 20 * scale, yPos + height / 2 - 3 * scale, 15 * scale, 0, Math.PI * 2)
        ctx.fill()
      }

      currentY = yPos
    })

    // Draw top bun with realistic texture - dome shaped
    if (data.hasTopBun) {
      const bunTopY = currentY - 45 * scale
      const bunHeight = 45 * scale

      // Create a smooth dome shape using ellipse
      const bunTopGradient = ctx.createRadialGradient(
        centerX - 18 * scale, bunTopY + 10 * scale, 15 * scale,
        centerX, bunTopY + 20 * scale, 90 * scale
      )
      bunTopGradient.addColorStop(0, '#F5DEB3')
      bunTopGradient.addColorStop(0.2, '#E8B88A')
      bunTopGradient.addColorStop(0.5, '#DEB887')
      bunTopGradient.addColorStop(0.8, '#D2691E')
      bunTopGradient.addColorStop(1, '#B8860B')

      ctx.fillStyle = bunTopGradient
      ctx.beginPath()

      // Draw a proper dome-shaped bun using bezier curves
      ctx.moveTo(centerX - 85 * scale, currentY)
      // Left side curve up
      ctx.bezierCurveTo(
        centerX - 85 * scale, bunTopY + 25 * scale,
        centerX - 70 * scale, bunTopY + 5 * scale,
        centerX - 40 * scale, bunTopY
      )
      // Top curve
      ctx.bezierCurveTo(
        centerX - 20 * scale, bunTopY - 3 * scale,
        centerX + 20 * scale, bunTopY - 3 * scale,
        centerX + 40 * scale, bunTopY
      )
      // Right side curve down
      ctx.bezierCurveTo(
        centerX + 70 * scale, bunTopY + 5 * scale,
        centerX + 85 * scale, bunTopY + 25 * scale,
        centerX + 85 * scale, currentY
      )
      ctx.closePath()
      ctx.fill()

      // Bun outline for definition
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Bottom edge shadow where bun meets fillings
      ctx.fillStyle = 'rgba(101, 67, 33, 0.3)'
      ctx.beginPath()
      ctx.ellipse(centerX, currentY, 83 * scale, 8 * scale, 0, 0, Math.PI * 2)
      ctx.fill()

      // Realistic sesame seeds scattered naturally
      ctx.save()
      const seedPositions = [
        [centerX - 60 * scale, bunTopY + 15 * scale],
        [centerX - 40 * scale, bunTopY + 5 * scale],
        [centerX - 20 * scale, bunTopY],
        [centerX, bunTopY - 2 * scale],
        [centerX + 20 * scale, bunTopY],
        [centerX + 40 * scale, bunTopY + 5 * scale],
        [centerX + 60 * scale, bunTopY + 15 * scale],
        [centerX - 50 * scale, bunTopY + 10 * scale],
        [centerX - 10 * scale, bunTopY - 1 * scale],
        [centerX + 10 * scale, bunTopY - 1 * scale],
        [centerX + 50 * scale, bunTopY + 10 * scale],
        [centerX - 30 * scale, bunTopY + 3 * scale],
        [centerX + 30 * scale, bunTopY + 3 * scale]
      ]

      seedPositions.forEach(([x, y]) => {
        // Seed shadow for depth
        ctx.fillStyle = '#C9A876'
        ctx.beginPath()
        ctx.ellipse(x + 0.8 * scale, y + 0.8 * scale, 2.2 * scale, 3.2 * scale, Math.random() * Math.PI, 0, Math.PI * 2)
        ctx.fill()

        // Main seed
        ctx.fillStyle = '#F5DEB3'
        ctx.beginPath()
        ctx.ellipse(x, y, 2.2 * scale, 3.2 * scale, Math.random() * Math.PI, 0, Math.PI * 2)
        ctx.fill()

        // Seed highlight for shine
        ctx.fillStyle = '#FFFACD'
        ctx.beginPath()
        ctx.arc(x - 0.6 * scale, y - 0.8 * scale, 0.9 * scale, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // Large glossy highlight on top for realistic shine
      const highlightGradient = ctx.createRadialGradient(
        centerX - 25 * scale, bunTopY + 5 * scale, 5 * scale,
        centerX - 25 * scale, bunTopY + 5 * scale, 30 * scale
      )
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)')
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = highlightGradient
      ctx.beginPath()
      ctx.arc(centerX - 25 * scale, bunTopY + 5 * scale, 30 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Subtle highlight on right side too
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.beginPath()
      ctx.arc(centerX + 30 * scale, bunTopY + 8 * scale, 18 * scale, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawIceCream = (ctx, data, w, h) => {
    const centerX = w / 2
    const scale = w / 400 // Responsive scaling
    let currentY = h * 0.7

    // Draw base (cone or cup)
    if (data.base === 'cone') {
      // Beautiful cone with proper 3D gradient and curved edges
      const coneGradient = ctx.createLinearGradient(
        centerX - 55 * scale, currentY,
        centerX + 55 * scale, currentY
      )
      coneGradient.addColorStop(0, '#A67C52')
      coneGradient.addColorStop(0.3, '#D2A679')
      coneGradient.addColorStop(0.5, '#E8B88A')
      coneGradient.addColorStop(0.7, '#D2A679')
      coneGradient.addColorStop(1, '#A67C52')

      ctx.fillStyle = coneGradient
      ctx.beginPath()

      // Draw cone with slightly curved edges for more realistic look
      ctx.moveTo(centerX - 55 * scale, currentY)
      // Left curved edge
      ctx.quadraticCurveTo(
        centerX - 35 * scale, currentY + 60 * scale,
        centerX - 2 * scale, currentY + 125 * scale
      )
      // Bottom tip
      ctx.lineTo(centerX, currentY + 128 * scale)
      ctx.lineTo(centerX + 2 * scale, currentY + 125 * scale)
      // Right curved edge
      ctx.quadraticCurveTo(
        centerX + 35 * scale, currentY + 60 * scale,
        centerX + 55 * scale, currentY
      )
      ctx.closePath()
      ctx.fill()

      // Cone outline for definition
      ctx.strokeStyle = '#8B6F47'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Enhanced waffle pattern - diamond grid
      ctx.strokeStyle = '#9B7F52'
      ctx.lineWidth = 1.8

      // Horizontal waffle lines with proper perspective
      for (let i = 1; i <= 7; i++) {
        const y = currentY + (i * 17 * scale)
        const widthReduction = i * 7.85 * scale
        const leftX = centerX - 55 * scale + widthReduction
        const rightX = centerX + 55 * scale - widthReduction

        ctx.beginPath()
        ctx.moveTo(leftX, y)
        ctx.lineTo(rightX, y)
        ctx.stroke()
      }

      // Left diagonal waffle lines
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        ctx.moveTo(centerX + (i * 22 * scale), currentY)
        ctx.lineTo(centerX + (i * 4 * scale), currentY + 128 * scale)
        ctx.stroke()
      }

      // Right diagonal waffle lines
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        ctx.moveTo(centerX + (i * 22 * scale), currentY)
        ctx.lineTo(centerX - (i * 4 * scale), currentY + 128 * scale)
        ctx.stroke()
      }

      // Dark edge at top for depth
      ctx.strokeStyle = '#6B5230'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX - 55 * scale, currentY)
      ctx.lineTo(centerX + 55 * scale, currentY)
      ctx.stroke()

      // Pointed tip with gradient for 3D effect
      const tipGradient = ctx.createRadialGradient(
        centerX, currentY + 128 * scale, 0,
        centerX, currentY + 128 * scale, 5 * scale
      )
      tipGradient.addColorStop(0, '#4A3820')
      tipGradient.addColorStop(1, '#6B5230')
      ctx.fillStyle = tipGradient
      ctx.beginPath()
      ctx.arc(centerX, currentY + 128 * scale, 4 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Add highlight on left side of cone for 3D effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.beginPath()
      ctx.moveTo(centerX - 50 * scale, currentY + 10 * scale)
      ctx.quadraticCurveTo(
        centerX - 30 * scale, currentY + 50 * scale,
        centerX - 15 * scale, currentY + 100 * scale
      )
      ctx.lineTo(centerX - 10 * scale, currentY + 100 * scale)
      ctx.quadraticCurveTo(
        centerX - 25 * scale, currentY + 50 * scale,
        centerX - 45 * scale, currentY + 10 * scale
      )
      ctx.closePath()
      ctx.fill()

    } else if (data.base === 'cup') {
      // Cup with gradient
      const cupGradient = ctx.createLinearGradient(centerX - 50 * scale, currentY, centerX + 50 * scale, currentY)
      cupGradient.addColorStop(0, '#FF69B4')
      cupGradient.addColorStop(0.5, '#FFB6C1')
      cupGradient.addColorStop(1, '#FF69B4')

      ctx.fillStyle = cupGradient
      // Trapezoid shape
      ctx.beginPath()
      ctx.moveTo(centerX - 45 * scale, currentY)
      ctx.lineTo(centerX + 45 * scale, currentY)
      ctx.lineTo(centerX + 50 * scale, currentY + 70 * scale)
      ctx.lineTo(centerX - 50 * scale, currentY + 70 * scale)
      ctx.closePath()
      ctx.fill()

      // Cup rim
      ctx.fillStyle = '#FF1493'
      ctx.fillRect(centerX - 48 * scale, currentY - 5 * scale, 96 * scale, 5 * scale)

      // Cup border
      ctx.strokeStyle = '#FF1493'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX - 45 * scale, currentY)
      ctx.lineTo(centerX + 45 * scale, currentY)
      ctx.lineTo(centerX + 50 * scale, currentY + 70 * scale)
      ctx.lineTo(centerX - 50 * scale, currentY + 70 * scale)
      ctx.closePath()
      ctx.stroke()
    }

    // Draw scoops with realistic wavy shape
    const scoopColors = {
      vanilla: { main: '#FFF8DC', highlight: '#FFFAED', shadow: '#F5DEB3' },
      chocolate: { main: '#8B4513', highlight: '#A0522D', shadow: '#654321' },
      strawberry: { main: '#FFB6C1', highlight: '#FFC0CB', shadow: '#FF69B4' },
      mint: { main: '#98FF98', highlight: '#B0FFB0', shadow: '#7FFF7F' }
    }

    data.scoops.forEach((flavor, index) => {
      const scoopY = currentY - (index * 50 * scale)
      const scoopRadius = 45 * scale
      const colors = scoopColors[flavor] || { main: '#FFF', highlight: '#FFF', shadow: '#DDD' }

      // Draw scoop with gradient for 3D effect
      const gradient = ctx.createRadialGradient(
        centerX - 15 * scale, scoopY - 15 * scale, 10 * scale,
        centerX, scoopY, scoopRadius
      )
      gradient.addColorStop(0, colors.highlight)
      gradient.addColorStop(0.5, colors.main)
      gradient.addColorStop(1, colors.shadow)

      // Main scoop - wavy shape
      ctx.fillStyle = gradient
      ctx.beginPath()

      // Create wavy edge with arcs
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        const waveRadius = scoopRadius + Math.sin(angle * 3) * 5 * scale
        const x = centerX + Math.cos(angle) * waveRadius
        const y = scoopY + Math.sin(angle) * waveRadius
        if (angle === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fill()

      // Highlight spot for glossy effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.beginPath()
      ctx.arc(centerX - 12 * scale, scoopY - 12 * scale, 12 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Small drips
      if (index === data.scoops.length - 1) {
        ctx.fillStyle = colors.shadow
        ctx.beginPath()
        ctx.moveTo(centerX + 20 * scale, scoopY + 20 * scale)
        ctx.quadraticCurveTo(centerX + 22 * scale, scoopY + 35 * scale, centerX + 18 * scale, scoopY + 38 * scale)
        ctx.quadraticCurveTo(centerX + 16 * scale, scoopY + 35 * scale, centerX + 18 * scale, scoopY + 20 * scale)
        ctx.closePath()
        ctx.fill()
      }
    })

    // Draw toppings
    if (data.toppings.includes('cherry')) {
      const topY = currentY - ((data.scoops.length - 1) * 50 * scale)

      // Cherry positioned right on top of the topmost scoop
      ctx.fillStyle = '#DC143C'
      ctx.beginPath()
      ctx.arc(centerX, topY - 55 * scale, 10 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Cherry shadow for depth
      ctx.fillStyle = 'rgba(139, 0, 0, 0.3)'
      ctx.beginPath()
      ctx.arc(centerX + 2 * scale, topY - 53 * scale, 9 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Main cherry
      ctx.fillStyle = '#DC143C'
      ctx.beginPath()
      ctx.arc(centerX, topY - 55 * scale, 10 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Glossy highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.beginPath()
      ctx.arc(centerX - 3 * scale, topY - 58 * scale, 4 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Secondary highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.arc(centerX + 2 * scale, topY - 56 * scale, 2 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Stem with curve
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(centerX + 1 * scale, topY - 65 * scale)
      ctx.quadraticCurveTo(centerX + 6 * scale, topY - 70 * scale, centerX + 4 * scale, topY - 75 * scale)
      ctx.stroke()

      // Stem highlight
      ctx.strokeStyle = 'rgba(34, 139, 34, 0.5)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(centerX + 2 * scale, topY - 66 * scale)
      ctx.quadraticCurveTo(centerX + 5 * scale, topY - 69 * scale, centerX + 4.5 * scale, topY - 72 * scale)
      ctx.stroke()
    }

    if (data.toppings.includes('sprinkles')) {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#FFA500']
      ctx.save()
      // Sprinkles on each scoop
      data.scoops.forEach((flavor, index) => {
        const scoopY = currentY - (index * 50 * scale)
        for (let i = 0; i < 15; i++) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 35 * scale
          const x = centerX + Math.cos(angle) * distance
          const y = scoopY + Math.sin(angle) * distance

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(Math.random() * Math.PI)
          ctx.fillRect(-1.5 * scale, -4 * scale, 3 * scale, 8 * scale)
          ctx.restore()
        }
      })
      ctx.restore()
    }

    if (data.toppings.includes('chocolate_sauce')) {
      const topY = currentY - ((data.scoops.length - 1) * 50 * scale)

      // Rich chocolate drizzle with glossy effect
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Multiple layers of chocolate sauce for depth
      // Layer 1 - Dark chocolate base
      ctx.strokeStyle = '#2F1810'
      ctx.lineWidth = 5 * scale
      ctx.beginPath()
      ctx.moveTo(centerX - 35 * scale, topY - 25 * scale)
      ctx.quadraticCurveTo(centerX - 18 * scale, topY - 15 * scale, centerX - 5 * scale, topY - 22 * scale)
      ctx.quadraticCurveTo(centerX + 10 * scale, topY - 28 * scale, centerX + 25 * scale, topY - 18 * scale)
      ctx.quadraticCurveTo(centerX + 35 * scale, topY - 12 * scale, centerX + 38 * scale, topY - 20 * scale)
      ctx.stroke()

      // Layer 2 - Drizzle on upper scoop area
      ctx.strokeStyle = '#3D2817'
      ctx.lineWidth = 4.5 * scale
      ctx.beginPath()
      ctx.moveTo(centerX - 30 * scale, topY - 5 * scale)
      ctx.quadraticCurveTo(centerX - 12 * scale, topY + 5 * scale, centerX, topY - 2 * scale)
      ctx.quadraticCurveTo(centerX + 15 * scale, topY - 8 * scale, centerX + 32 * scale, topY + 2 * scale)
      ctx.stroke()

      // Layer 3 - Additional drips flowing down
      ctx.strokeStyle = '#3D2817'
      ctx.lineWidth = 4 * scale
      ctx.beginPath()
      ctx.moveTo(centerX - 22 * scale, topY + 8 * scale)
      ctx.quadraticCurveTo(centerX - 5 * scale, topY + 18 * scale, centerX + 8 * scale, topY + 12 * scale)
      ctx.stroke()

      // Add drip effects
      const dripPositions = [
        [centerX - 25 * scale, topY + 8 * scale, 15 * scale],
        [centerX - 5 * scale, topY + 3 * scale, 18 * scale],
        [centerX + 15 * scale, topY + 5 * scale, 12 * scale],
        [centerX + 30 * scale, topY + 2 * scale, 14 * scale]
      ]

      dripPositions.forEach(([x, y, length]) => {
        ctx.fillStyle = '#3D2817'
        ctx.beginPath()
        ctx.moveTo(x - 2 * scale, y)
        ctx.quadraticCurveTo(x, y + length * 0.6, x - 1 * scale, y + length)
        ctx.quadraticCurveTo(x - 0.5 * scale, y + length * 0.8, x + 1 * scale, y + length)
        ctx.quadraticCurveTo(x, y + length * 0.6, x + 2 * scale, y)
        ctx.closePath()
        ctx.fill()
      })

      // Glossy highlights on chocolate sauce
      ctx.strokeStyle = 'rgba(139, 90, 43, 0.6)'
      ctx.lineWidth = 2 * scale
      ctx.beginPath()
      ctx.moveTo(centerX - 32 * scale, topY - 24 * scale)
      ctx.quadraticCurveTo(centerX - 15 * scale, topY - 16 * scale, centerX, topY - 21 * scale)
      ctx.stroke()

      // Add shine spots
      ctx.fillStyle = 'rgba(160, 82, 45, 0.4)'
      ctx.beginPath()
      ctx.arc(centerX - 20 * scale, topY - 18 * scale, 3 * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(centerX + 10 * scale, topY - 24 * scale, 2.5 * scale, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawSnowman = (ctx, data, w, h) => {
    const centerX = w / 2
    const scale = w / 400
    let currentY = h * 0.75

    // Winter background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h)
    bgGradient.addColorStop(0, '#B0E0E6')
    bgGradient.addColorStop(1, '#E0F6FF')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, w, h)

    // Snowy ground
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.moveTo(0, h * 0.8)
    for (let i = 0; i <= w; i += 20) {
      ctx.lineTo(i, h * 0.8 + Math.sin(i * 0.1) * 5 * scale)
    }
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fill()

    // Draw snowballs from bottom to top (only large and medium)
    const snowballSizes = {
      large: 75 * scale,
      medium: 50 * scale
    }

    let bodyY = currentY
    let headY = currentY

    data.snowballs.forEach((size, index) => {
      const radius = snowballSizes[size] || 50 * scale

      // Gradient for 3D effect
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3, currentY - radius * 0.3, radius * 0.1,
        centerX, currentY, radius
      )
      gradient.addColorStop(0, '#FFFFFF')
      gradient.addColorStop(0.6, '#F0F8FF')
      gradient.addColorStop(1, '#D3D3D3')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, currentY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Border
      ctx.strokeStyle = '#C0C0C0'
      ctx.lineWidth = 2
      ctx.stroke()

      // Snow texture
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * radius * 0.7
        const x = centerX + Math.cos(angle) * dist
        const y = currentY + Math.sin(angle) * dist
        ctx.beginPath()
        ctx.arc(x, y, scale * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (index === 0) bodyY = currentY
      if (index === 1) headY = currentY

      currentY -= radius * 1.8
    })

    // Calculate proper positions based on snowball count
    if (data.snowballs.length >= 2) {
      headY = bodyY - 130 * scale
    } else if (data.snowballs.length === 1) {
      headY = bodyY
    }

    // Draw accessories
    if (data.accessories.includes('eyes')) {
      // Left eye
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(centerX - 15 * scale, headY - 8 * scale, 5 * scale, 0, Math.PI * 2)
      ctx.fill()
      // Right eye
      ctx.beginPath()
      ctx.arc(centerX + 15 * scale, headY - 8 * scale, 5 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Eye gleam
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(centerX - 13 * scale, headY - 10 * scale, 2 * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(centerX + 17 * scale, headY - 10 * scale, 2 * scale, 0, Math.PI * 2)
      ctx.fill()
    }

    if (data.accessories.includes('nose')) {
      // Beautiful carrot nose with 3D effect
      const noseGradient = ctx.createLinearGradient(
        centerX, headY - 2 * scale,
        centerX + 30 * scale, headY
      )
      noseGradient.addColorStop(0, '#FF8C00')
      noseGradient.addColorStop(1, '#FF6347')

      ctx.fillStyle = noseGradient
      ctx.beginPath()
      ctx.moveTo(centerX + 2 * scale, headY - 2 * scale)
      ctx.lineTo(centerX + 30 * scale, headY)
      ctx.lineTo(centerX + 2 * scale, headY + 2 * scale)
      ctx.closePath()
      ctx.fill()

      // Nose outline
      ctx.strokeStyle = '#D2691E'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    if (data.accessories.includes('buttons')) {
      ctx.fillStyle = '#000000'
      const buttonCount = 3
      const startY = bodyY - 30 * scale

      for (let i = 0; i < buttonCount; i++) {
        // Button shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.beginPath()
        ctx.arc(centerX + 1 * scale, startY + i * 20 * scale + 1 * scale, 5 * scale, 0, Math.PI * 2)
        ctx.fill()

        // Button
        ctx.fillStyle = '#1C1C1C'
        ctx.beginPath()
        ctx.arc(centerX, startY + i * 20 * scale, 5 * scale, 0, Math.PI * 2)
        ctx.fill()

        // Button holes
        ctx.fillStyle = '#444444'
        ctx.beginPath()
        ctx.arc(centerX - 1.5 * scale, startY + i * 20 * scale, 1 * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(centerX + 1.5 * scale, startY + i * 20 * scale, 1 * scale, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (data.accessories.includes('hat')) {
      const hatTopY = headY - 58 * scale

      // Hat shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(centerX - 37 * scale, hatTopY + 33 * scale, 74 * scale, 3 * scale)

      // Hat brim with gradient
      const brimGradient = ctx.createLinearGradient(0, hatTopY + 28 * scale, 0, hatTopY + 36 * scale)
      brimGradient.addColorStop(0, '#1A1A1A')
      brimGradient.addColorStop(1, '#000000')
      ctx.fillStyle = brimGradient
      ctx.fillRect(centerX - 40 * scale, hatTopY + 28 * scale, 80 * scale, 8 * scale)

      // Hat top with gradient
      const hatGradient = ctx.createLinearGradient(centerX - 30 * scale, hatTopY, centerX + 30 * scale, hatTopY)
      hatGradient.addColorStop(0, '#0D0D0D')
      hatGradient.addColorStop(0.5, '#1A1A1A')
      hatGradient.addColorStop(1, '#0D0D0D')
      ctx.fillStyle = hatGradient
      ctx.fillRect(centerX - 28 * scale, hatTopY, 56 * scale, 28 * scale)

      // Hat band (red ribbon)
      ctx.fillStyle = '#DC143C'
      ctx.fillRect(centerX - 28 * scale, hatTopY + 20 * scale, 56 * scale, 6 * scale)

      // Hat outline
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.strokeRect(centerX - 28 * scale, hatTopY, 56 * scale, 28 * scale)
    }

    if (data.accessories.includes('scarf')) {
      const scarfY = headY + 45 * scale

      // Scarf main wrap with stripes
      ctx.fillStyle = '#DC143C'
      ctx.fillRect(centerX - 35 * scale, scarfY, 70 * scale, 14 * scale)

      // White stripes
      ctx.fillStyle = '#FFFFFF'
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(centerX - 35 * scale + i * 25 * scale, scarfY, 3 * scale, 14 * scale)
      }

      // Scarf end (hanging down)
      ctx.fillStyle = '#DC143C'
      ctx.fillRect(centerX + 28 * scale, scarfY, 10 * scale, 35 * scale)

      // Fringe on scarf end
      ctx.strokeStyle = '#DC143C'
      ctx.lineWidth = 2
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(centerX + 30 * scale + i * 3 * scale, scarfY + 35 * scale)
        ctx.lineTo(centerX + 30 * scale + i * 3 * scale, scarfY + 42 * scale)
        ctx.stroke()
      }

      // White stripe on end
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(centerX + 28 * scale, scarfY + 12 * scale, 10 * scale, 3 * scale)

      // Scarf shadow/depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(centerX - 35 * scale, scarfY + 12 * scale, 70 * scale, 2 * scale)
    }
  }

  const drawGarden = (ctx, data, w, h) => {
    const scale = w / 400

    // Background - sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.7)
    skyGradient.addColorStop(0, '#87CEEB')
    skyGradient.addColorStop(1, '#B0E0E6')
    ctx.fillStyle = skyGradient
    ctx.fillRect(0, 0, w, h * 0.7)

    // Ground
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(0, h * 0.7, w, h * 0.3)

    // Grass
    ctx.fillStyle = '#228B22'
    ctx.fillRect(0, h * 0.68, w, h * 0.05)

    // Draw sunshine
    if (data.sunshine) {
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.arc(w * 0.85, h * 0.15, 30 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Sun rays
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8
        ctx.beginPath()
        ctx.moveTo(w * 0.85, h * 0.15)
        ctx.lineTo(
          w * 0.85 + Math.cos(angle) * 50 * scale,
          h * 0.15 + Math.sin(angle) * 50 * scale
        )
        ctx.lineWidth = 3
        ctx.strokeStyle = '#FFD700'
        ctx.stroke()
      }
    }

    // Draw plants
    const plantSpacing = w / (data.plants.length + 1)
    data.plants.forEach((plant, index) => {
      const x = plantSpacing * (index + 1)
      const baseY = h * 0.7

      if (plant === 'flower') {
        // Stem
        ctx.strokeStyle = data.watered ? '#228B22' : '#90EE90'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(x, baseY)
        ctx.lineTo(x, baseY - 40 * scale)
        ctx.stroke()

        // Petals
        const petalColors = ['#FF69B4', '#FF1493', '#FFB6C1']
        const petalColor = petalColors[index % petalColors.length]
        ctx.fillStyle = data.sunshine ? petalColor : '#D3D3D3'
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5
          ctx.beginPath()
          ctx.arc(
            x + Math.cos(angle) * 12 * scale,
            baseY - 40 * scale + Math.sin(angle) * 12 * scale,
            8 * scale,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }

        // Center
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.arc(x, baseY - 40 * scale, 6 * scale, 0, Math.PI * 2)
        ctx.fill()
      } else if (plant === 'tree') {
        // Trunk
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(x - 8 * scale, baseY - 50 * scale, 16 * scale, 50 * scale)

        // Leaves
        ctx.fillStyle = data.watered && data.sunshine ? '#228B22' : '#90EE90'
        ctx.beginPath()
        ctx.arc(x, baseY - 60 * scale, 30 * scale, 0, Math.PI * 2)
        ctx.fill()
      } else if (plant === 'grass') {
        // Grass blades
        ctx.strokeStyle = data.watered ? '#228B22' : '#90EE90'
        ctx.lineWidth = 2
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath()
          ctx.moveTo(x + i * 5 * scale, baseY)
          ctx.lineTo(x + i * 5 * scale, baseY - 20 * scale)
          ctx.stroke()
        }
      }
    })

    // Water droplets if watered
    if (data.watered) {
      ctx.fillStyle = 'rgba(135, 206, 250, 0.6)'
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * w
        const y = Math.random() * h * 0.5
        ctx.beginPath()
        ctx.arc(x, y, 3 * scale, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawRainbow = (ctx, data, w, h) => {
    const centerX = w / 2
    const centerY = h * 0.85
    const scale = w / 400

    // Background
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h)
    skyGradient.addColorStop(0, '#87CEEB')
    skyGradient.addColorStop(1, '#B0E0E6')
    ctx.fillStyle = skyGradient
    ctx.fillRect(0, 0, w, h)

    // Draw rainbow arcs
    const colorMap = {
      red: '#FF0000',
      orange: '#FF7F00',
      yellow: '#FFFF00',
      green: '#00FF00',
      blue: '#0000FF',
      purple: '#8B00FF'
    }

    const arcWidth = 25 * scale
    data.colors.forEach((color, index) => {
      const radius = (150 - index * 25) * scale
      ctx.strokeStyle = colorMap[color] || '#CCCCCC'
      ctx.lineWidth = arcWidth
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, Math.PI, 0)
      ctx.stroke()
    })

    // Draw decorations
    if (data.decorations.includes('sun')) {
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.arc(w * 0.85, h * 0.15, 35 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Rays
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12
        ctx.beginPath()
        ctx.moveTo(w * 0.85, h * 0.15)
        ctx.lineTo(
          w * 0.85 + Math.cos(angle) * 55 * scale,
          h * 0.15 + Math.sin(angle) * 55 * scale
        )
        ctx.lineWidth = 4
        ctx.strokeStyle = '#FFD700'
        ctx.stroke()
      }
    }

    if (data.decorations.includes('cloud')) {
      // Draw multiple clouds
      const cloudPositions = [[w * 0.2, h * 0.2], [w * 0.7, h * 0.3]]
      cloudPositions.forEach(([cx, cy]) => {
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(cx, cy, 20 * scale, 0, Math.PI * 2)
        ctx.arc(cx + 20 * scale, cy, 25 * scale, 0, Math.PI * 2)
        ctx.arc(cx + 40 * scale, cy, 20 * scale, 0, Math.PI * 2)
        ctx.fill()
      })
    }
  }

  const drawAquarium = (ctx, data, w, h) => {
    const scale = w / 400

    // Tank glass
    ctx.fillStyle = data.water ? 'rgba(135, 206, 250, 0.3)' : '#FFFFFF'
    ctx.fillRect(20 * scale, 20 * scale, w - 40 * scale, h - 40 * scale)

    // Tank border
    ctx.strokeStyle = '#4682B4'
    ctx.lineWidth = 4
    ctx.strokeRect(20 * scale, 20 * scale, w - 40 * scale, h - 40 * scale)

    // Water if filled
    if (data.water) {
      const waterGradient = ctx.createLinearGradient(0, 20 * scale, 0, h - 20 * scale)
      waterGradient.addColorStop(0, 'rgba(135, 206, 250, 0.6)')
      waterGradient.addColorStop(1, 'rgba(0, 105, 148, 0.6)')
      ctx.fillStyle = waterGradient
      ctx.fillRect(20 * scale, 20 * scale, w - 40 * scale, h - 40 * scale)
    }

    // Bottom (sand/rocks)
    const bottomY = h - 60 * scale
    data.bottom.forEach((item) => {
      if (item === 'sand') {
        ctx.fillStyle = '#F4A460'
        ctx.fillRect(20 * scale, bottomY, w - 40 * scale, 40 * scale)
      } else if (item === 'rocks') {
        ctx.fillStyle = '#808080'
        for (let i = 0; i < 10; i++) {
          const x = 30 * scale + (w - 60 * scale) * (i / 10)
          const y = bottomY + Math.random() * 20 * scale
          ctx.beginPath()
          ctx.arc(x, y, 8 * scale, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    })

    // Draw fish
    data.fish.forEach((fish, index) => {
      const x = 80 * scale + (index * 80 * scale)
      const y = 100 * scale + (index * 40 * scale)

      if (fish === 'goldfish') {
        ctx.fillStyle = '#FFD700'
      } else if (fish === 'clownfish') {
        ctx.fillStyle = '#FF8C00'
      } else if (fish === 'angelfish') {
        ctx.fillStyle = '#87CEEB'
      }

      // Fish body
      ctx.beginPath()
      ctx.ellipse(x, y, 20 * scale, 12 * scale, 0, 0, Math.PI * 2)
      ctx.fill()

      // Fish tail
      ctx.beginPath()
      ctx.moveTo(x - 20 * scale, y)
      ctx.lineTo(x - 35 * scale, y - 10 * scale)
      ctx.lineTo(x - 35 * scale, y + 10 * scale)
      ctx.closePath()
      ctx.fill()

      // Eye
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(x + 10 * scale, y - 3 * scale, 2 * scale, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw decorations
    if (data.decorations.includes('seaweed')) {
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 3
      for (let i = 0; i < 3; i++) {
        const x = 50 * scale + i * 120 * scale
        ctx.beginPath()
        ctx.moveTo(x, bottomY)
        ctx.quadraticCurveTo(x + 10 * scale, bottomY - 30 * scale, x, bottomY - 60 * scale)
        ctx.stroke()
      }
    }

    if (data.decorations.includes('bubbles')) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      for (let i = 0; i < 10; i++) {
        const x = 50 * scale + Math.random() * (w - 100 * scale)
        const y = 50 * scale + Math.random() * (h - 150 * scale)
        const r = 3 * scale + Math.random() * 5 * scale
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }
    }

    if (data.decorations.includes('castle')) {
      const castleX = w / 2 - 40 * scale
      const castleY = bottomY - 50 * scale
      ctx.fillStyle = '#A9A9A9'

      // Castle base
      ctx.fillRect(castleX, castleY, 80 * scale, 50 * scale)

      // Towers
      ctx.fillRect(castleX - 10 * scale, castleY + 10 * scale, 20 * scale, 40 * scale)
      ctx.fillRect(castleX + 70 * scale, castleY + 10 * scale, 20 * scale, 40 * scale)

      // Door
      ctx.fillStyle = '#000000'
      ctx.fillRect(castleX + 30 * scale, castleY + 25 * scale, 20 * scale, 25 * scale)
    }
  }

  const drawRocket = (ctx, data, w, h) => {
    const centerX = w / 2
    const scale = w / 400
    const rocketY = h * 0.6

    // Background - space
    const spaceGradient = ctx.createLinearGradient(0, 0, 0, h)
    spaceGradient.addColorStop(0, '#000033')
    spaceGradient.addColorStop(1, '#000066')
    ctx.fillStyle = spaceGradient
    ctx.fillRect(0, 0, w, h)

    // Stars
    ctx.fillStyle = '#FFFFFF'
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      ctx.fillRect(x, y, 2, 2)
    }

    // Draw rocket parts
    if (data.parts.includes('body')) {
      // Rocket body
      const bodyGradient = ctx.createLinearGradient(centerX - 40 * scale, 0, centerX + 40 * scale, 0)
      bodyGradient.addColorStop(0, '#DC143C')
      bodyGradient.addColorStop(0.5, '#FF0000')
      bodyGradient.addColorStop(1, '#DC143C')
      ctx.fillStyle = bodyGradient
      ctx.fillRect(centerX - 40 * scale, rocketY, 80 * scale, 150 * scale)

      // Window
      ctx.fillStyle = '#87CEEB'
      ctx.beginPath()
      ctx.arc(centerX, rocketY + 40 * scale, 20 * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#4682B4'
      ctx.lineWidth = 3
      ctx.stroke()
    }

    if (data.parts.includes('nose')) {
      // Nose cone
      ctx.fillStyle = '#C0C0C0'
      ctx.beginPath()
      ctx.moveTo(centerX, rocketY - 60 * scale)
      ctx.lineTo(centerX - 40 * scale, rocketY)
      ctx.lineTo(centerX + 40 * scale, rocketY)
      ctx.closePath()
      ctx.fill()
    }

    if (data.parts.includes('wings')) {
      // Left wing
      ctx.fillStyle = '#FF6347'
      ctx.beginPath()
      ctx.moveTo(centerX - 40 * scale, rocketY + 100 * scale)
      ctx.lineTo(centerX - 80 * scale, rocketY + 150 * scale)
      ctx.lineTo(centerX - 40 * scale, rocketY + 150 * scale)
      ctx.closePath()
      ctx.fill()

      // Right wing
      ctx.beginPath()
      ctx.moveTo(centerX + 40 * scale, rocketY + 100 * scale)
      ctx.lineTo(centerX + 80 * scale, rocketY + 150 * scale)
      ctx.lineTo(centerX + 40 * scale, rocketY + 150 * scale)
      ctx.closePath()
      ctx.fill()
    }

    if (data.parts.includes('engine')) {
      // Engine exhaust
      ctx.fillStyle = '#696969'
      ctx.fillRect(centerX - 30 * scale, rocketY + 150 * scale, 60 * scale, 20 * scale)

      // Fire if fueled
      if (data.fueled || data.launched) {
        const fireGradient = ctx.createLinearGradient(0, rocketY + 170 * scale, 0, rocketY + 220 * scale)
        fireGradient.addColorStop(0, '#FFD700')
        fireGradient.addColorStop(0.5, '#FF8C00')
        fireGradient.addColorStop(1, '#FF0000')
        ctx.fillStyle = fireGradient
        ctx.beginPath()
        ctx.moveTo(centerX - 25 * scale, rocketY + 170 * scale)
        ctx.lineTo(centerX + 25 * scale, rocketY + 170 * scale)
        ctx.lineTo(centerX + 15 * scale, rocketY + 220 * scale)
        ctx.lineTo(centerX, rocketY + 200 * scale)
        ctx.lineTo(centerX - 15 * scale, rocketY + 220 * scale)
        ctx.closePath()
        ctx.fill()
      }
    }

    // Launch effects
    if (data.launched) {
      // Smoke clouds
      ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(
          centerX + (Math.random() - 0.5) * 60 * scale,
          rocketY + 230 * scale + i * 15 * scale,
          20 * scale,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
    }
  }

  const drawButterfly = (ctx, data, w, h) => {
    const centerX = w / 2
    const centerY = h / 2
    const scale = w / 400

    // Background - nature scene
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h)
    bgGradient.addColorStop(0, '#87CEEB')
    bgGradient.addColorStop(1, '#98D8C8')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, w, h)

    // Environment elements (positioned around the circle)
    if (data.environment?.includes('sun')) {
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.arc(w * 0.85, h * 0.15, 30 * scale, 0, Math.PI * 2)
      ctx.fill()
      // Sun rays
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 3 * scale
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8
        ctx.beginPath()
        ctx.moveTo(w * 0.85 + Math.cos(angle) * 35 * scale, h * 0.15 + Math.sin(angle) * 35 * scale)
        ctx.lineTo(w * 0.85 + Math.cos(angle) * 50 * scale, h * 0.15 + Math.sin(angle) * 50 * scale)
        ctx.stroke()
      }
    }

    if (data.environment?.includes('flower')) {
      // Pink flower bottom left
      const flowerX = w * 0.15
      const flowerY = h * 0.75
      ctx.fillStyle = '#FF69B4'
      for (let j = 0; j < 5; j++) {
        const angle = (Math.PI * 2 * j) / 5
        ctx.beginPath()
        ctx.arc(
          flowerX + Math.cos(angle) * 15 * scale,
          flowerY + Math.sin(angle) * 15 * scale,
          10 * scale,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.arc(flowerX, flowerY, 8 * scale, 0, Math.PI * 2)
      ctx.fill()
    }

    // Title
    ctx.fillStyle = '#000'
    ctx.font = `bold ${18 * scale}px Arial`
    ctx.textAlign = 'center'
    ctx.fillText('🦋 Life Cycle of Butterfly (Kitaran Hidup Kupu-kupu)', centerX, 30 * scale)

    // If no stages added yet, show instruction
    if (data.stages.length === 0) {
      ctx.fillStyle = '#666'
      ctx.font = `${16 * scale}px Arial`
      ctx.fillText('Tambah life stages untuk lihat metamorfosis! 🥚🐛🟤🦋', centerX, centerY)
      return
    }

    // Draw circular life cycle
    const radius = 120 * scale
    const stageCount = 4 // Always show 4 stages in circle

    // Define stage positions in circle (clockwise from top)
    const stages = ['egg', 'caterpillar', 'chrysalis', 'butterfly']
    const stageAngles = [
      -Math.PI / 2,        // Top (egg)
      0,                   // Right (caterpillar)
      Math.PI / 2,         // Bottom (chrysalis)
      Math.PI              // Left (butterfly)
    ]

    // Draw center circle for "LIFE CYCLE" text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.beginPath()
    ctx.arc(centerX, centerY, 40 * scale, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#228B22'
    ctx.lineWidth = 2 * scale
    ctx.stroke()
    ctx.fillStyle = '#228B22'
    ctx.font = `bold ${14 * scale}px Arial`
    ctx.textAlign = 'center'
    ctx.fillText('LIFE', centerX, centerY - 5 * scale)
    ctx.fillText('CYCLE', centerX, centerY + 10 * scale)

    // Draw each stage
    stages.forEach((stage, index) => {
      const angle = stageAngles[index]
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      // Check if user added this stage
      const hasStage = data.stages.includes(stage)
      const opacity = hasStage ? 1.0 : 0.3

      // Background circle for stage
      ctx.globalAlpha = opacity
      ctx.fillStyle = '#FFF'
      ctx.beginPath()
      ctx.arc(x, y, 45 * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = hasStage ? '#228B22' : '#CCC'
      ctx.lineWidth = 3 * scale
      ctx.stroke()
      ctx.globalAlpha = 1.0

      ctx.save()
      ctx.globalAlpha = opacity

      // Draw leaf for egg and caterpillar if environment has leaf
      if (data.environment?.includes('leaf') && (stage === 'egg' || stage === 'caterpillar')) {
        ctx.fillStyle = '#228B22'
        ctx.beginPath()
        ctx.ellipse(x, y + 30 * scale, 35 * scale, 12 * scale, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      switch(stage) {
        case 'egg':
          ctx.fillStyle = '#F0E68C'
          ctx.beginPath()
          ctx.ellipse(x, y, 10 * scale, 15 * scale, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = '#DAA520'
          ctx.lineWidth = 2
          ctx.stroke()
          break

        case 'caterpillar':
          ctx.fillStyle = '#90EE90'
          for (let i = 0; i < 4; i++) {
            ctx.beginPath()
            ctx.arc(x - 15 * scale + i * 10 * scale, y, 7 * scale, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = '#228B22'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(x - 15 * scale + i * 10 * scale, y, 5 * scale, 0, Math.PI)
            ctx.stroke()
          }
          // Head
          ctx.fillStyle = '#7CCD7C'
          ctx.beginPath()
          ctx.arc(x + 20 * scale, y, 9 * scale, 0, Math.PI * 2)
          ctx.fill()
          // Eyes
          ctx.fillStyle = '#000'
          ctx.beginPath()
          ctx.arc(x + 18 * scale, y - 3 * scale, 2 * scale, 0, Math.PI * 2)
          ctx.arc(x + 22 * scale, y - 3 * scale, 2 * scale, 0, Math.PI * 2)
          ctx.fill()
          break

        case 'chrysalis':
          ctx.fillStyle = '#8B7355'
          ctx.beginPath()
          ctx.ellipse(x, y, 12 * scale, 25 * scale, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = '#654321'
          ctx.lineWidth = 1.5
          for (let i = 0; i < 4; i++) {
            ctx.beginPath()
            ctx.moveTo(x - 8 * scale, y - 15 * scale + i * 10 * scale)
            ctx.lineTo(x + 8 * scale, y - 15 * scale + i * 10 * scale)
            ctx.stroke()
          }
          break

        case 'butterfly':
          const wingColors = { main: '#FF69B4', light: '#FFB6C1', dark: '#C71585' }
          const leftTopGradient = ctx.createRadialGradient(x - 15 * scale, y - 8 * scale, 0, x - 15 * scale, y - 8 * scale, 20 * scale)
          leftTopGradient.addColorStop(0, wingColors.light)
          leftTopGradient.addColorStop(0.5, wingColors.main)
          leftTopGradient.addColorStop(1, wingColors.dark)

          // Left wings
          ctx.fillStyle = leftTopGradient
          ctx.beginPath()
          ctx.ellipse(x - 18 * scale, y - 10 * scale, 15 * scale, 18 * scale, -0.3, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 1.5
          ctx.stroke()
          ctx.beginPath()
          ctx.ellipse(x - 15 * scale, y + 10 * scale, 12 * scale, 15 * scale, 0.3, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          // Right wings
          ctx.beginPath()
          ctx.ellipse(x + 18 * scale, y - 10 * scale, 15 * scale, 18 * scale, 0.3, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          ctx.beginPath()
          ctx.ellipse(x + 15 * scale, y + 10 * scale, 12 * scale, 15 * scale, -0.3, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          // Body
          ctx.fillStyle = '#2C2C2C'
          ctx.beginPath()
          ctx.ellipse(x, y, 4 * scale, 20 * scale, 0, 0, Math.PI * 2)
          ctx.fill()

          // Head
          ctx.fillStyle = '#000'
          ctx.beginPath()
          ctx.arc(x, y - 15 * scale, 5 * scale, 0, Math.PI * 2)
          ctx.fill()

          // Antennae
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(x, y - 15 * scale)
          ctx.quadraticCurveTo(x - 6 * scale, y - 22 * scale, x - 8 * scale, y - 25 * scale)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(x, y - 15 * scale)
          ctx.quadraticCurveTo(x + 6 * scale, y - 22 * scale, x + 8 * scale, y - 25 * scale)
          ctx.stroke()
          break
      }

      ctx.restore()

      // Stage labels below each circle
      ctx.fillStyle = hasStage ? '#000' : '#999'
      ctx.font = `bold ${12 * scale}px Arial`
      ctx.textAlign = 'center'
      const labels = {
        'egg': '1. Telur\n(Egg)',
        'caterpillar': '2. Ulat\n(Caterpillar)',
        'chrysalis': '3. Kepompong\n(Chrysalis)',
        'butterfly': '4. Kupu-kupu\n(Butterfly)'
      }
      const labelLines = labels[stage].split('\n')
      const labelY = y + 55 * scale
      labelLines.forEach((line, i) => {
        ctx.fillText(line, x, labelY + i * 14 * scale)
      })
    })

    // Draw arrows between stages (only if at least 2 stages added)
    if (data.stages.length >= 2) {
      ctx.strokeStyle = '#228B22'
      ctx.fillStyle = '#228B22'
      ctx.lineWidth = 3 * scale

      for (let i = 0; i < stageCount; i++) {
        const currentStage = stages[i]

        // Only draw arrow if current stage exists
        if (data.stages.includes(currentStage)) {
          const angle1 = stageAngles[i]
          const angle2 = stageAngles[(i + 1) % stageCount]

          // Arrow start and end points (on edge of circles)
          const startX = centerX + Math.cos(angle1) * (radius + 48 * scale)
          const startY = centerY + Math.sin(angle1) * (radius + 48 * scale)
          const endX = centerX + Math.cos(angle2) * (radius - 48 * scale)
          const endY = centerY + Math.sin(angle2) * (radius - 48 * scale)

          // Calculate arrow angle
          const arrowAngle = Math.atan2(endY - startY, endX - startX)

          // Draw curved arrow
          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, angle1, angle2, false)
          ctx.stroke()

          // Draw arrowhead
          const arrowSize = 10 * scale
          ctx.beginPath()
          ctx.moveTo(endX, endY)
          ctx.lineTo(
            endX - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
            endY - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
          )
          ctx.lineTo(
            endX - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
            endY - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
          )
          ctx.closePath()
          ctx.fill()
        }
      }
    }
  }

  const drawCake = (ctx, data, w, h) => {
    const centerX = w / 2
    const scale = w / 400
    let currentY = h * 0.8

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h)
    bgGradient.addColorStop(0, '#FFE4E1')
    bgGradient.addColorStop(1, '#FFB6C1')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, w, h)

    // Layer colors
    const layerColors = {
      chocolate: { cake: '#8B4513', frosting: '#654321' },
      vanilla: { cake: '#F5DEB3', frosting: '#FFE4B5' },
      strawberry: { cake: '#FFB6C1', frosting: '#FF69B4' }
    }

    const frostingColors = {
      pink: '#FF69B4',
      white: '#FFFFFF',
      chocolate: '#654321'
    }

    // Draw layers from bottom to top
    const layerHeight = 50 * scale
    const layerWidth = 150 * scale

    data.layers.forEach((layer, index) => {
      const colors = layerColors[layer] || layerColors.vanilla
      const y = currentY - (index * layerHeight)

      // Cake layer
      ctx.fillStyle = colors.cake
      ctx.fillRect(centerX - layerWidth / 2, y, layerWidth, layerHeight)

      // Layer border
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 2
      ctx.strokeRect(centerX - layerWidth / 2, y, layerWidth, layerHeight)

      // Frosting if available
      if (data.frostings[index]) {
        ctx.fillStyle = frostingColors[data.frostings[index]] || '#FFFFFF'
        ctx.fillRect(centerX - layerWidth / 2, y - 8 * scale, layerWidth, 8 * scale)

        // Frosting drips
        for (let i = 0; i < 5; i++) {
          const x = centerX - layerWidth / 2 + (layerWidth * i / 5)
          ctx.beginPath()
          ctx.moveTo(x, y - 8 * scale)
          ctx.quadraticCurveTo(x + 10 * scale, y, x + 5 * scale, y + 5 * scale)
          ctx.quadraticCurveTo(x, y, x - 5 * scale, y - 8 * scale)
          ctx.closePath()
          ctx.fill()
        }
      }
    })

    // SAFETY: Only show decorations if there are cake layers!
    if (data.layers.length === 0) {
      return
    }

    // Calculate TOP surface of the cake (where decorations sit)
    // This is the top edge of the topmost layer MINUS any frosting
    const topY = currentY - (data.layers.length * layerHeight)
    const frostingHeight = data.frostings.length > 0 ? 8 * scale : 0
    const decorationBaseY = topY - frostingHeight // This is the EXACT top surface

    // All decorations positioned ON TOP of the frosting/cake surface
    if (data.decorations.includes('sprinkles')) {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']
      for (let i = 0; i < 25; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        const x = centerX - layerWidth / 2 + 10 * scale + Math.random() * (layerWidth - 20 * scale)
        const y = decorationBaseY + Math.random() * 8 * scale
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.random() * Math.PI)
        ctx.fillRect(-1.5 * scale, -4 * scale, 3 * scale, 8 * scale)
        ctx.restore()
      }
    }

    if (data.decorations.includes('rainbow_sprinkles')) {
      const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF', '#FF00FF']
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        const x = centerX - layerWidth / 2 + 10 * scale + Math.random() * (layerWidth - 20 * scale)
        const y = decorationBaseY + Math.random() * 8 * scale
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.random() * Math.PI)
        ctx.fillRect(-2 * scale, -5 * scale, 4 * scale, 10 * scale)
        ctx.restore()
      }
    }

    if (data.decorations.includes('chocolate_chips')) {
      ctx.fillStyle = '#654321'
      for (let i = 0; i < 15; i++) {
        const x = centerX - layerWidth / 2 + 10 * scale + Math.random() * (layerWidth - 20 * scale)
        const y = decorationBaseY + Math.random() * 8 * scale
        ctx.beginPath()
        ctx.arc(x, y, 3 * scale, 0, Math.PI * 2)
        ctx.fill()
        // Highlight
        ctx.fillStyle = '#8B4513'
        ctx.beginPath()
        ctx.arc(x - 1 * scale, y - 1 * scale, 1 * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#654321'
      }
    }

    if (data.decorations.includes('strawberries')) {
      for (let i = 0; i < 3; i++) {
        const x = centerX - 40 * scale + i * 40 * scale
        // Strawberry body - SITTING ON TOP surface
        ctx.fillStyle = '#FF0000'
        ctx.beginPath()
        ctx.moveTo(x, decorationBaseY)
        ctx.lineTo(x - 8 * scale, decorationBaseY + 12 * scale)
        ctx.lineTo(x + 8 * scale, decorationBaseY + 12 * scale)
        ctx.closePath()
        ctx.fill()

        // Seeds
        ctx.fillStyle = '#FFFF00'
        for (let j = 0; j < 5; j++) {
          ctx.beginPath()
          ctx.arc(x - 4 * scale + (j % 3) * 4 * scale, decorationBaseY + 4 * scale + j * 2 * scale, 1 * scale, 0, Math.PI * 2)
          ctx.fill()
        }

        // Strawberry top (leaves)
        ctx.fillStyle = '#228B22'
        ctx.fillRect(x - 6 * scale, decorationBaseY - 3 * scale, 12 * scale, 3 * scale)
      }
    }

    if (data.decorations.includes('stars')) {
      ctx.fillStyle = '#FFD700'
      const starPositions = [
        [centerX - 50 * scale, decorationBaseY + 6 * scale],
        [centerX - 20 * scale, decorationBaseY + 4 * scale],
        [centerX + 10 * scale, decorationBaseY + 7 * scale],
        [centerX + 40 * scale, decorationBaseY + 5 * scale]
      ]
      starPositions.forEach(([x, y]) => {
        // Draw star
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
          const outerRadius = 8 * scale
          const innerRadius = 4 * scale

          const xOuter = x + Math.cos(angle) * outerRadius
          const yOuter = y + Math.sin(angle) * outerRadius
          if (i === 0) ctx.moveTo(xOuter, yOuter)
          else ctx.lineTo(xOuter, yOuter)

          const angleInner = angle + Math.PI / 5
          const xInner = x + Math.cos(angleInner) * innerRadius
          const yInner = y + Math.sin(angleInner) * innerRadius
          ctx.lineTo(xInner, yInner)
        }
        ctx.closePath()
        ctx.fill()
        // Star shine
        ctx.fillStyle = '#FFF8DC'
        ctx.beginPath()
        ctx.arc(x - 2 * scale, y - 2 * scale, 2 * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#FFD700'
      })
    }

    if (data.decorations.includes('heart')) {
      ctx.fillStyle = '#FF1493'
      const heartPositions = [
        [centerX - 35 * scale, decorationBaseY + 5 * scale],
        [centerX, decorationBaseY + 3 * scale],
        [centerX + 35 * scale, decorationBaseY + 5 * scale]
      ]
      heartPositions.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.moveTo(x, y + 5 * scale)
        ctx.bezierCurveTo(x, y, x - 5 * scale, y - 5 * scale, x - 8 * scale, y - 5 * scale)
        ctx.bezierCurveTo(x - 12 * scale, y - 5 * scale, x - 12 * scale, y + 2 * scale, x - 12 * scale, y + 2 * scale)
        ctx.bezierCurveTo(x - 12 * scale, y + 5 * scale, x - 8 * scale, y + 8 * scale, x, y + 12 * scale)
        ctx.bezierCurveTo(x + 8 * scale, y + 8 * scale, x + 12 * scale, y + 5 * scale, x + 12 * scale, y + 2 * scale)
        ctx.bezierCurveTo(x + 12 * scale, y + 2 * scale, x + 12 * scale, y - 5 * scale, x + 8 * scale, y - 5 * scale)
        ctx.bezierCurveTo(x + 5 * scale, y - 5 * scale, x, y, x, y + 5 * scale)
        ctx.fill()
        // Heart shine
        ctx.fillStyle = '#FFB6C1'
        ctx.beginPath()
        ctx.arc(x - 3 * scale, y - 1 * scale, 2 * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#FF1493'
      })
    }

    if (data.decorations.includes('candles')) {
      const numCandles = Math.min(data.layers.length, 5)
      for (let i = 0; i < numCandles; i++) {
        const x = centerX - ((numCandles - 1) * 30 * scale) / 2 + i * 30 * scale

        // Candle stick - starts AT decoration base (top of cake)
        ctx.fillStyle = '#FFB6C1'
        ctx.fillRect(x - 3 * scale, decorationBaseY, 6 * scale, 25 * scale)

        // Candle stripes
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(x - 3 * scale, decorationBaseY + 5 * scale, 6 * scale, 2 * scale)
        ctx.fillRect(x - 3 * scale, decorationBaseY + 13 * scale, 6 * scale, 2 * scale)

        // Wick sticks UP from top of cake surface
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x, decorationBaseY)
        ctx.lineTo(x, decorationBaseY - 7 * scale)
        ctx.stroke()

        // Flame on top of wick
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.ellipse(x, decorationBaseY - 12 * scale, 5 * scale, 8 * scale, 0, 0, Math.PI * 2)
        ctx.fill()

        // Flame center
        ctx.fillStyle = '#FF8C00'
        ctx.beginPath()
        ctx.ellipse(x, decorationBaseY - 12 * scale, 3 * scale, 5 * scale, 0, 0, Math.PI * 2)
        ctx.fill()

        // Flame highlight
        ctx.fillStyle = '#FFFF00'
        ctx.beginPath()
        ctx.ellipse(x - 1 * scale, decorationBaseY - 14 * scale, 2 * scale, 3 * scale, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawCircuit = (ctx, data, w, h) => {
    const centerX = w / 2
    const centerY = h / 2
    const scale = w / 400

    // Background - lab table
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h)
    bgGradient.addColorStop(0, '#E8F4F8')
    bgGradient.addColorStop(1, '#D0E8F0')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, w, h)

    // Table
    ctx.fillStyle = '#8B7355'
    ctx.fillRect(0, h * 0.85, w, h * 0.15)

    // Check if circuit is complete
    const hasBattery = data.components?.includes('battery')
    const hasWire = data.components?.includes('wire')
    const hasBulb = data.components?.includes('bulb')
    const hasSwitch = data.components?.includes('switch')
    const circuitClosed = data.circuitClosed || false
    const switchOn = data.switchOn || false

    // Circuit is complete if: battery + wire + bulb + circuit closed + (no switch OR switch is ON)
    const isComplete = hasBattery && hasWire && hasBulb && circuitClosed && (!hasSwitch || switchOn)

    // Draw battery (left side)
    if (hasBattery) {
      const batteryX = centerX - 120 * scale
      const batteryY = centerY

      // Battery body
      ctx.fillStyle = '#2C3E50'
      ctx.fillRect(batteryX - 25 * scale, batteryY - 40 * scale, 50 * scale, 80 * scale)

      // Positive terminal
      ctx.fillStyle = '#E74C3C'
      ctx.fillRect(batteryX - 15 * scale, batteryY - 55 * scale, 30 * scale, 15 * scale)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = `${20 * scale}px Arial`
      ctx.textAlign = 'center'
      ctx.fillText('+', batteryX, batteryY - 42 * scale)

      // Negative terminal
      ctx.fillStyle = '#34495E'
      ctx.fillRect(batteryX - 15 * scale, batteryY + 40 * scale, 30 * scale, 15 * scale)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('−', batteryX, batteryY + 50 * scale)

      // Battery label
      ctx.fillStyle = '#ECF0F1'
      ctx.fillRect(batteryX - 20 * scale, batteryY - 10 * scale, 40 * scale, 20 * scale)
      ctx.fillStyle = '#2C3E50'
      ctx.font = `${12 * scale}px Arial`
      ctx.fillText('9V', batteryX, batteryY + 5 * scale)
    }

    // Draw wires if present
    if (hasWire && hasBattery && hasBulb) {
      ctx.strokeStyle = isComplete ? '#E67E22' : '#95A5A6'
      ctx.lineWidth = 4 * scale
      ctx.lineCap = 'round'

      // Top wire: battery+ to bulb top
      ctx.beginPath()
      ctx.moveTo(centerX - 120 * scale, centerY - 55 * scale)
      ctx.lineTo(centerX - 120 * scale, centerY - 100 * scale)
      ctx.lineTo(centerX + 80 * scale, centerY - 100 * scale)
      ctx.lineTo(centerX + 80 * scale, centerY - 55 * scale) // Connect to bulb top
      ctx.stroke()

      // Bottom wire: bulb bottom to battery-
      ctx.beginPath()
      ctx.moveTo(centerX + 80 * scale, centerY + 80 * scale)
      ctx.lineTo(centerX + 80 * scale, centerY + 110 * scale)
      ctx.lineTo(centerX - 120 * scale, centerY + 110 * scale)
      ctx.lineTo(centerX - 120 * scale, centerY + 55 * scale)
      ctx.stroke()

      // Wire connection indicators
      if (circuitClosed) {
        ctx.fillStyle = isComplete ? '#27AE60' : '#95A5A6'
        // Connection dots at terminals
        const connections = [
          [centerX - 120 * scale, centerY - 55 * scale], // Battery +
          [centerX + 80 * scale, centerY - 55 * scale],   // Bulb top
          [centerX + 80 * scale, centerY + 80 * scale],   // Bulb bottom
          [centerX - 120 * scale, centerY + 55 * scale]   // Battery -
        ]
        connections.forEach(([x, y]) => {
          ctx.beginPath()
          ctx.arc(x, y, 5 * scale, 0, Math.PI * 2)
          ctx.fill()
        })
      }
    }

    // Draw switch (bottom center) if present
    if (hasSwitch) {
      const switchX = centerX
      const switchY = centerY + 110 * scale

      // Switch base
      ctx.fillStyle = '#34495E'
      ctx.fillRect(switchX - 30 * scale, switchY - 10 * scale, 60 * scale, 20 * scale)

      // Switch lever
      if (switchOn) {
        // ON position (lever to right)
        ctx.fillStyle = '#27AE60'
        ctx.strokeStyle = '#27AE60'
      } else {
        // OFF position (lever to left)
        ctx.fillStyle = '#E74C3C'
        ctx.strokeStyle = '#E74C3C'
      }

      ctx.lineWidth = 4 * scale
      ctx.lineCap = 'round'
      ctx.beginPath()

      if (switchOn) {
        // Lever angled right (ON)
        ctx.moveTo(switchX - 5 * scale, switchY)
        ctx.lineTo(switchX + 15 * scale, switchY - 15 * scale)
      } else {
        // Lever angled left (OFF)
        ctx.moveTo(switchX + 5 * scale, switchY)
        ctx.lineTo(switchX - 15 * scale, switchY - 15 * scale)
      }
      ctx.stroke()

      // Lever knob
      ctx.beginPath()
      if (switchOn) {
        ctx.arc(switchX + 15 * scale, switchY - 15 * scale, 6 * scale, 0, Math.PI * 2)
      } else {
        ctx.arc(switchX - 15 * scale, switchY - 15 * scale, 6 * scale, 0, Math.PI * 2)
      }
      ctx.fill()

      // Switch label
      ctx.fillStyle = '#ECF0F1'
      ctx.font = `bold ${10 * scale}px Arial`
      ctx.textAlign = 'center'
      ctx.fillText(switchOn ? 'ON' : 'OFF', switchX, switchY + 25 * scale)
    }

    // Draw bulb (right side)
    if (hasBulb) {
      const bulbX = centerX + 80 * scale
      const bulbY = centerY

      // Bulb base/socket
      ctx.fillStyle = '#7F8C8D'
      ctx.fillRect(bulbX - 20 * scale, bulbY + 40 * scale, 40 * scale, 40 * scale)

      // Screw threads
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = '#5D6D7E'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(bulbX - 20 * scale, bulbY + 45 * scale + i * 8 * scale)
        ctx.lineTo(bulbX + 20 * scale, bulbY + 45 * scale + i * 8 * scale)
        ctx.stroke()
      }

      // Glass bulb
      const bulbGradient = ctx.createRadialGradient(
        bulbX - 10 * scale, bulbY - 20 * scale, 10 * scale,
        bulbX, bulbY, 50 * scale
      )
      if (isComplete) {
        // Lit bulb - glowing yellow
        bulbGradient.addColorStop(0, '#FFFF00')
        bulbGradient.addColorStop(0.4, '#FFD700')
        bulbGradient.addColorStop(1, 'rgba(255, 215, 0, 0.3)')
      } else {
        // Unlit bulb - gray
        bulbGradient.addColorStop(0, '#E8E8E8')
        bulbGradient.addColorStop(0.7, '#C0C0C0')
        bulbGradient.addColorStop(1, 'rgba(192, 192, 192, 0.3)')
      }

      ctx.fillStyle = bulbGradient
      ctx.beginPath()
      ctx.arc(bulbX, bulbY - 10 * scale, 45 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Bulb outline
      ctx.strokeStyle = isComplete ? '#FFA500' : '#95A5A6'
      ctx.lineWidth = 2
      ctx.stroke()

      // Filament
      ctx.strokeStyle = isComplete ? '#FF4500' : '#606060'
      ctx.lineWidth = 2 * scale
      ctx.beginPath()
      ctx.moveTo(bulbX - 8 * scale, bulbY + 20 * scale)
      ctx.lineTo(bulbX - 8 * scale, bulbY - 10 * scale)
      ctx.quadraticCurveTo(bulbX, bulbY - 20 * scale, bulbX + 8 * scale, bulbY - 10 * scale)
      ctx.lineTo(bulbX + 8 * scale, bulbY + 20 * scale)
      ctx.stroke()

      // Glow effect if lit
      if (isComplete) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.3)'
        ctx.beginPath()
        ctx.arc(bulbX, bulbY - 10 * scale, 60 * scale, 0, Math.PI * 2)
        ctx.fill()

        // Shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(bulbX - 15 * scale, bulbY - 25 * scale, 15 * scale, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Status text at bottom
    ctx.font = `bold ${18 * scale}px Arial`
    ctx.textAlign = 'center'

    if (isComplete) {
      // Circuit is complete - bulb is lit
      ctx.fillStyle = '#27AE60'
      ctx.fillText('✅ LITAR LENGKAP!', centerX, h * 0.92)
      ctx.fillStyle = '#FFD700'
      ctx.font = `${16 * scale}px Arial`
      ctx.fillText('💡 Mentol Bercahaya - Elektrik Mengalir! ⚡', centerX, h * 0.96)
    } else if (hasBattery || hasWire || hasBulb || hasSwitch || circuitClosed) {
      // Circuit incomplete
      ctx.fillStyle = '#E74C3C'
      ctx.fillText('❌ Litar Tak Lengkap', centerX, h * 0.92)
      ctx.fillStyle = '#7F8C8D'
      ctx.font = `${14 * scale}px Arial`

      // Show what's missing or wrong
      const missing = []
      if (!hasBattery) missing.push('Battery')
      if (!hasWire) missing.push('Wire')
      if (!hasBulb) missing.push('Bulb')
      if (!circuitClosed) missing.push('Close Circuit')
      if (hasSwitch && !switchOn) missing.push('Turn ON Switch')

      if (missing.length > 0) {
        ctx.fillText(`Perlu: ${missing.join(', ')}`, centerX, h * 0.96)
      }
    } else {
      // Nothing added yet
      ctx.fillStyle = '#95A5A6'
      ctx.fillText('Tambah komponen untuk bina litar!', centerX, h * 0.92)
    }
  }

  const drawPlaceholder = (ctx, id, w, h) => {
    ctx.fillStyle = '#E5E7EB'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#6B7280'
    ctx.font = '20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Exercise ' + id, w / 2, h / 2 - 20)
    ctx.fillText('Coming Soon!', w / 2, h / 2 + 20)
  }

  const getTitle = () => {
    switch(exerciseId) {
      case 1: return 'Your Pizza'
      case 2: return 'Your Burger'
      case 3: return 'Your Ice Cream'
      case 4: return 'Your Snowman'
      case 5: return 'Your Garden'
      case 6: return 'Your Rainbow'
      case 7: return 'Your Aquarium'
      case 8: return 'Your Rocket'
      case 9: return 'Butterfly Life Cycle'
      case 10: return 'Your Electric Circuit'
      default: return 'Your Creation'
    }
  }

  const getStats = () => {
    switch(exerciseId) {
      case 1:
        return (
          <>
            <p>Base: {outputData.base || 'None'}</p>
            <p>Toppings: {outputData.toppings?.length || 0}</p>
            <p>Status: {outputData.baked ? '✅ Baked!' : '⏳ Not baked yet'}</p>
          </>
        )
      case 2:
        return (
          <>
            <p>Bottom Bun: {outputData.hasBottomBun ? '✅' : '❌'}</p>
            <p>Layers: {outputData.layers?.length || 0}</p>
            <p>Top Bun: {outputData.hasTopBun ? '✅' : '❌'}</p>
          </>
        )
      case 3:
        return (
          <>
            <p>Base: {outputData.base || 'None'}</p>
            <p>Scoops: {outputData.scoops?.length || 0}</p>
            <p>Toppings: {outputData.toppings?.length || 0}</p>
          </>
        )
      case 4:
        return (
          <>
            <p>Snowballs: {outputData.snowballs?.length || 0}</p>
            <p>Accessories: {outputData.accessories?.length || 0}</p>
          </>
        )
      case 5:
        return (
          <>
            <p>Plants: {outputData.plants?.length || 0}</p>
            <p>Watered: {outputData.watered ? '✅' : '❌'}</p>
            <p>Sunshine: {outputData.sunshine ? '✅' : '❌'}</p>
          </>
        )
      case 6:
        return (
          <>
            <p>Colors: {outputData.colors?.length || 0}</p>
            <p>Decorations: {outputData.decorations?.length || 0}</p>
          </>
        )
      case 7:
        return (
          <>
            <p>Water: {outputData.water ? '✅' : '❌'}</p>
            <p>Fish: {outputData.fish?.length || 0}</p>
            <p>Decorations: {outputData.decorations?.length || 0}</p>
          </>
        )
      case 8:
        return (
          <>
            <p>Parts: {outputData.parts?.length || 0}</p>
            <p>Fueled: {outputData.fueled ? '✅' : '❌'}</p>
            <p>Launched: {outputData.launched ? '🚀' : '⏳'}</p>
          </>
        )
      case 9:
        return (
          <>
            <p>Life Stages: {outputData.stages?.length || 0}/4</p>
            <p>Environment: {outputData.environment?.length || 0}</p>
            <p>Status: {outputData.stages?.length === 4 ? '✅ Complete!' : '⏳ In Progress'}</p>
          </>
        )
      case 10:
        return (
          <>
            <p>Battery: {outputData.components?.includes('battery') ? '✅' : '❌'}</p>
            <p>Wire: {outputData.components?.includes('wire') ? '✅' : '❌'}</p>
            <p>Bulb: {outputData.components?.includes('bulb') ? '✅' : '❌'}</p>
            <p>Switch: {outputData.components?.includes('switch') ? (outputData.switchOn ? '✅ ON' : '⚠️ OFF') : '—'}</p>
            <p>Circuit: {outputData.circuitClosed ? '✅ Closed' : '❌ Open'}</p>
            <p>Status: {
              (outputData.components?.includes('battery') &&
               outputData.components?.includes('wire') &&
               outputData.components?.includes('bulb') &&
               outputData.circuitClosed &&
               (!outputData.components?.includes('switch') || outputData.switchOn))
              ? '💡 Light ON!' : '⚫ Light OFF'
            }</p>
          </>
        )
      default:
        return <p>Ready to play!</p>
    }
  }

  return (
    <div className="flex flex-col items-center w-full" ref={containerRef}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md"
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-center">
          {getTitle()}
        </h3>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="border-2 border-gray-200 rounded-lg max-w-full h-auto"
          />
        </div>

        {outputData && (
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            {getStats()}
          </div>
        )}
      </motion.div>
    </div>
  )
}
