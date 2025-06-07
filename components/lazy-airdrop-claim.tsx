"use client"

import { useState, useEffect } from "react"
import AirdropClaim from "@/components/airdrop-claim"
import { Loader2 } from "lucide-react"

interface LazyAirdropClaimProps {
  onWalletUpdate?: (address: string | null, connected: boolean) => void
}

export default function LazyAirdropClaim({ onWalletUpdate }: LazyAirdropClaimProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular um pequeno atraso para garantir que todos os componentes estejam prontos
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-purple-800/30 bg-black/30 backdrop-blur-sm rounded-lg shadow-xl">
        <Loader2 className="h-10 w-10 text-purple-400 animate-spin mb-4" />
        <p className="text-purple-300">Carregando sistema de reivindicação...</p>
      </div>
    )
  }

  return <AirdropClaim onWalletUpdate={onWalletUpdate} />
}
