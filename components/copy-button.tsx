"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useCopyFeedback } from "@/hooks/use-copy-feedback"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  text: string
  successMessage?: string
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
  children?: React.ReactNode
}

export default function CopyButton({
  text,
  successMessage,
  className,
  size = "sm",
  variant = "ghost",
  children,
}: CopyButtonProps) {
  const { copyToClipboard, copied } = useCopyFeedback({ successMessage })

  return (
    <Button
      onClick={() => copyToClipboard(text, successMessage)}
      className={cn("transition-all duration-200", className)}
      size={size}
      variant={variant}
      disabled={copied}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          {children && <span className="ml-2">Copiado!</span>}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {children && <span className="ml-2">{children}</span>}
        </>
      )}
    </Button>
  )
}
