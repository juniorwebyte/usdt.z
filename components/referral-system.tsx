"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Share2, Users, Gift, ExternalLink, Copy, Check, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { REFERRAL_BONUS, REFERRED_BONUS, PROJECT_CONFIG } from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"

interface ReferralSystemProps {
  walletAddress: string
  referralCode: string
}

interface ReferralStats {
  totalReferrals: number
  totalRewards: number
  pendingRewards: number
  referredUsers: Array<{
    address: string
    date: string
    reward: number
    status: "pending" | "completed"
  }>
}

export default function ReferralSystem({ walletAddress, referralCode }: ReferralSystemProps) {
  const { toast } = useToast()
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    totalRewards: 0,
    pendingRewards: 0,
    referredUsers: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)

  // Gerar link de referral usando o domínio do projeto em vez de stdog
  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${PROJECT_CONFIG.domain}/claim?ref=${referralCode}`
      : `https://${PROJECT_CONFIG.domain}/claim?ref=${referralCode}`

  useEffect(() => {
    loadReferralStats()
  }, [walletAddress])

  const loadReferralStats = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/referral/stats?wallet=${walletAddress}`)
      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas de referral:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast({
      title: "Link copiado!",
      description: "Link de referral copiado para a área de transferência",
      className: "bg-green-950 border-green-800 text-green-100",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: `Participe do Airdrop ${PROJECT_CONFIG.symbol}`,
        text: `Ganhe tokens ${PROJECT_CONFIG.symbol} gratuitos! Use meu link de referral:`,
        url: referralLink,
      })
    } else {
      copyReferralLink()
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-green-800/30 bg-green-900/10 backdrop-blur-sm shadow-xl overflow-hidden">
        <CardHeader className="border-b border-green-900/20 bg-black/50">
          <CardTitle className="text-xl text-green-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Sistema de Referral
          </CardTitle>
          <CardDescription className="text-gray-400">
            Convide amigos e ganhe {REFERRAL_BONUS} tokens {PROJECT_CONFIG.symbol} para cada pessoa que se cadastrar
            usando seu link
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Link de Referral */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-green-300">Seu Link de Referral</h3>
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-black/50 border-green-800/30 text-green-300 font-mono text-sm"
                />
                <Button
                  onClick={copyReferralLink}
                  className="bg-green-600 hover:bg-green-700 transition-all duration-200"
                  size="sm"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button onClick={shareReferralLink} className="bg-blue-600 hover:bg-blue-700" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  Código: <span className="font-mono text-green-400">{referralCode}</span>
                </p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowTutorial(!showTutorial)}
                  className="text-green-400 hover:text-green-300"
                >
                  {showTutorial ? "Ocultar tutorial" : "Como funciona?"}
                </Button>
              </div>
            </div>

            {/* Tutorial animado */}
            <AnimatePresence>
              {showTutorial && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-black/40 border border-green-800/30 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-green-400">Como usar seu link de referral:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      <li>Copie seu link de referral único</li>
                      <li>Compartilhe com amigos via redes sociais, WhatsApp ou email</li>
                      <li>
                        Quando alguém usar seu link para reivindicar tokens, você ganha {REFERRAL_BONUS}{" "}
                        {PROJECT_CONFIG.symbol}
                      </li>
                      <li>Seus amigos também ganham {REFERRED_BONUS} tokens extras por usar seu link</li>
                      <li>Não há limite para quantos amigos você pode convidar!</li>
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-900/20 border-blue-700/30">
                <CardContent className="p-4 text-center">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 text-blue-400 mx-auto animate-spin" />
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-2xl font-bold text-blue-400"
                    >
                      {stats.totalReferrals}
                    </motion.div>
                  )}
                  <div className="text-sm text-gray-400">Referrals Totais</div>
                </CardContent>
              </Card>

              <Card className="bg-green-900/20 border-green-700/30">
                <CardContent className="p-4 text-center">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 text-green-400 mx-auto animate-spin" />
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-2xl font-bold text-green-400"
                    >
                      {stats.totalRewards.toLocaleString()}
                    </motion.div>
                  )}
                  <div className="text-sm text-gray-400">Tokens Ganhos</div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-900/20 border-yellow-700/30">
                <CardContent className="p-4 text-center">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 text-yellow-400 mx-auto animate-spin" />
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-2xl font-bold text-yellow-400"
                    >
                      {stats.pendingRewards.toLocaleString()}
                    </motion.div>
                  )}
                  <div className="text-sm text-gray-400">Tokens Pendentes</div>
                </CardContent>
              </Card>
            </div>

            {/* Como Funciona */}
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-3 flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Como Funciona o Sistema de Referral
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">1.</span>
                  <span>Compartilhe seu link de referral com amigos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">2.</span>
                  <span>
                    Quando alguém se cadastrar usando seu link, você ganha {REFERRAL_BONUS} tokens{" "}
                    {PROJECT_CONFIG.symbol}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">3.</span>
                  <span>Seu amigo também ganha {REFERRED_BONUS} tokens extras por usar um código de referral</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">4.</span>
                  <span>Os tokens são distribuídos automaticamente após a confirmação</span>
                </div>
              </div>
            </div>

            {/* Lista de Referrals */}
            {stats.referredUsers.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-green-300">Seus Referrals</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {stats.referredUsers.map((user, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <div className="font-mono text-sm text-gray-300">
                          {user.address.slice(0, 6)}...{user.address.slice(-4)}
                        </div>
                        <div className="text-xs text-gray-500">{new Date(user.date).toLocaleDateString("pt-BR")}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">
                          +{user.reward} {PROJECT_CONFIG.symbol}
                        </div>
                        <div
                          className={`text-xs ${user.status === "completed" ? "text-green-400" : "text-yellow-400"}`}
                        >
                          {user.status === "completed" ? "Pago" : "Pendente"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex gap-2">
              <Button
                onClick={shareReferralLink}
                className="flex-1 bg-green-600 hover:bg-green-700 transition-all duration-200"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar Link
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `🚀 Participe do Airdrop ${PROJECT_CONFIG.symbol} e ganhe tokens gratuitos! Use meu link de referral: ${referralLink} #${PROJECT_CONFIG.symbol} #Airdrop #Crypto #TetherUSDZED20`,
                    )}`,
                    "_blank",
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
