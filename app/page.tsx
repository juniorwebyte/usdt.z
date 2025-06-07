"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import {
  ArrowDown,
  Coins,
  Zap,
  Users,
  CheckCircle,
  Award,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Lock,
  Shield,
  Globe,
  Rocket,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Importação dinâmica do CountdownTimer
const CountdownTimer = dynamic(() => import("@/components/countdown-timer"), {
  loading: () => <div className="h-24 w-full animate-pulse bg-teal-900/20 rounded-lg"></div>,
  ssr: false,
})

import PerformanceToggle from "@/components/performance-toggle"
import GalaxyAnimation from "@/components/galaxy-animation"

// Variantes de animação para Framer Motion
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

// Componente para contador de estatísticas com animação
const StatCounter = ({ value, label, duration = 2 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = Number.parseInt(value.toString().replace(/,/g, ""))
    const incrementTime = (duration * 1000) / end

    if (end > 10000) {
      setCount(end)
      return
    }

    const timer = setInterval(() => {
      start += 1
      setCount(Math.floor(start))
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => {
      clearInterval(timer)
    }
  }, [value, duration])

  return (
    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
      <div className="text-2xl md:text-4xl font-bold text-teal-400 mb-2">{count.toLocaleString()}</div>
      <div className="text-sm md:text-base text-gray-300">{label}</div>
    </motion.div>
  )
}

// Componente FAQ com animações melhoradas
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border border-teal-800/30 rounded-lg overflow-hidden mb-4"
      whileHover={{ borderColor: "rgba(45, 212, 191, 0.5)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="w-full p-4 text-left bg-teal-900/20 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(17, 94, 89, 0.3)" }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-base md:text-lg font-medium text-teal-300">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-teal-400" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-teal-900/10"
          >
            <p className="text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Componente Roadmap com animações
const RoadmapItem = ({ phase, title, items, isActive }) => {
  return (
    <motion.div
      className={`relative p-4 md:p-6 rounded-xl border ${isActive ? "border-teal-500 bg-teal-900/30" : "border-teal-800/30 bg-teal-900/10"}`}
      whileHover={{
        scale: 1.02,
        boxShadow: isActive ? "0 0 30px rgba(45, 212, 191, 0.3)" : "0 0 20px rgba(45, 212, 191, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className={`absolute -top-3 left-4 md:left-6 px-3 py-1 rounded-full text-sm font-medium ${isActive ? "bg-teal-500 text-white" : "bg-teal-900/50 text-teal-300"}`}
        whileHover={{ scale: 1.1 }}
      >
        {phase}
      </motion.div>
      <h3 className="text-lg md:text-xl font-semibold mt-3 mb-4 text-teal-300">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CheckCircle className={`h-4 w-4 md:h-5 md:w-5 mt-0.5 ${isActive ? "text-teal-400" : "text-gray-500"}`} />
            <span className="text-sm md:text-base text-gray-300">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function HomePage() {
  const router = useRouter()

  // Função para rolagem suave
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white relative overflow-hidden">
      {/* Background Galaxy Animation */}
      <GalaxyAnimation />

      {/* 1. Hero Section - Completamente Redesenhado */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Conteúdo Principal */}
            <motion.div
              className="text-center lg:text-left z-10 space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Badge de Destaque */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-400/30 rounded-full text-teal-300 text-xs md:text-sm font-medium backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                Pré-venda Ativa - Desconto Limitado
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
              </motion.div>

              {/* Título Principal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-black leading-tight">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-white">
                    Tether USD
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 mt-2">
                    Bridged ZED20
                  </span>
                </h1>
              </motion.div>

              {/* Logo USDT.z */}
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <div className="relative">
                  <motion.div
                    className="text-2xl md:text-4xl lg:text-6xl font-black text-teal-400 px-4 md:px-8 py-2 md:py-4 border-2 border-teal-400/50 rounded-2xl bg-teal-900/20 backdrop-blur-sm"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(45, 212, 191, 0.3)",
                        "0 0 40px rgba(45, 212, 191, 0.6)",
                        "0 0 20px rgba(45, 212, 191, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    USDT.z
                  </motion.div>

                  {/* Partículas orbitando */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 md:w-3 md:h-3 bg-teal-400 rounded-full"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        animate={{
                          x: [0, Math.cos((i / 6) * Math.PI * 2) * 40],
                          y: [0, Math.sin((i / 6) * Math.PI * 2) * 40],
                          rotate: 360,
                        }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Descrição */}
              <motion.p
                className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                A stablecoin mais confiável do mundo, agora bridgeada para a rede ZED20.
                <span className="text-teal-400 font-semibold"> Estabilidade garantida</span>,
                <span className="text-green-400 font-semibold"> taxas reduzidas</span> e
                <span className="text-emerald-400 font-semibold"> transações ultrarrápidas</span>.
              </motion.p>

              {/* Estatísticas Rápidas */}
              <motion.div
                className="grid grid-cols-3 gap-4 md:gap-6 py-4 md:py-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-teal-400">$1.00</div>
                  <div className="text-xs md:text-sm text-gray-400">Preço Estável</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-green-400">100%</div>
                  <div className="text-xs md:text-sm text-gray-400">Lastro USD</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-emerald-400">0.01s</div>
                  <div className="text-xs md:text-sm text-gray-400">Transação</div>
                </div>
              </motion.div>

              {/* Botões de Ação */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                {/* Botão Principal - Comprar */}
                <motion.a
                  href="https://presale.capitalize.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-green-500 to-emerald-500 rounded-xl blur-lg opacity-70"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <Button
                    size="lg"
                    className="relative w-full flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-bold px-4 md:px-8 py-4 md:py-6 rounded-xl shadow-2xl border-2 border-teal-300/50 text-sm md:text-lg"
                  >
                    <Sparkles className="h-4 w-4 md:h-6 md:w-6" />
                    <span>COMPRAR USDT.z</span>
                    <TrendingUp className="h-4 w-4 md:h-6 md:w-6" />
                  </Button>
                </motion.a>

                {/* Botão Secundário - Airdrop */}
                <Link href="/claim" className="flex-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      size="lg"
                      className="w-full bg-teal-600/20 border-2 border-teal-400 text-teal-300 hover:bg-teal-600/30 hover:border-teal-300 px-4 md:px-8 py-4 md:py-6 rounded-xl font-bold text-sm md:text-lg backdrop-blur-sm"
                    >
                      🎁 Airdrop Gratuito
                    </Button>
                  </motion.div>
                </Link>

                {/* Botão Terciário - Saiba Mais */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:flex-none">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 px-4 md:px-8 py-4 md:py-6 rounded-xl font-bold text-sm md:text-lg backdrop-blur-sm"
                    onClick={() => scrollToSection("about")}
                  >
                    Saiba Mais
                  </Button>
                </motion.div>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="pt-6"
              >
                <div className="bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-400/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                  <h3 className="text-base md:text-lg font-semibold text-teal-300 mb-4 text-center">
                    ⏰ Tempo Restante da Pré-venda
                  </h3>
                  <CountdownTimer />
                </div>
              </motion.div>
            </motion.div>

            {/* Visualização 3D Interativa */}
            <motion.div
              className="relative flex items-center justify-center lg:justify-end order-first lg:order-last"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                {/* Logo Central Animado */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotateY: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <motion.div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full flex items-center justify-center shadow-2xl border-4 border-teal-300/50 bg-transparent">
                    <Image
                      src="/512x512.png"
                      alt="Logo USDT.z"
                      width={180}
                      height={180}
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </motion.div>

                {/* Anéis Orbitais */}
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-2 border-teal-400/20 rounded-full"
                    style={{
                      width: `${100 + i * 50}%`,
                      height: `${100 + i * 50}%`,
                      top: `${-25 * i}%`,
                      left: `${-25 * i}%`,
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 15 + i * 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                ))}

                {/* Símbolos Cripto Orbitando */}
                {[
                  { symbol: "BTC", color: "bg-orange-500", delay: 0 },
                  { symbol: "ETH", color: "bg-blue-500", delay: 1 },
                  { symbol: "USDT", color: "bg-green-500", delay: 2 },
                  { symbol: "ZED", color: "bg-purple-500", delay: 3 },
                  { symbol: "USDC", color: "bg-blue-600", delay: 4 },
                  { symbol: "BNB", color: "bg-yellow-500", delay: 5 },
                ].map((crypto, i) => (
                  <motion.div
                    key={crypto.symbol}
                    className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm border-2 border-white/30 backdrop-blur-sm"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      x: [0, Math.cos((i / 6) * Math.PI * 2) * 120],
                      y: [0, Math.sin((i / 6) * Math.PI * 2) * 120],
                      rotate: 360,
                    }}
                    transition={{
                      duration: 12 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: crypto.delay,
                    }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    <div className={`w-full h-full rounded-full ${crypto.color} flex items-center justify-center`}>
                      {crypto.symbol}
                    </div>
                  </motion.div>
                ))}

                {/* Partículas de Energia */}
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 md:w-2 md:h-2 bg-teal-400 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -50, -100],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 3,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Indicador de Scroll Melhorado */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="text-teal-400 text-sm font-medium">Explore mais</span>
          <ArrowDown className="h-6 w-6 text-teal-400" />
        </motion.div>
      </section>

      {/* Banner de Pré-venda Melhorado */}
      <motion.section
        className="py-4 md:py-6 bg-gradient-to-r from-teal-600/80 to-green-600/80 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div className="flex items-center gap-3 text-center md:text-left" whileHover={{ scale: 1.02 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Zap className="h-6 w-6 md:h-8 md:w-8 text-teal-300" />
              </motion.div>
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Pré-venda USDT.z em andamento!</h3>
                <p className="text-sm md:text-base text-teal-200">Token estável bridgeado com preço promocional</p>
              </div>
            </motion.div>
            <motion.a
              href="https://presale.capitalize.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-white/40 to-teal-300/40 rounded-lg blur opacity-75"
                animate={{
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <Button
                size="lg"
                className="relative bg-white text-teal-600 hover:bg-teal-100 font-bold px-4 md:px-6 py-2 rounded-lg shadow-lg"
              >
                Comprar com desconto
              </Button>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Estatísticas com Animações */}
      <motion.section
        id="stats"
        className="py-8 md:py-12 lg:py-16 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-teal-900/30 to-green-900/30 rounded-2xl p-6 md:p-8 border border-teal-800/30 backdrop-blur-sm"
            whileHover={{
              boxShadow: "0 0 40px rgba(45, 212, 191, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <StatCounter value={50000} label="Participantes" />
              <StatCounter value={1000} label="USDT.z por Airdrop" />
              <StatCounter value={3} label="Tarefas Simples" />
              <StatCounter value={100} label="% Estabilidade" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Seção Sobre com Animações */}
      <motion.section
        id="about"
        className="py-12 md:py-16 lg:py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <motion.div className="flex-1" {...fadeInRight}>
              <div className="w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-green-600/20 rounded-2xl flex items-center justify-center border border-teal-500/30">
                <motion.div
                  className="text-8xl font-bold text-teal-400"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(45, 212, 191, 0.5)",
                      "0 0 40px rgba(45, 212, 191, 0.8)",
                      "0 0 20px rgba(45, 212, 191, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  USDT.z
                </motion.div>
              </div>
            </motion.div>
            <motion.div className="flex-1" {...fadeInLeft}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-teal-400">Sobre USDT.z</h2>
              <p className="text-gray-300 text-base md:text-lg mb-6">
                USDT.z é a versão bridgeada do Tether USD na rede ZED20, oferecendo estabilidade e segurança com taxas
                reduzidas e transações mais rápidas.
              </p>
              <div className="space-y-4">
                <motion.div
                  className="bg-teal-900/20 border border-teal-800/30 rounded-lg p-4"
                  whileHover={{
                    scale: 1.03,
                    borderColor: "rgba(45, 212, 191, 0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-teal-400" />
                    <h4 className="font-semibold text-teal-300">Transações Seguras</h4>
                  </div>
                  <p className="text-gray-400">
                    Todas as transações são protegidas pela tecnologia blockchain da ZED20.
                  </p>
                </motion.div>
                <motion.div
                  className="bg-teal-900/20 border border-teal-800/30 rounded-lg p-4"
                  whileHover={{
                    scale: 1.03,
                    borderColor: "rgba(45, 212, 191, 0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Rocket className="h-5 w-5 text-teal-400" />
                    <h4 className="font-semibold text-teal-300">Airdrop Exclusivo</h4>
                  </div>
                  <p className="text-gray-400">Participe agora e receba USDT.z tokens gratuitamente.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Seção de Recursos */}
      <motion.section
        id="features"
        className="py-12 md:py-16 lg:py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-teal-400">Por que USDT.z?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Estabilidade, segurança e inovação em um só lugar.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div {...fadeInLeft} transition={{ delay: 0.1 }}>
              <RoadmapItem
                phase="Fase 1"
                title="Concepção"
                items={["Ideia inicial do USDT.z", "Planejamento estratégico", "Desenvolvimento do Whitepaper"]}
                isActive={true}
              />
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <RoadmapItem
                phase="Fase 2"
                title="Desenvolvimento"
                items={["Desenvolvimento do contrato inteligente", "Auditoria de segurança", "Lançamento do website"]}
                isActive={false}
              />
            </motion.div>

            <motion.div {...fadeInRight} transition={{ delay: 0.3 }}>
              <RoadmapItem
                phase="Fase 3"
                title="Lançamento"
                items={["Lançamento oficial do USDT.z", "Início da distribuição do Airdrop", "Listagem em exchanges"]}
                isActive={false}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Seção de Missão */}
      <motion.section
        id="mission"
        className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-b from-black to-teal-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div className="flex-1" {...fadeInLeft}>
              <div className="w-[600px] h-[400px] bg-gradient-to-br from-teal-400/20 to-green-600/20 rounded-2xl flex items-center justify-center border border-teal-500/30">
                <motion.div
                  className="text-6xl font-bold text-teal-400"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  🚀 USDT.z
                </motion.div>
              </div>
            </motion.div>
            <motion.div className="flex-1" {...fadeInRight}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-teal-400">
                Junte-se à Revolução USDT.z
              </h2>
              <div className="space-y-4">
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mt-1">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-300">Segurança Máxima</h3>
                    <p className="text-gray-400">Transações protegidas pela tecnologia blockchain da ZED20.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mt-1">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-300">Comunidade Global</h3>
                    <p className="text-gray-400">
                      Faça parte de uma comunidade que busca inovação e estabilidade no mundo cripto.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mt-1">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-300">Alcance Mundial</h3>
                    <p className="text-gray-400">
                      USDT.z está disponível globalmente, conectando usuários em todo o mundo.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Seção Tokenomics */}
      <motion.section
        id="tokenomics"
        className="py-12 md:py-16 lg:py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-teal-400">Tokenomics</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-4">Distribuição transparente e sustentável do USDT.z</p>
            <Link href="/tokenomics">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-teal-600 text-teal-400 hover:bg-teal-900/20 mt-2">
                  Ver Tokenomics Completo
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-6 rounded-xl border border-teal-800/30 backdrop-blur-sm"
              {...fadeInLeft}
              whileHover={{
                boxShadow: "0 0 30px rgba(45, 212, 191, 0.2)",
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-teal-300">Distribuição de Tokens</h3>
              <div className="space-y-4">
                {[
                  { label: "Venda Pública e AirDrop", percentage: 40 },
                  { label: "Recompensas e Incentivos", percentage: 20 },
                  { label: "Reserva para Desenvolvimento", percentage: 20 },
                  { label: "Parcerias e Marketing", percentage: 10 },
                  { label: "Equipe e Operações", percentage: 10 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm md:text-base">{item.label}</span>
                      <span className="text-teal-400 font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-teal-900/30 rounded-full h-3 md:h-4 mt-2">
                      <motion.div
                        className="bg-teal-500 h-3 md:h-4 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-6 rounded-xl border border-teal-800/30 backdrop-blur-sm"
              {...fadeInRight}
              whileHover={{
                boxShadow: "0 0 30px rgba(45, 212, 191, 0.2)",
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-teal-300">Detalhes do Token</h3>
              <div className="space-y-6">
                <motion.div className="flex items-start gap-4" whileHover={{ scale: 1.02 }}>
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mt-1">
                    <Coins className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-teal-300">Fornecimento Total</h4>
                    <p className="text-gray-400">500,000,000,000 USDT.z</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-4" whileHover={{ scale: 1.02 }}>
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mt-1">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-teal-300">Recompensas</h4>
                    <p className="text-gray-400">
                      Ao adquirir USDT.z na pré-venda, você recebe bônus exclusivos de até 20%!
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Seção FAQ */}
      <motion.section
        id="faq"
        className="py-12 md:py-16 lg:py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-teal-400">Perguntas Frequentes</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Tudo o que você precisa saber sobre o USDT.z</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="O que é o USDT.z?"
              answer="USDT.z é a versão bridgeada do Tether USD na rede ZED20, oferecendo estabilidade e segurança com taxas reduzidas e transações mais rápidas."
            />
            <FAQItem
              question="Como funciona o airdrop?"
              answer="Para participar do airdrop, você precisa completar algumas tarefas simples como seguir nossas redes sociais e entrar no grupo do Telegram. Após a verificação, você receberá USDT.z tokens gratuitamente."
            />
            <FAQItem
              question="O USDT.z é seguro?"
              answer="Sim, todas as transações são protegidas pela tecnologia blockchain da ZED20, garantindo máxima segurança e transparência."
            />
            <FAQItem
              question="Onde posso comprar USDT.z?"
              answer="Você pode adquirir USDT.z na pré-venda através do nosso site oficial com descontos exclusivos."
            />
            <FAQItem
              question="Qual é a diferença entre USDT e USDT.z?"
              answer="USDT.z é a versão bridgeada do USDT na rede ZED20, oferecendo transações mais rápidas e taxas menores mantendo a mesma estabilidade."
            />
          </div>
        </div>
      </motion.section>

      {/* Seção CTA Final */}
      <motion.section
        id="cta"
        className="py-12 md:py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-teal-900/30 to-green-900/30 rounded-2xl p-6 md:p-8 lg:p-12 border border-teal-800/30 backdrop-blur-sm"
            whileHover={{
              boxShadow: "0 0 50px rgba(45, 212, 191, 0.3)",
              scale: 1.02,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-teal-300"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(45, 212, 191, 0.5)",
                    "0 0 20px rgba(45, 212, 191, 0.8)",
                    "0 0 10px rgba(45, 212, 191, 0.5)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Pronto para fazer parte desta revolução?
              </motion.h2>
              <p className="text-gray-300 text-base md:text-lg mb-8">
                Não perca a oportunidade de participar do airdrop do USDT.z e fazer parte de uma comunidade que está
                mudando o mundo cripto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://presale.capitalize.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-green-500 to-emerald-500 rounded-lg blur-lg opacity-75"
                    animate={{
                      opacity: [0.75, 1, 0.75],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <Button
                    size="lg"
                    className="relative flex items-center gap-2 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-bold px-6 md:px-8 py-4 md:py-6 rounded-lg shadow-lg border-2 border-teal-300"
                  >
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-teal-200" />
                    <span>ADQUIRIR USDT.z</span>
                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-teal-200" />
                  </Button>
                </motion.a>
                <Link href="/claim">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-6 md:px-8">
                      Participar do Airdrop
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Link href="/whitepaper">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="border-teal-600 text-teal-400 hover:bg-teal-900/20">
              <FileText className="h-4 w-4 mr-2" />
              Ler Whitepaper Completo
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Performance Toggle */}
      <PerformanceToggle />
    </main>
  )
}
