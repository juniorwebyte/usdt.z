"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Twitter,
  MessageCircle,
  Heart,
  ExternalLink,
  Wallet,
  Copy,
  Check,
  Shield,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import SuccessModal from "./success-modal"
import ReferralSystem from "./referral-system"
import Confetti from "./confetti"
import {
  RECIPIENT_ADDRESS,
  FEE_AMOUNT,
  TOKENS_PER_CLAIM,
  SOCIAL_LINKS,
  PROJECT_CONFIG,
  VERIFICATION_CONFIG,
} from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"
import { TooltipProvider } from "@/components/ui/tooltip"

type TaskStatus = "pending" | "completed" | "verifying" | "failed"

interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  current: boolean
  inputValue?: string
  inputPlaceholder?: string
  link?: string
  linkText?: string
  secondaryLink?: string
  secondaryLinkText?: string
  icon: React.ReactNode
  hashtags?: string
}

interface AirdropTasksProps {
  walletAddress: string
  walletType: string
}

interface ClaimData {
  txHash: string
  timestamp: string
  amount: string
  currency: string
  walletAddress: string
  twitterUsername: string
  telegramId: string
  tokensAllocated: number
}

export default function AirdropTasks({ walletAddress, walletType }: AirdropTasksProps) {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Seguir no Twitter",
      description: `Siga @usdtzcaptalize para ficar por dentro das novidades do ${PROJECT_CONFIG.symbol}`,
      status: "pending",
      current: true,
      inputValue: "",
      inputPlaceholder: "Digite seu nome de usuário do Twitter",
      link: SOCIAL_LINKS.twitter,
      linkText: "Seguir @usdtzcaptalize",
      icon: <Twitter className="h-5 w-5 text-blue-400" />,
    },
    {
      id: 2,
      title: "Retweet com Hashtags",
      description: `Faça um quote retweet do tweet do ${PROJECT_CONFIG.symbol} com as hashtags`,
      status: "pending",
      current: false,
      inputValue: "",
      inputPlaceholder: "Cole o link do seu retweet",
      link: "https://x.com/usdtzcaptalize/status/1929542463603069348",
      linkText: "Ver tweet para retweet",
      icon: <Twitter className="h-5 w-5 text-blue-400" />,
    },
    {
      id: 3,
      title: "Curtir no Twitter",
      description: `Curta o tweet do ${PROJECT_CONFIG.symbol}`,
      status: "pending",
      current: false,
      link: "https://x.com/intent/like?tweet_id=1929542463603069348",
      linkText: "Curtir tweet",
      icon: <Heart className="h-5 w-5 text-red-400" />,
    },
    {
      id: 4,
      title: "Entrar no Grupo do Telegram",
      description: `Entre no grupo do Telegram do ${PROJECT_CONFIG.symbol} e obtenha seu ID`,
      status: "pending",
      current: false,
      inputValue: "",
      inputPlaceholder: "Digite seu ID do Telegram (ex: 6123567677)",
      link: SOCIAL_LINKS.telegram,
      linkText: "Entrar no grupo do Telegram",
      icon: <MessageCircle className="h-5 w-5 text-blue-400" />,
      secondaryLink: "https://t.me/userinfobot",
      secondaryLinkText: "Obtenha seu ID de usuário do Telegram",
    },
  ])

  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "completed" | "failed">("idle")
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationStep, setVerificationStep] = useState(0)
  const [claimStatus, setClaimStatus] = useState<"idle" | "paying" | "confirming" | "completed" | "failed">("idle")
  const [hashtags] = useState(
    `#${PROJECT_CONFIG.symbol} #TetherUSD #ZED20 #CoinGecko #bridging #DeFi #crypto #blockchain #tether #stablecoin`,
  )
  const [existingClaim, setExistingClaim] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [claimData, setClaimData] = useState<ClaimData | null>(null)
  const [referralCode, setReferralCode] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [isCheckingClaim, setIsCheckingClaim] = useState(true)

  // Gerar código de referral único
  useEffect(() => {
    if (walletAddress && !referralCode) {
      const code = `REF${walletAddress.slice(-6).toUpperCase()}`
      setReferralCode(code)
    }
  }, [walletAddress, referralCode])

  // Verificar se o usuário já fez uma reivindicação
  useEffect(() => {
    if (walletAddress) {
      checkExistingClaim(walletAddress)
    } else {
      setIsCheckingClaim(false)
    }
  }, [walletAddress])

  const checkExistingClaim = async (address: string) => {
    try {
      setIsCheckingClaim(true)
      const response = await fetch(`/api/check-claim?wallet=${address}`)
      const data = await response.json()

      if (data.exists) {
        setExistingClaim(true)
        setClaimData(data.claimData)
        setClaimStatus("completed")
        toast({
          title: "Reivindicação existente",
          description: `Este endereço de carteira já fez uma reivindicação de ${PROJECT_CONFIG.symbol}.`,
          className: "bg-blue-950 border-blue-800 text-blue-100",
        })
      }
    } catch (error) {
      console.error("Erro ao verificar reivindicação existente:", error)
    } finally {
      setIsCheckingClaim(false)
    }
  }

  const handleInputChange = (taskId: number, value: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, inputValue: value } : task)))
  }

  const handleVerifyTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: "verifying" } : task)))

    setTimeout(() => {
      let verified = false
      let errorMessage = ""

      switch (taskId) {
        case 1: // Twitter follow
          verified = !!task.inputValue && task.inputValue.trim().length > 0
          errorMessage = "Por favor, insira um nome de usuário válido"
          break
        case 2: // Retweet
          verified = (!!task.inputValue && task.inputValue.includes("twitter.com")) || task.inputValue.includes("x.com")
          errorMessage = "Por favor, insira um link de retweet válido"
          break
        case 3: // Like
          verified = true
          break
        case 4: // Telegram
          verified = !!task.inputValue && /^\d{5,}$/.test(task.inputValue)
          errorMessage = "Por favor, insira um ID de Telegram válido (apenas números)"
          break
      }

      if (verified) {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: "completed", current: false }
            } else if (task.id === taskId + 1 && task.status === "pending") {
              return { ...task, current: true }
            }
            return task
          })
          return updatedTasks
        })

        toast({
          title: "Tarefa verificada",
          description: `A tarefa "${task.title}" foi verificada com sucesso!`,
          className: "bg-green-950 border-green-800 text-green-100",
        })
      } else {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: "failed" } : task)))

        toast({
          title: "Falha na verificação",
          description: errorMessage || "Não foi possível verificar esta tarefa. Tente novamente.",
          variant: "destructive",
        })
      }
    }, 1500)
  }

  const handleStartVerification = async () => {
    const incompleteTasks = tasks.filter((task) => task.status !== "completed")

    if (incompleteTasks.length > 0) {
      toast({
        title: "Tarefas incompletas",
        description: "Complete todas as tarefas antes de iniciar a verificação.",
        variant: "destructive",
      })
      return
    }

    setVerificationStatus("verifying")
    setVerificationProgress(0)
    setVerificationStep(0)

    // Simulação de verificação em etapas
    const totalSteps = VERIFICATION_CONFIG.steps.length
    const stepTime = VERIFICATION_CONFIG.maxVerificationTime / totalSteps

    for (let step = 0; step < totalSteps; step++) {
      setVerificationStep(step)

      // Progresso para esta etapa (cada etapa é 100/totalSteps% do progresso total)
      const startProgress = (step / totalSteps) * 100
      const endProgress = ((step + 1) / totalSteps) * 100

      // Atualizar progresso gradualmente para esta etapa
      const startTime = Date.now()
      const intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime
        const stepProgress = Math.min(elapsed / stepTime, 1)
        const totalProgress = startProgress + (endProgress - startProgress) * stepProgress

        setVerificationProgress(totalProgress)

        if (stepProgress >= 1) {
          clearInterval(intervalId)
        }
      }, 50)

      // Aguardar conclusão desta etapa
      await new Promise((resolve) => setTimeout(resolve, stepTime))
      clearInterval(intervalId)
    }

    setVerificationProgress(100)
    setVerificationStatus("completed")

    toast({
      title: "Verificação concluída",
      description: `Todas as tarefas foram verificadas com sucesso! Você pode reivindicar seus tokens ${PROJECT_CONFIG.symbol} agora.`,
      className: "bg-green-950 border-green-800 text-green-100",
    })
  }

  const bnbToWei = (bnbAmount: string): string => {
    const wei = Number.parseFloat(bnbAmount) * 1e18
    return "0x" + Math.floor(wei).toString(16)
  }

  const sendWhatsAppNotification = async (claimInfo: ClaimData) => {
    try {
      console.log("🚀 Enviando notificação WhatsApp:", claimInfo)

      const response = await fetch("/api/notify-claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimInfo),
      })

      const result = await response.json()
      console.log("📊 Resultado da notificação:", result)

      if (result.success) {
        console.log("✅ Notificação WhatsApp enviada!")
        toast({
          title: "✅ Notificação enviada!",
          description: "Administrador foi notificado sobre sua reivindicação",
          className: "bg-green-950 border-green-800 text-green-100",
        })
      } else {
        console.error("❌ Erro na notificação:", result.message)
        toast({
          title: "⚠️ Aviso",
          description: "Reivindicação processada, mas houve problema na notificação",
          className: "bg-yellow-950 border-yellow-800 text-yellow-100",
        })
      }
    } catch (error) {
      console.error("❌ Erro ao enviar notificação:", error)
    }
  }

  const saveClaim = async (claimInfo: ClaimData) => {
    try {
      const response = await fetch("/api/save-claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...claimInfo,
          tokenSymbol: PROJECT_CONFIG.symbol,
          tokenName: PROJECT_CONFIG.fullName,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("✅ Reivindicação salva com sucesso")
      } else {
        console.error("❌ Erro ao salvar reivindicação:", result.message)
      }
    } catch (error) {
      console.error("❌ Erro ao salvar reivindicação:", error)
    }
  }

  const handleClaimTokens = useCallback(async () => {
    if (verificationStatus !== "completed") {
      toast({
        title: "Verificação necessária",
        description: `Complete a verificação de todas as tarefas antes de reivindicar tokens ${PROJECT_CONFIG.symbol}.`,
        variant: "destructive",
      })
      return
    }

    if (existingClaim) {
      toast({
        title: "Reivindicação existente",
        description: "Este endereço de carteira já fez uma reivindicação.",
        variant: "destructive",
      })
      return
    }

    setClaimStatus("paying")

    try {
      if (!window.ethereum) {
        throw new Error("Carteira Web3 não encontrada. Por favor, instale o MetaMask.")
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      if (!accounts || accounts.length === 0) {
        throw new Error("Nenhuma conta encontrada ou acesso negado.")
      }

      const valueInWei = bnbToWei(FEE_AMOUNT)

      const transactionParameters = {
        to: RECIPIENT_ADDRESS,
        from: accounts[0],
        value: valueInWei,
      }

      toast({
        title: "Pagamento de taxa",
        description: `Sua carteira será aberta para autorizar o pagamento de ${FEE_AMOUNT} BNB (aprox. $0.04 USD) para reivindicar seus tokens.`,
        className: "bg-blue-950 border-blue-800 text-blue-100",
      })

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })

      setClaimStatus("confirming")

      toast({
        title: "Transação enviada",
        description: "Aguardando confirmação da transação na blockchain...",
        className: "bg-blue-950 border-blue-800 text-blue-100",
      })

      // Aguardar confirmação da transação
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const twitterUsername = tasks.find((t) => t.id === 1)?.inputValue || ""
      const telegramId = tasks.find((t) => t.id === 4)?.inputValue || ""

      const claimInfo: ClaimData = {
        txHash,
        timestamp: new Date().toISOString(),
        amount: FEE_AMOUNT,
        currency: "BNB",
        walletAddress,
        twitterUsername,
        telegramId,
        tokensAllocated: TOKENS_PER_CLAIM,
      }

      setClaimData(claimInfo)
      setClaimStatus("completed")
      setExistingClaim(true)

      // Salvar reivindicação
      await saveClaim(claimInfo)

      // Enviar notificação WhatsApp
      await sendWhatsAppNotification(claimInfo)

      setShowConfetti(true)
      setShowSuccessModal(true)

      toast({
        title: "Reivindicação concluída!",
        description: `Parabéns! Você reivindicou ${TOKENS_PER_CLAIM.toLocaleString()} tokens ${PROJECT_CONFIG.symbol} com sucesso!`,
        className: "bg-green-950 border-green-800 text-green-100",
      })

      setTimeout(() => setShowConfetti(false), 5000)
    } catch (error: any) {
      setClaimStatus("failed")

      let errorMessage = "Erro desconhecido"
      if (error.code === 4001) {
        errorMessage = "Transação cancelada pelo usuário"
      } else if (error.code === -32603) {
        errorMessage = "Erro interno da carteira"
      } else if (error.message) {
        errorMessage = error.message
      }

      toast({
        title: "Erro na reivindicação",
        description: errorMessage,
        variant: "destructive",
      })

      setTimeout(() => setClaimStatus("idle"), 3000)
    }
  }, [verificationStatus, existingClaim, walletAddress, tasks])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    toast({
      title: "Copiado!",
      description: `${type} copiado para a área de transferência`,
      className: "bg-green-950 border-green-800 text-green-100",
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const totalTasks = tasks.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  if (isCheckingClaim) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-green-400" />
        <span className="ml-2 text-gray-400">Verificando reivindicações existentes...</span>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {showConfetti && <Confetti />}

        {/* Progresso Geral */}
        <Card className="border-green-800/30 bg-green-900/10 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-green-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Progresso das Tarefas
            </CardTitle>
            <CardDescription className="text-gray-400">
              Complete todas as tarefas para reivindicar seus {TOKENS_PER_CLAIM.toLocaleString()} tokens{" "}
              {PROJECT_CONFIG.symbol}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progresso</span>
                <span className="text-green-400 font-medium">
                  {completedTasks}/{totalTasks} tarefas concluídas
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Tarefas */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "border transition-all duration-300 backdrop-blur-sm shadow-lg",
                  task.current && "border-green-500/50 bg-green-900/20 shadow-green-500/20",
                  task.status === "completed" && "border-green-600/50 bg-green-900/30",
                  task.status === "failed" && "border-red-600/50 bg-red-900/20",
                  task.status === "verifying" && "border-yellow-600/50 bg-yellow-900/20",
                  !task.current && task.status === "pending" && "border-gray-700/50 bg-gray-900/20",
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {task.icon}
                      <div>
                        <CardTitle className="text-lg text-white">{task.title}</CardTitle>
                        <CardDescription className="text-gray-400">{task.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === "completed" && <CheckCircle2 className="h-6 w-6 text-green-400" />}
                      {task.status === "verifying" && <Loader2 className="h-6 w-6 text-yellow-400 animate-spin" />}
                      {task.status === "failed" && <AlertCircle className="h-6 w-6 text-red-400" />}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Hashtags para retweet */}
                  {task.id === 2 && (
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-400">Use estas hashtags no seu retweet:</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(hashtags, "Hashtags")}
                          className="h-6 px-2 text-blue-400 hover:text-blue-300"
                        >
                          {copied === "Hashtags" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <p className="text-xs text-blue-300 font-mono break-all">{hashtags}</p>
                    </div>
                  )}

                  {/* Input para tarefas que precisam */}
                  {task.inputPlaceholder && (
                    <div className="space-y-2">
                      <Input
                        placeholder={task.inputPlaceholder}
                        value={task.inputValue || ""}
                        onChange={(e) => handleInputChange(task.id, e.target.value)}
                        disabled={task.status === "completed" || task.status === "verifying"}
                        className="bg-black/50 border-gray-700 text-white"
                      />
                      {task.id === 4 && (
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Info className="h-3 w-3" />
                          <span>
                            Para obter seu ID do Telegram, envie uma mensagem para{" "}
                            <a
                              href={task.secondaryLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              @userinfobot
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex gap-2 pt-0">
                  {/* Botão principal da tarefa */}
                  {task.link && (
                    <Button
                      onClick={() => window.open(task.link, "_blank")}
                      className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {task.linkText}
                    </Button>
                  )}

                  {/* Botão secundário (se existir) */}
                  {task.secondaryLink && (
                    <Button
                      onClick={() => window.open(task.secondaryLink, "_blank")}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {task.secondaryLinkText}
                    </Button>
                  )}

                  {/* Botão de verificação */}
                  {task.status !== "completed" && (
                    <Button
                      onClick={() => handleVerifyTask(task.id)}
                      disabled={
                        task.status === "verifying" ||
                        !task.current ||
                        (task.inputPlaceholder && !task.inputValue?.trim())
                      }
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 transition-all duration-200"
                      size="sm"
                    >
                      {task.status === "verifying" ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verificando...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Verificar
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Verificação Final */}
        <AnimatePresence>
          {completedTasks === totalTasks && verificationStatus !== "completed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-purple-800/30 bg-purple-900/10 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-400 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verificação Final
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Todas as tarefas foram concluídas. Inicie a verificação final para reivindicar seus tokens.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {verificationStatus === "verifying" && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Verificando...</span>
                        <span className="text-purple-400 font-medium">{Math.round(verificationProgress)}%</span>
                      </div>
                      <Progress value={verificationProgress} className="h-3" />
                      <p className="text-sm text-gray-400 text-center">
                        {VERIFICATION_CONFIG.steps[verificationStep] || "Finalizando verificação..."}
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleStartVerification}
                    disabled={verificationStatus === "verifying"}
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                  >
                    {verificationStatus === "verifying" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Iniciar Verificação Final
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reivindicação de Tokens */}
        <AnimatePresence>
          {verificationStatus === "completed" && !existingClaim && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-green-800/30 bg-green-900/10 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400 flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Reivindicar Tokens {PROJECT_CONFIG.symbol}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Parabéns! Você completou todas as tarefas. Agora você pode reivindicar seus{" "}
                    {TOKENS_PER_CLAIM.toLocaleString()} tokens {PROJECT_CONFIG.symbol}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-yellow-400">Taxa de processamento necessária</p>
                        <p className="text-sm text-gray-300">
                          Uma taxa de {FEE_AMOUNT} BNB (aproximadamente $0.04 USD) é necessária para processar sua
                          reivindicação na blockchain BSC. Esta taxa cobre os custos de gas da transação.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-gray-400">Tokens a receber</div>
                      <div className="text-green-400 font-bold text-lg">
                        {TOKENS_PER_CLAIM.toLocaleString()} {PROJECT_CONFIG.symbol}
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-gray-400">Taxa de processamento</div>
                      <div className="text-yellow-400 font-bold text-lg">{FEE_AMOUNT} BNB</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleClaimTokens}
                    disabled={claimStatus === "paying" || claimStatus === "confirming"}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 transition-all duration-200"
                  >
                    {claimStatus === "paying" && (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processando pagamento...
                      </>
                    )}
                    {claimStatus === "confirming" && (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Confirmando transação...
                      </>
                    )}
                    {claimStatus === "idle" && (
                      <>
                        <Wallet className="h-4 w-4 mr-2" />
                        Reivindicar {TOKENS_PER_CLAIM.toLocaleString()} {PROJECT_CONFIG.symbol}
                      </>
                    )}
                    {claimStatus === "failed" && (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Tentar novamente
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sistema de Referral */}
        {(claimStatus === "completed" || existingClaim) && referralCode && (
          <ReferralSystem walletAddress={walletAddress} referralCode={referralCode} />
        )}

        {/* Modal de Sucesso */}
        {showSuccessModal && claimData && (
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            claimData={claimData}
            referralCode={referralCode}
          />
        )}
      </div>
    </TooltipProvider>
  )
}
