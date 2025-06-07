"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import GalaxyAnimation from "@/components/galaxy-animation"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { InfoIcon, Mail, Shield, Sparkles, Zap, TrendingUp, Clock, Users, Award, Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import AirdropClaim from "@/components/airdrop-claim"

export default function ClaimPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleWalletUpdate = (address: string | null, connected: boolean) => {
    setWalletAddress(address || "")
    setIsWalletConnected(connected)
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-black via-purple-950/20 to-black text-white relative overflow-hidden">
      <GalaxyAnimation />
      <Navbar isWalletConnected={isWalletConnected} walletAddress={walletAddress} onWalletUpdate={handleWalletUpdate} />

      <div className="max-w-5xl w-full z-10 mt-20 mb-10 space-y-8">
        {/* Hero Section Modernizada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          {/* Status Badges */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 animate-pulse"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Airdrop Ativo
            </Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400 bg-purple-500/10">
              <TrendingUp className="h-4 w-4 mr-2" />
              10,000 USDT.z
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10">
              <Clock className="h-4 w-4 mr-2" />
              {currentTime.toLocaleTimeString("pt-BR")}
            </Badge>
          </div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Reivindicar Tokens
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Complete as etapas abaixo para reivindicar seus{" "}
            <span className="text-purple-400 font-semibold animate-pulse">10,000 USDT.z</span> tokens
          </motion.p>

          {/* Stats Cards Melhoradas */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                  10,000
                </div>
                <div className="text-sm text-gray-400">Tokens por Claim</div>
                <Sparkles className="h-4 w-4 mx-auto mt-2 text-purple-400 opacity-60" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform">$0.04</div>
                <div className="text-sm text-gray-400">Taxa de Processamento</div>
                <Zap className="h-4 w-4 mx-auto mt-2 text-blue-400 opacity-60" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/40 to-green-800/20 border-green-500/30 hover:border-green-400/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">BSC</div>
                <div className="text-sm text-gray-400">Rede Blockchain</div>
                <Shield className="h-4 w-4 mx-auto mt-2 text-green-400 opacity-60" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform">24h</div>
                <div className="text-sm text-gray-400">Processamento</div>
                <Clock className="h-4 w-4 mx-auto mt-2 text-yellow-400 opacity-60" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Informações de Contato Modernizadas */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Alert className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <InfoIcon className="h-5 w-5 text-blue-400" />
            <AlertTitle className="text-blue-400 font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Suporte e Informações
            </AlertTitle>
            <AlertDescription className="text-gray-300">
              Para mais informações ou em caso de demora no envio dos seus tokens 💰, entre em contato conosco:
              <div className="flex items-center gap-2 mt-3 p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                <Mail className="h-4 w-4 text-blue-400" />
                <a
                  href="mailto:contato@capitalize.store"
                  className="text-blue-400 hover:text-blue-300 transition-colors underline font-medium"
                >
                  contato@capitalize.store
                </a>
                <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                  Resposta em 24h
                </Badge>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Alerta de Segurança Modernizado */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Alert className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/40 backdrop-blur-sm shadow-lg hover:shadow-green-500/20 transition-all duration-300">
            <Shield className="h-5 w-5 text-green-400" />
            <AlertTitle className="text-green-400 font-semibold flex items-center gap-2">
              <Award className="h-4 w-4" />
              Segurança Certificada
            </AlertTitle>
            <AlertDescription className="text-green-300">
              <div className="space-y-2">
                <p>Verifique sempre se você está no site oficial antes de conectar sua carteira.</p>
                <div className="flex items-center gap-4 mt-3">
                  <Link
                    href="/seguranca"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 underline font-medium transition-colors"
                  >
                    <Star className="h-4 w-4" />
                    Saiba mais sobre segurança →
                  </Link>
                  <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                    SSL Verificado
                  </Badge>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Componente Principal de Claim */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <AirdropClaim onWalletUpdate={handleWalletUpdate} />
        </motion.div>

        {/* Seção de Benefícios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Processamento Rápido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Tokens processados em até 24 horas após a confirmação da transação na blockchain BSC.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/30 hover:border-green-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança Garantida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Sistema com múltiplas camadas de segurança e verificação de domínio para proteger seus ativos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Suporte 24/7
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Equipe de suporte disponível para ajudar com qualquer dúvida ou problema durante o processo.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Toaster />
    </main>
  )
}
