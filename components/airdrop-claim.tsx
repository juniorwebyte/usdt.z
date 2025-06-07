"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import WalletConnector from "./wallet-connector"
import AirdropTasks from "./airdrop-tasks"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, CheckCircle, Zap, Shield, Activity, Wifi, Signal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AirdropClaimProps {
  onWalletUpdate?: (address: string | null, connected: boolean) => void
}

type WalletType = "metamask" | "walletconnect" | "coinbase"

export default function AirdropClaim({ onWalletUpdate }: AirdropClaimProps) {
  const { toast } = useToast()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [walletType, setWalletType] = useState<WalletType | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStep, setConnectionStep] = useState(0)
  const [networkStatus, setNetworkStatus] = useState<"checking" | "connected" | "error">("checking")

  useEffect(() => {
    // Verificar status da rede
    const checkNetwork = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum && isConnected) {
          const chainId = await window.ethereum.request({ method: "eth_chainId" })
          const supportedChains = ["0x38", "0x61", "0x1", "0xa"]

          if (supportedChains.includes(chainId)) {
            setNetworkStatus("connected")
          } else {
            setNetworkStatus("error")
          }
        }
      } catch (error) {
        setNetworkStatus("error")
      }
    }

    if (isConnected) {
      checkNetwork()
    }
  }, [isConnected])

  const handleWalletConnect = (address: string, type: WalletType) => {
    setConnectionStep(1)

    setTimeout(() => {
      setWalletAddress(address)
      setWalletType(type)
      setIsConnected(true)
      setConnectionStep(2)
      setNetworkStatus("connected")

      if (onWalletUpdate) {
        onWalletUpdate(address, true)
      }

      toast({
        title: "🎉 Carteira conectada com sucesso!",
        description: `Conectado à ${type} • ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
        className: "bg-gradient-to-r from-green-900 to-emerald-900 border-green-500 text-green-100",
      })
    }, 1500)
  }

  const handleDisconnect = () => {
    setWalletAddress(null)
    setWalletType(null)
    setIsConnected(false)
    setConnectionStep(0)
    setNetworkStatus("checking")

    if (onWalletUpdate) {
      onWalletUpdate("", false)
    }

    toast({
      title: "Carteira desconectada",
      description: "Sua carteira foi desconectada com sucesso",
      variant: "default",
    })
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div
            key="connect"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-purple-500/40 bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader className="border-b border-purple-500/30 bg-gradient-to-r from-purple-900/40 to-purple-800/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-purple-400 flex items-center gap-3">
                      <Wallet className="h-6 w-6" />
                      Conecte sua Carteira
                    </CardTitle>
                    <CardDescription className="text-gray-300 mt-2">
                      Conecte sua carteira Web3 para participar do AirDrop USDT.z
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-purple-500 text-purple-400 bg-purple-500/10">
                      <Shield className="h-3 w-3 mr-1" />
                      Seguro
                    </Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                      <Activity className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {connectionStep === 1 ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
                      <div className="absolute inset-0 rounded-full h-16 w-16 border-2 border-purple-400/20 mx-auto animate-pulse"></div>
                    </div>
                    <p className="text-purple-400 font-medium">Conectando carteira...</p>
                    <p className="text-gray-400 text-sm mt-2">Aguarde enquanto estabelecemos a conexão segura</p>
                  </motion.div>
                ) : (
                  <WalletConnector onConnect={handleWalletConnect} />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Status da Carteira Conectada */}
            <Card className="border-green-500/40 bg-gradient-to-br from-green-900/30 to-emerald-800/20 backdrop-blur-xl shadow-2xl overflow-hidden hover:shadow-green-500/20 transition-all duration-300">
              <CardHeader className="border-b border-green-500/30 bg-gradient-to-r from-green-900/40 to-emerald-800/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-green-400 flex items-center gap-3">
                      <CheckCircle className="h-6 w-6" />
                      Carteira Conectada
                    </CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                      Sua carteira está conectada e pronta para o airdrop
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${
                        networkStatus === "connected"
                          ? "border-green-500 text-green-400 bg-green-500/10"
                          : networkStatus === "error"
                            ? "border-red-500 text-red-400 bg-red-500/10"
                            : "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                      }`}
                    >
                      {networkStatus === "connected" ? (
                        <>
                          <Signal className="h-3 w-3 mr-1" />
                          BSC
                        </>
                      ) : networkStatus === "error" ? (
                        <>
                          <Wifi className="h-3 w-3 mr-1" />
                          Erro
                        </>
                      ) : (
                        <>
                          <Activity className="h-3 w-3 mr-1" />
                          Verificando
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                        <Wallet className="h-7 w-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Endereço da carteira:</p>
                      <p className="font-mono text-green-400 text-lg font-semibold">
                        {walletAddress
                          ? `${walletAddress.substring(0, 8)}...${walletAddress.substring(walletAddress.length - 6)}`
                          : ""}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500 capitalize">{walletType} Wallet</p>
                        <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                          Verificado
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnect}
                    className="border-red-500/40 hover:bg-red-900/30 hover:text-red-300 transition-all duration-200 hover:border-red-400/60"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Desconectar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Componente de Tarefas */}
            <AirdropTasks walletAddress={walletAddress || ""} walletType={walletType || ""} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
