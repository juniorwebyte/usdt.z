"use client"

import { useEffect, useRef } from "react"

export default function GalaxyAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar o tamanho do canvas para preencher a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Criar estrelas
    let stars: { x: number; y: number; radius: number; color: string; velocity: number }[] = []
    const createStars = () => {
      stars = []
      const starCount = Math.floor((canvas.width * canvas.height) / 3000)

      for (let i = 0; i < starCount; i++) {
        const radius = Math.random() * 1.5
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
          velocity: Math.random() * 0.05,
        })
      }
    }

    // Animar estrelas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenhar fundo gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(16, 6, 40, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 10, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Desenhar estrelas
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()

        // Mover estrelas
        star.y += star.velocity

        // Reposicionar estrelas que saem da tela
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    // Inicializar
    window.addEventListener("resize", () => {
      resizeCanvas()
      createStars()
    })

    resizeCanvas()
    createStars()
    animate()

    // Limpar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}
