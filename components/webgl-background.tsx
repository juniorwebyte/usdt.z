"use client"

import { useCallback } from "react"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber"
import {
  Points,
  PointMaterial,
  Sphere,
  MeshDistortMaterial,
  Environment,
  useTexture,
  shaderMaterial,
  Stars,
  Float,
  Text3D,
  Sparkles,
} from "@react-three/drei"
import * as THREE from "three"
import { ANIMATION_CONFIG } from "@/lib/constants"

// Shader material avançado para efeitos de brilho
const GlowMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.6, 0.6),
    intensity: 1.0,
    resolution: new THREE.Vector2(1, 1),
    mousePosition: new THREE.Vector2(0, 0),
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.y += sin(time * 0.5 + position.x * 2.0) * 0.15;
      pos.x += cos(time * 0.5 + position.z * 2.0) * 0.15;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    uniform vec2 resolution;
    uniform vec2 mousePosition;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      
      // Efeito de ondulação
      float ripple = sin(dist * 50.0 - time * 3.0) * 0.1;
      
      // Efeito de brilho
      float glow = 1.0 - smoothstep(0.0, 0.5, dist + ripple);
      glow = pow(glow, 2.0);
      
      // Efeito de pulso
      float pulse = sin(time * 2.0) * 0.5 + 0.5;
      
      // Efeito de interação com o mouse
      float mouseEffect = 0.0;
      if (mousePosition.x > 0.0 || mousePosition.y > 0.0) {
        vec2 mousePos = mousePosition / resolution;
        float mouseDist = distance(vUv, mousePos);
        mouseEffect = 1.0 - smoothstep(0.0, 0.3, mouseDist);
        mouseEffect *= 0.5;
      }
      
      vec3 finalColor = color * intensity * (glow + mouseEffect) * (0.8 + pulse * 0.4);
      
      gl_FragColor = vec4(finalColor, (glow + mouseEffect) * 0.8);
    }
  `,
)

extend({ GlowMaterial })

// Sistema de partículas avançado com múltiplas camadas e interatividade
function AdvancedParticleSystem({ count = ANIMATION_CONFIG.webgl.quality.high.particleCount, mouse }) {
  const mesh1 = useRef<THREE.Points>(null)
  const mesh2 = useRef<THREE.Points>(null)
  const mesh3 = useRef<THREE.Points>(null)

  const [hovered, setHovered] = useState(false)
  const [positions1, colors1, positions2, colors2, positions3, colors3] = useMemo(() => {
    const positions1 = new Float32Array(count * 3)
    const colors1 = new Float32Array(count * 3)
    const positions2 = new Float32Array(count * 3)
    const colors2 = new Float32Array(count * 3)
    const positions3 = new Float32Array(count * 3)
    const colors3 = new Float32Array(count * 3)

    // Primeira camada - Galáxia espiral com cores USDT.z (tons de azul e verde)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 6
      const radius = Math.random() * 30 + 5
      const height = (Math.random() - 0.5) * 20

      positions1[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5
      positions1[i * 3 + 1] = height + Math.sin(angle * 0.5) * 3
      positions1[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 5

      const colorIntensity = Math.random()
      colors1[i * 3] = 0.1 + colorIntensity * 0.2 // R - baixo para tons azul/verde
      colors1[i * 3 + 1] = 0.6 + colorIntensity * 0.4 // G - alto para tons verde
      colors1[i * 3 + 2] = 0.7 + colorIntensity * 0.3 // B - alto para tons azul
    }

    // Segunda camada - Nuvem de partículas com cores USDT.z
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const radius = 15 + Math.random() * 20

      positions2[i * 3] = radius * Math.cos(theta) * Math.sin(phi)
      positions2[i * 3 + 1] = radius * Math.cos(phi)
      positions2[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi)

      colors2[i * 3] = 0.1 + Math.random() * 0.2 // R - baixo
      colors2[i * 3 + 1] = 0.7 + Math.random() * 0.3 // G - alto
      colors2[i * 3 + 2] = 0.6 + Math.random() * 0.4 // B - médio-alto
    }

    // Terceira camada - Partículas flutuantes com cores USDT.z
    for (let i = 0; i < count; i++) {
      positions3[i * 3] = (Math.random() - 0.5) * 60
      positions3[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions3[i * 3 + 2] = (Math.random() - 0.5) * 60

      colors3[i * 3] = 0.1 + Math.random() * 0.2 // R - baixo
      colors3[i * 3 + 1] = 0.8 + Math.random() * 0.2 // G - alto
      colors3[i * 3 + 2] = 0.7 + Math.random() * 0.3 // B - alto
    }

    return [positions1, colors1, positions2, colors2, positions3, colors3]
  }, [count])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (mesh1.current) {
      mesh1.current.rotation.y = time * 0.02
      mesh1.current.rotation.x = Math.sin(time * 0.01) * 0.1

      // Interatividade com o mouse
      if (mouse.current) {
        const mouseX = mouse.current[0]
        const mouseY = mouse.current[1]
        mesh1.current.rotation.y += mouseX * 0.001
        mesh1.current.rotation.x += mouseY * 0.001
      }
    }

    if (mesh2.current) {
      mesh2.current.rotation.y = -time * 0.015
      mesh2.current.rotation.z = time * 0.01

      // Interatividade com o mouse
      if (mouse.current) {
        const mouseX = mouse.current[0]
        const mouseY = mouse.current[1]
        mesh2.current.rotation.y -= mouseX * 0.0005
        mesh2.current.rotation.z += mouseY * 0.0005
      }
    }

    if (mesh3.current) {
      mesh3.current.rotation.x = time * 0.005
      mesh3.current.rotation.y = time * 0.008

      // Interatividade com o mouse
      if (mouse.current) {
        const mouseX = mouse.current[0]
        const mouseY = mouse.current[1]
        mesh3.current.rotation.x += mouseY * 0.0002
        mesh3.current.rotation.y += mouseX * 0.0002
      }
    }
  })

  return (
    <>
      <Points
        ref={mesh1}
        positions={positions1}
        stride={3}
        frustumCulled={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          vertexColors
          size={hovered ? 2.5 : 2}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
        <bufferAttribute attach="geometry-attributes-color" args={[colors1, 3]} />
      </Points>

      <Points ref={mesh2} positions={positions2} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={hovered ? 2 : 1.5}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
        <bufferAttribute attach="geometry-attributes-color" args={[colors2, 3]} />
      </Points>

      <Points ref={mesh3} positions={positions3} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={hovered ? 1.5 : 1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
        <bufferAttribute attach="geometry-attributes-color" args={[colors3, 3]} />
      </Points>
    </>
  )
}

// Cristais flutuantes com geometrias complexas e materiais modernos
function FloatingCrystals({ mouse }) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1

      // Interatividade com o mouse
      if (mouse.current) {
        const mouseX = mouse.current[0]
        const mouseY = mouse.current[1]
        group.current.rotation.y += mouseX * 0.0005
        group.current.rotation.x += mouseY * 0.0005
      }

      group.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 3
        child.rotation.x = state.clock.elapsedTime * 0.3 * (i + 1)
        child.rotation.z = state.clock.elapsedTime * 0.2 * (i + 1)

        // Efeito de hover
        if (hovered) {
          child.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
        } else {
          child.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
        }
      })
    }
  })

  return (
    <group ref={group} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 12 + Math.sin(i) * 4
        const GeometryComponent = i % 3 === 0 ? Sphere : i % 3 === 1 ? Sphere : Sphere

        return (
          <GeometryComponent
            key={i}
            args={i % 3 === 1 ? [1, 1, 16, 32] : [1, 16, 16]}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
          >
            <MeshDistortMaterial
              color={`hsl(${180 + i * 15}, 80%, ${60 + i * 5}%)`}
              transparent
              opacity={0.7}
              distort={0.4}
              speed={3}
              roughness={0.1}
              metalness={0.9}
              envMapIntensity={1.5}
            />
          </GeometryComponent>
        )
      })}
    </group>
  )
}

// Anéis de energia pulsantes com efeitos avançados
function EnergyRings({ mouse }) {
  const rings = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (rings.current) {
      // Interatividade com o mouse
      if (mouse.current) {
        const mouseX = mouse.current[0]
        const mouseY = mouse.current[1]
        rings.current.rotation.x += mouseY * 0.0002
        rings.current.rotation.y += mouseX * 0.0002
      }

      rings.current.children.forEach((ring, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.3
        ring.scale.setScalar(hovered ? scale * 1.1 : scale)
        ring.rotation.z = state.clock.elapsedTime * 0.3 * (i + 1)
        ring.rotation.y = state.clock.elapsedTime * 0.2 * (i + 1)
        ring.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2
      })
    }
  })

  return (
    <group ref={rings} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, -8 + i * 4, 0]}>
          <ringGeometry args={[4 + i * 2, 5 + i * 2, 64]} />
          <meshBasicMaterial
            color={`hsl(${180 + i * 10}, 90%, 60%)`}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// Túnel de dados com efeito matrix e interatividade
function DataTunnel({ mouse }) {
  const tunnel = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  useFrame((state) => {
    if (tunnel.current && materialRef.current) {
      tunnel.current.rotation.z = state.clock.elapsedTime * 0.1
      materialRef.current.time = state.clock.elapsedTime

      // Atualizar resolução e posição do mouse para o shader
      materialRef.current.resolution = new THREE.Vector2(size.width, size.height)

      if (mouse.current) {
        materialRef.current.mousePosition = new THREE.Vector2(
          (mouse.current[0] / size.width) * 2 - 1,
          -(mouse.current[1] / size.height) * 2 + 1,
        )
      }
    }
  })

  return (
    <mesh ref={tunnel} position={[0, 0, -15]}>
      <cylinderGeometry args={[20, 8, 40, 64, 1, true]} />
      <glowMaterial ref={materialRef} transparent color={new THREE.Color(0.1, 0.7, 0.6)} intensity={1.2} />
    </mesh>
  )
}

// Logo 3D flutuante do USDT.z
function USDTzLogo({ position = [0, 10, 0], scale = 1 }) {
  const texture = useTexture("/images/USDT-1.png")
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial map={texture} transparent emissive="#2dd4bf" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  )
}

// Texto 3D para o nome do token
function TokenText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = 0 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        position={[0, -10, 0]}
        scale={2}
        bevelEnabled
        bevelSize={0.05}
        bevelThickness={0.1}
        height={0.5}
        curveSegments={12}
      >
        USDT.z
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Float>
  )
}

// Efeito de partículas brilhantes
function GlowingParticles({ count = 100 }) {
  return <Sparkles count={count} scale={50} size={4} speed={0.3} color="#2dd4bf" opacity={0.7} />
}

// Componente principal da cena WebGL
function WebGLScene({ mouse }) {
  const { camera, scene } = useThree()

  useEffect(() => {
    camera.position.set(0, 5, 20)
    scene.fog = new THREE.FogExp2(0x000000, 0.01)
  }, [camera, scene])

  return (
    <>
      <color attach="background" args={["#000000"]} />

      {/* Sistema de iluminação aprimorado */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2dd4bf" distance={50} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" distance={30} />
      <pointLight position={[0, 20, 0]} intensity={0.8} color="#06b6d4" distance={40} />
      <spotLight position={[0, 30, 0]} angle={0.3} penumbra={1} intensity={1} color="#2dd4bf" castShadow />

      {/* Estrelas de fundo */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Componentes animados */}
      <AdvancedParticleSystem mouse={mouse} />
      <FloatingCrystals mouse={mouse} />
      <EnergyRings mouse={mouse} />
      <DataTunnel mouse={mouse} />
      <GlowingParticles />
      <USDTzLogo />
      <TokenText />

      {/* Ambiente HDR */}
      <Environment preset="night" />
    </>
  )
}

// Fallback melhorado com animações CSS
function EnhancedFallback() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black -z-10 overflow-hidden">
      {/* Partículas CSS animadas */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Gradientes animados mais escuros */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-teal-400/3 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Logo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl font-bold text-teal-400 animate-pulse">USDT.z</div>
      </div>
    </div>
  )
}

export default function WebGLBackground() {
  const [mounted, setMounted] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [performanceMode, setPerformanceMode] = useState<"high" | "medium" | "low">("high")
  const mouse = useRef([0, 0])

  // Rastrear posição do mouse
  const handleMouseMove = useCallback((e) => {
    mouse.current = [e.clientX, e.clientY]
  }, [])

  useEffect(() => {
    setMounted(true)
    window.addEventListener("mousemove", handleMouseMove)

    // Verificar suporte WebGL e performance do dispositivo
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")

      if (!gl) {
        setHasWebGL(false)
        return
      }

      // Detectar performance do dispositivo
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4

      // Definir modo de performance com base nas capacidades do dispositivo
      if (isMobile || hasLowMemory) {
        setPerformanceMode("low")
      } else {
        const gpuInfo = gl.getExtension("WEBGL_debug_renderer_info")
        const renderer = gpuInfo ? gl.getParameter(gpuInfo.UNMASKED_RENDERER_WEBGL) : ""

        // Verificar se é uma GPU de baixo desempenho
        const isLowEndGPU =
          renderer.toLowerCase().includes("intel") || renderer.toLowerCase().includes("hd graphics") || !renderer

        setPerformanceMode(isLowEndGPU ? "medium" : "high")
      }
    } catch (e) {
      setHasWebGL(false)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  if (!mounted) return null
  if (!hasWebGL) return <EnhancedFallback />

  // Configurações baseadas no modo de performance
  const qualitySettings = ANIMATION_CONFIG.webgl.quality[performanceMode]

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 75 }}
        gl={{
          antialias: qualitySettings.antialias,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={performanceMode === "high" ? [1, 2] : performanceMode === "medium" ? [1, 1.5] : [1, 1]}
        performance={{ min: 0.5 }}
        shadows={qualitySettings.shadows}
      >
        <WebGLScene mouse={mouse} />
      </Canvas>
    </div>
  )
}
