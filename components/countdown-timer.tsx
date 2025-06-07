"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Calendar, Rocket } from "lucide-react"

// CONFIGURAÇÃO MANUAL DO TEMPO
// Data específica configurada: 30/04/2025 às 23:49:00
const TARGET_DATE = new Date(2025, 6, 7, 15, 44, 0) // Mês é 0-indexado (0=Jan, 1=Fev, 2=Mar, 3=Abr...)

// Se definido como true, o cronômetro ficará estático (não diminuirá com o tempo)
const STATIC_COUNTDOWN = false

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [loading, setLoading] = useState(true)

  // Usar useCallback para evitar recriação da função em cada renderização
  const calculateTimeLeft = useCallback(() => {
    const difference = TARGET_DATE.getTime() - new Date().getTime()

    if (difference <= 0) {
      // O lançamento já ocorreu
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }, [])

  useEffect(() => {
    // Calcular imediatamente
    setTimeLeft(calculateTimeLeft())
    setLoading(false)

    // Se o cronômetro for estático, não configure o intervalo
    if (STATIC_COUNTDOWN) {
      return
    }

    // Verificar se o usuário prefere reduzir animações
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Atualizar a cada segundo apenas se não preferir reduzir animações
    const updateInterval = prefersReducedMotion ? 10000 : 1000 // 10 segundos ou 1 segundo

    // Atualizar a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, updateInterval)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  // Formatar a data alvo para exibição
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(TARGET_DATE)
  }, [])

  if (loading) {
    return (
      <Card className="border-purple-800/30 bg-black/30 backdrop-blur-sm shadow-xl overflow-hidden w-full">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="h-12 w-12 bg-purple-900/50 rounded-full"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-purple-900/50 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-purple-900/50 rounded"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-purple-800/30 bg-black/30 backdrop-blur-sm shadow-xl overflow-hidden w-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-purple-400 mr-2" />
          <h3 className="text-xl font-bold text-purple-400">Pré-venda encerra em:</h3>
        </div>

        <div className="flex items-center justify-center mb-2">
          <Rocket className="h-8 w-8 text-purple-500 animate-pulse" />
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-300">
            Encerramento: <span className="text-purple-300">{formattedDate}</span>
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-300">{timeLeft.days}</div>
            <div className="text-xs text-gray-400">Dias</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-300">{timeLeft.hours}</div>
            <div className="text-xs text-gray-400">Horas</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-300">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-400">Minutos</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-300">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-400">Segundos</div>
          </div>
        </div>

        <div className="text-center text-gray-300 text-sm">
          <Clock className="h-4 w-4 inline-block mr-1 text-purple-400" />
          Não perca esta oportunidade! Compre agora antes que a pré-venda termine!
        </div>
      </CardContent>
    </Card>
  )
}
