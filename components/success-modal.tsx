"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Gift, Wallet } from "lucide-react"
import CopyButton from "./copy-button"
import { TOKEN_CONTRACT_ADDRESS, TOKEN_INFO } from "@/lib/constants"

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

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  claimData: ClaimData
}

export default function SuccessModal({ isOpen, onClose, claimData }: SuccessModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "🎉 Reivindicação Concluída!",
      content: (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-green-400">Parabéns!</h3>
          <p className="text-gray-300">
            Sua reivindicação foi processada com sucesso! Você receberá{" "}
            <span className="font-bold text-green-400">{claimData.tokensAllocated.toLocaleString()} USDT.z</span>{" "}
            tokens.
          </p>
        </div>
      ),
    },
    {
      title: "📋 Detalhes da Transação",
      content: (
        <div className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Hash da Transação:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-green-400">
                    {claimData.txHash.slice(0, 10)}...{claimData.txHash.slice(-6)}
                  </span>
                  <CopyButton text={claimData.txHash} successMessage="Hash copiado!" />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tokens Alocados:</span>
                <span className="font-bold text-green-400">{claimData.tokensAllocated.toLocaleString()} USDT.z</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa Paga:</span>
                <span className="text-green-400">
                  {claimData.amount} {claimData.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data:</span>
                <span className="text-green-400">{new Date(claimData.timestamp).toLocaleString("pt-BR")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "📱 Como Importar os Tokens",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-3">Adicionar USDT.z à sua carteira:</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-400">1. Abra sua carteira (MetaMask, Trust Wallet, etc.)</span>
              </div>
              <div>
                <span className="text-gray-400">2. Vá em "Importar Token" ou "Adicionar Token"</span>
              </div>
              <div>
                <span className="text-gray-400">3. Cole o endereço do contrato:</span>
                <div className="mt-2 p-3 bg-gray-800 rounded flex items-center justify-between">
                  <div className="flex-1 mr-2">
                    <div className="font-mono text-xs text-green-400 break-all">{TOKEN_CONTRACT_ADDRESS}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {TOKEN_INFO.name} ({TOKEN_INFO.symbol})
                    </div>
                  </div>
                  <CopyButton text={TOKEN_CONTRACT_ADDRESS} successMessage="Endereço copiado!" />
                </div>
              </div>
              <div>
                <span className="text-gray-400">4. O token aparecerá automaticamente em sua carteira</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🚀 Próximos Passos",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <Card className="bg-purple-900/20 border-purple-700/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-purple-400" />
                  <div>
                    <h5 className="font-medium text-purple-400">Convide Amigos</h5>
                    <p className="text-xs text-gray-400">Ganhe 100 tokens extras para cada amigo que se cadastrar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-700/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-green-400" />
                  <div>
                    <h5 className="font-medium text-green-400">Acompanhe o Status</h5>
                    <p className="text-xs text-gray-400">Verifique o status da distribuição na página Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <h4 className="font-medium text-yellow-400 mb-2">⏰ Distribuição dos Tokens</h4>
            <p className="text-sm text-gray-300">
              Os tokens serão distribuídos automaticamente em sua carteira dentro de 24-48 horas após a confirmação da
              transação. Você receberá uma notificação quando os tokens estiverem disponíveis.
            </p>
          </div>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-green-400">{steps[currentStep].title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">{steps[currentStep].content}</div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-green-400" : "bg-gray-600"}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                Anterior
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button size="sm" onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                Próximo
              </Button>
            ) : (
              <Button size="sm" onClick={onClose} className="bg-green-600 hover:bg-green-700">
                Finalizar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
