"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface UseCopyFeedbackOptions {
  successMessage?: string
  duration?: number
}

export function useCopyFeedback(options: UseCopyFeedbackOptions = {}) {
  const { successMessage = "Copiado!", duration = 2000 } = options
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string, customMessage?: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)

      toast({
        title: customMessage || successMessage,
        duration,
        className: "bg-green-950 border-green-800 text-green-100",
      })

      // Reset do estado após a duração especificada
      setTimeout(() => setCopied(false), duration)

      return true
    } catch (error) {
      // Fallback para navegadores mais antigos
      try {
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)

        setCopied(true)
        toast({
          title: customMessage || successMessage,
          duration,
          className: "bg-green-950 border-green-800 text-green-100",
        })

        setTimeout(() => setCopied(false), duration)
        return true
      } catch (fallbackError) {
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar para a área de transferência",
          variant: "destructive",
        })
        return false
      }
    }
  }

  return { copyToClipboard, copied }
}
