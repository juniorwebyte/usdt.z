"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Loader2,
  ChevronRight,
  Shield,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  Wifi,
  Smartphone,
  Monitor,
  Globe,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { TransactionGuard } from "@/components/security/transaction-guard"
import { verifyDomain, verifySecureConnection, checkPhishingStatus } from "@/lib/security-utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

type WalletType = "metamask" | "walletconnect" | "coinbase"

interface WalletInfo {
  type: WalletType
  name: string
  icon: React.ReactNode
  installed: boolean
  description: string
  features: string[]
  deviceSupport: string[]
}

interface WalletConnectorProps {
  onConnect: (address: string, walletType: WalletType) => void
  onDisconnect?: () => void
}

// Ícones SVG modernizados e otimizados
const MetaMaskIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.9582 1L19.8241 10.7183L22.2665 5.09082L32.9582 1Z" fill="#E17726" />
    <path d="M2.04858 1L15.0707 10.809L12.7423 5.09082L2.04858 1Z" fill="#E27625" />
    <path d="M28.2295 23.5497L25.0376 28.6L32.0619 30.6L34.1789 23.7L28.2295 23.5497Z" fill="#E27625" />
    <path d="M0.848242 23.7L2.95525 30.6L9.97955 28.6L6.78767 23.5497L0.848242 23.7Z" fill="#E27625" />
  </svg>
)

const WalletConnectIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.58818 11.8556C13.1293 8.31442 18.8706 8.31442 22.4117 11.8556L22.8379 12.2818C23.015 12.4589 23.015 12.7459 22.8379 12.9229L21.3801 14.3808C21.2915 14.4693 21.148 14.4693 21.0595 14.3808L20.473 13.7943C18.0026 11.3239 13.9973 11.3239 11.5269 13.7943L10.8989 14.4223C10.8104 14.5109 10.6669 14.5109 10.5783 14.4223L9.12053 12.9646C8.94349 12.7875 8.94349 12.5005 9.12053 12.3235L9.58818 11.8556Z"
      fill="#3B99FC"
    />
    <path
      d="M26.8848 15.4478L28.1874 16.7504C28.3645 16.9275 28.3645 17.2145 28.1874 17.3916L21.8737 23.7053C21.6966 23.8824 21.4096 23.8824 21.2325 23.7053L16.0659 18.5387C16.0216 18.4944 15.9784 18.4944 15.9341 18.5387L10.7675 23.7053C10.5904 23.8824 10.3034 23.8824 10.1263 23.7053L3.81263 17.3916C3.63559 17.2145 3.63559 16.9275 3.81263 16.7504L5.11521 15.4478C5.29225 15.2708 5.57925 15.2708 5.75629 15.4478L10.9229 20.6144C10.9672 20.6587 11.0104 20.6587 11.0547 20.6144L16.2213 15.4478C16.3984 15.2708 16.6854 15.2708 16.8624 15.4478L22.029 20.6144C22.0733 20.6587 22.1165 20.6587 22.1608 20.6144L27.3274 15.4478C27.5045 15.2708 27.7915 15.2708 27.9685 15.4478H26.8848Z"
      fill="#3B99FC"
    />
  </svg>
)

const CoinbaseIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="14" fill="#0052FF" />
    <path
      d="M14 4C8.48 4 4 8.48 4 14C4 19.52 8.48 24 14 24C19.52 24 24 19.52 24 14C24 8.48 19.52 4 14 4ZM14 18C11.79 18 10 16.21 10 14C10 11.79 11.79 10 14 10C16.21 10 18 11.79 18 14C18 16.21 16.21 18 14 18Z"
      fill="white"
    />
  </svg>
)

export default function WalletConnector({ onConnect, onDisconnect }: WalletConnectorProps) {
  const { toast } = useToast()
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null)
  const [securityStatus, setSecurityStatus] = useState<"checking" | "secure" | "warning" | "error">("checking")
  const [securityMessage, setSecurityMessage] = useState<string>("")
  const [wallets, setWallets] = useState<WalletInfo[]>([
    {
      type: "metamask",
      name: "MetaMask",
      icon: <MetaMaskIcon />,
      installed: false,
      description: "A carteira Web3 mais popular do mundo",
      features: ["Segura", "Fácil de usar", "Suporte completo", "DeFi Ready"],
      deviceSupport: ["Desktop", "Mobile"],
    },
    {
      type: "walletconnect",
      name: "WalletConnect",
      icon: <WalletConnectIcon />,
      installed: true,
      description: "Conecte qualquer carteira móvel via QR Code",
      features: ["Multi-carteira", "QR Code", "Móvel", "Universal"],
      deviceSupport: ["Mobile", "Desktop"],
    },
    {
      type: "coinbase",
      name: "Coinbase Wallet",
      icon: <CoinbaseIcon />,
      installed: true,
      description: "Carteira oficial da maior exchange do mundo",
      features: ["Confiável", "Integrada", "Simples", "Institucional"],
      deviceSupport: ["Mobile", "Desktop", "Web"],
    },
  ])

  // Verificar carteiras instaladas com detecção aprimorada
  useEffect(() => {
    const checkWallets = async () => {
      const updatedWallets = [...wallets]

      if (typeof window !== "undefined") {
        // Verificar MetaMask
        if (window.ethereum) {
          const isMetaMask = window.ethereum.isMetaMask
          const isCoinbase = window.ethereum.isCoinbaseWallet

          if (isMetaMask) {
            updatedWallets[0].installed = true
          }
          if (isCoinbase) {
            updatedWallets[2].installed = true
          }
        }

        // Verificar outras carteiras
        if (window.ethereum?.providers) {
          window.ethereum.providers.forEach((provider: any) => {
            if (provider.isMetaMask) updatedWallets[0].installed = true
            if (provider.isCoinbaseWallet) updatedWallets[2].installed = true
          })
        }
      }

      setWallets(updatedWallets)
    }

    checkWallets()
  }, [])

  // Verificar segurança do site com melhorias
  useEffect(() => {
    const checkSiteSecurity = async () => {
      setSecurityStatus("checking")

      try {
        const isDomainSecure = verifyDomain()
        const isConnectionSecure = verifySecureConnection()
        const isNotPhishing = await checkPhishingStatus()

        if (!isDomainSecure) {
          setSecurityStatus("warning")
          setSecurityMessage("Domínio não verificado. Confirme se está no site oficial capitalize.store")
        } else if (!isConnectionSecure) {
          setSecurityStatus("error")
          setSecurityMessage("Conexão não segura. Certifique-se de usar HTTPS.")
        } else if (!isNotPhishing) {
          setSecurityStatus("error")
          setSecurityMessage("Site pode estar comprometido. Proceda com extrema cautela.")
        } else {
          setSecurityStatus("secure")
          setSecurityMessage("Conexão segura verificada. Site oficial confirmado.")
        }
      } catch (error) {
        setSecurityStatus("warning")
        setSecurityMessage("Não foi possível verificar a segurança completamente.")
      }
    }

    checkSiteSecurity()
  }, [])

  const connectWallet = useCallback(
    async (walletType: WalletType) => {
      setSelectedWallet(walletType)
      setIsConnecting(true)

      try {
        let address = ""

        if (walletType === "metamask") {
          if (typeof window.ethereum !== "undefined") {
            // Verificar e solicitar mudança de rede se necessário
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            const supportedChains = ["0x38", "0x61", "0x1", "0xa"]

            if (!supportedChains.includes(chainId)) {
              try {
                await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x38" }],
                })
              } catch (switchError: any) {
                if (switchError.code === 4902) {
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: "0x38",
                        chainName: "Binance Smart Chain",
                        nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
                        rpcUrls: ["https://bsc-dataseed.binance.org/"],
                        blockExplorerUrls: ["https://bscscan.com/"],
                      },
                    ],
                  })
                }
              }
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            address = accounts[0]

            // Configurar eventos aprimorados
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
              if (accounts.length === 0 && onDisconnect) {
                onDisconnect()
                toast({
                  title: "Carteira desconectada",
                  description: "Sua carteira foi desconectada automaticamente",
                  variant: "destructive",
                })
              } else if (accounts.length > 0) {
                onConnect(accounts[0], walletType)
                toast({
                  title: "Conta alterada",
                  description: "Conta da carteira foi alterada com sucesso",
                  className: "bg-blue-950 border-blue-800 text-blue-100",
                })
              }
            })

            window.ethereum.on("chainChanged", () => {
              window.location.reload()
            })
          } else {
            throw new Error("MetaMask não encontrado. Por favor, instale a extensão MetaMask.")
          }
        } else {
          // Simulação aprimorada para outras carteiras
          await new Promise((resolve) => setTimeout(resolve, 2000))
          address =
            walletType === "walletconnect"
              ? "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
              : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        }

        if (address) {
          onConnect(address, walletType)
        }
      } catch (error) {
        console.error("Erro ao conectar carteira:", error)
        toast({
          title: "Erro na conexão",
          description: error instanceof Error ? error.message : "Erro ao conectar carteira",
          variant: "destructive",
          action: <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>,
        })
      } finally {
        setIsConnecting(false)
        setSelectedWallet(null)
      }
    },
    [onConnect, onDisconnect, toast],
  )

  return (
    <TransactionGuard transactionType="connect">
      <div className="space-y-6">
        {/* Status de Segurança Aprimorado */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {securityStatus === "checking" && (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
              <span className="text-sm text-blue-400">Verificando segurança...</span>
            </>
          )}
          {securityStatus === "secure" && (
            <>
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Conexão segura verificada</span>
              <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                SSL Ativo
              </Badge>
            </>
          )}
          {securityStatus === "warning" && (
            <>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-yellow-400">Atenção necessária</span>
            </>
          )}
          {securityStatus === "error" && (
            <>
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-red-400">Problema de segurança detectado</span>
            </>
          )}
        </motion.div>

        {/* Alerta de Segurança Aprimorado */}
        {securityStatus !== "secure" && securityStatus !== "checking" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              variant={securityStatus === "error" ? "destructive" : "default"}
              className={
                securityStatus === "error" ? "bg-red-900/30 border-red-500/40" : "bg-yellow-900/30 border-yellow-500/40"
              }
            >
              <AlertTriangle className={`h-4 w-4 ${securityStatus === "error" ? "text-red-400" : "text-yellow-400"}`} />
              <AlertTitle className={securityStatus === "error" ? "text-red-400" : "text-yellow-400"}>
                Aviso de Segurança
              </AlertTitle>
              <AlertDescription className={securityStatus === "error" ? "text-red-300" : "text-yellow-300"}>
                {securityMessage}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Dicas de Segurança Modernizadas */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="font-medium text-blue-400 text-sm flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Dicas de Segurança Essenciais
                  </p>
                  <ul className="text-xs text-blue-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Confirme que está em <strong>capitalize.store</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Verifique o cadeado de segurança HTTPS no navegador
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Nunca compartilhe sua frase de recuperação
                    </li>
                  </ul>
                  <a
                    href="https://support.metamask.io/hc/en-us/articles/360015489591"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Saiba mais sobre segurança <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de Carteiras Modernizada */}
        <div className="space-y-4">
          <p className="text-center text-gray-400 text-sm mb-6">Escolha uma carteira para conectar com segurança</p>

          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-purple-800/10 hover:from-purple-900/30 hover:to-purple-800/20 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-purple-500/20">
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-6 justify-start hover:bg-transparent"
                    onClick={() => connectWallet(wallet.type)}
                    disabled={isConnecting && selectedWallet !== wallet.type}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          {wallet.icon}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-white group-hover:text-purple-300 transition-colors text-lg">
                              {wallet.name}
                            </span>
                            {wallet.installed && (
                              <Badge
                                variant="secondary"
                                className="bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Instalado
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{wallet.description}</p>
                          <div className="flex gap-2 mb-2">
                            {wallet.features.map((feature, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs border-purple-500/30 text-purple-400 bg-purple-500/10"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            {wallet.deviceSupport.map((device, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs text-gray-500">
                                {device === "Mobile" && <Smartphone className="h-3 w-3" />}
                                {device === "Desktop" && <Monitor className="h-3 w-3" />}
                                {device === "Web" && <Globe className="h-3 w-3" />}
                                <span>{device}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isConnecting && selectedWallet === wallet.type ? (
                          <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                        )}
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Termos e Condições Modernizados */}
        <motion.div
          className="text-center text-xs text-gray-500 pt-6 border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="mb-2">
            Ao conectar sua carteira, você concorda com os{" "}
            <a href="/termos-de-servico" className="text-purple-400 hover:text-purple-300 transition-colors underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a
              href="/politica-de-privacidade"
              className="text-purple-400 hover:text-purple-300 transition-colors underline"
            >
              Política de Privacidade
            </a>
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Conexão Criptografada
            </Badge>
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
              <Wifi className="h-3 w-3 mr-1" />
              Protocolo Seguro
            </Badge>
          </div>
        </motion.div>
      </div>
    </TransactionGuard>
  )
}

// Declaração TypeScript aprimorada para window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      isCoinbaseWallet?: boolean
      providers?: any[]
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: any) => void
    }
  }
}
