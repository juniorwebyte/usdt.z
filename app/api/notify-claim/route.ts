import { NextResponse } from "next/server"

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

// Configurações do CallMeBot com fallback para desenvolvimento
const CALLMEBOT_CONFIG = {
  whatsapp: {
    baseUrl: "https://api.callmebot.com/whatsapp.php",
    phone: process.env.CALLMEBOT_PHONE || "5511984801839",
    apikey: process.env.CALLMEBOT_API_KEY || "1782254",
  },
  telegram: {
    baseUrl: "https://api.callmebot.com/telegram/send.php",
    chatId: process.env.TELEGRAM_CHAT_ID || "",
    apikey: process.env.TELEGRAM_API_KEY || "",
  },
}

// Função para validar configurações
function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!CALLMEBOT_CONFIG.whatsapp.phone) {
    errors.push("CALLMEBOT_PHONE não configurado")
  }

  if (!CALLMEBOT_CONFIG.whatsapp.apikey) {
    errors.push("CALLMEBOT_API_KEY não configurado")
  }

  // Validar formato do telefone (deve começar com código do país)
  if (CALLMEBOT_CONFIG.whatsapp.phone && !/^\d{10,15}$/.test(CALLMEBOT_CONFIG.whatsapp.phone)) {
    errors.push("Formato do telefone inválido (deve conter apenas números)")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Função para formatar mensagem
function formatClaimMessage(claimData: ClaimData): string {
  const timestamp = new Date(claimData.timestamp).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return `🎉 NOVA REIVINDICAÇÃO USDT.z

💰 Tokens: ${claimData.tokensAllocated.toLocaleString()} USDT.z
💳 Carteira: ${claimData.walletAddress.slice(0, 6)}...${claimData.walletAddress.slice(-4)}
🐦 Twitter: @${claimData.twitterUsername || "N/A"}
📱 Telegram: ${claimData.telegramId || "N/A"}

💸 Taxa paga: ${claimData.amount} ${claimData.currency}
🔗 TX Hash: ${claimData.txHash.slice(0, 10)}...${claimData.txHash.slice(-6)}
⏰ Data: ${timestamp}

🔍 Verificar TX: https://bscscan.com/tx/${claimData.txHash}

---
🤖 Notificação automática do sistema USDT.z`
}

// Função para enviar via WhatsApp
async function sendWhatsAppNotification(message: string): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    console.log("🔧 Verificando configurações do WhatsApp...")
    console.log("📞 Telefone:", CALLMEBOT_CONFIG.whatsapp.phone ? "Configurado" : "Não configurado")
    console.log("🔑 API Key:", CALLMEBOT_CONFIG.whatsapp.apikey ? "Configurado" : "Não configurado")

    // Validar configurações
    const configValidation = validateConfig()
    if (!configValidation.valid) {
      console.error("❌ Configurações inválidas:", configValidation.errors)
      return {
        success: false,
        message: `Configurações inválidas: ${configValidation.errors.join(", ")}`,
        data: { errors: configValidation.errors },
      }
    }

    // Preparar URL da API
    const encodedMessage = encodeURIComponent(message)
    const url = `${CALLMEBOT_CONFIG.whatsapp.baseUrl}?phone=${CALLMEBOT_CONFIG.whatsapp.phone}&text=${encodedMessage}&apikey=${CALLMEBOT_CONFIG.whatsapp.apikey}`

    console.log("🚀 Enviando WhatsApp...")
    console.log("📱 Para:", CALLMEBOT_CONFIG.whatsapp.phone)
    console.log("🔗 URL:", url.substring(0, 100) + "...")

    // Fazer requisição com timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const responseText = await response.text()
    console.log("📋 Status da resposta:", response.status)
    console.log("📋 Resposta completa:", responseText)

    // Verificar diferentes tipos de resposta de sucesso
    const successIndicators = ["Message queued", "Message sent", "OK", "Success", "Sent", response.status === 200]

    const isSuccess = successIndicators.some((indicator) => {
      if (typeof indicator === "boolean") return indicator
      return responseText.toLowerCase().includes(indicator.toLowerCase())
    })

    if (isSuccess) {
      console.log("✅ WhatsApp enviado com sucesso!")
      return {
        success: true,
        message: "Notificação WhatsApp enviada com sucesso",
        data: {
          status: response.status,
          response: responseText,
          phone: CALLMEBOT_CONFIG.whatsapp.phone,
        },
      }
    } else {
      console.error("❌ Falha no envio do WhatsApp:", responseText)
      return {
        success: false,
        message: `Falha na API CallMeBot: ${responseText}`,
        data: {
          status: response.status,
          response: responseText,
          phone: CALLMEBOT_CONFIG.whatsapp.phone,
        },
      }
    }
  } catch (error: any) {
    console.error("❌ Erro no WhatsApp:", error)

    let errorMessage = "Erro desconhecido"
    if (error.name === "AbortError") {
      errorMessage = "Timeout na requisição (15s)"
    } else if (error.message) {
      errorMessage = error.message
    }

    return {
      success: false,
      message: `Erro ao enviar WhatsApp: ${errorMessage}`,
      data: {
        error: errorMessage,
        type: error.name || "UnknownError",
        phone: CALLMEBOT_CONFIG.whatsapp.phone,
      },
    }
  }
}

// Função para enviar via Telegram (opcional)
async function sendTelegramNotification(message: string): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    if (!CALLMEBOT_CONFIG.telegram.chatId || !CALLMEBOT_CONFIG.telegram.apikey) {
      console.log("⚠️ Telegram não configurado, pulando...")
      return {
        success: false,
        message: "Telegram não configurado",
        data: { reason: "not_configured" },
      }
    }

    const encodedMessage = encodeURIComponent(message)
    const url = `${CALLMEBOT_CONFIG.telegram.baseUrl}?chat_id=${CALLMEBOT_CONFIG.telegram.chatId}&text=${encodedMessage}&apikey=${CALLMEBOT_CONFIG.telegram.apikey}`

    console.log("🚀 Enviando Telegram...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "USDT.z-Airdrop-Bot/1.0",
        Accept: "text/plain",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const responseText = await response.text()
    console.log("📨 Resposta Telegram:", responseText)

    if (response.ok) {
      return {
        success: true,
        message: "Notificação Telegram enviada com sucesso",
        data: { response: responseText },
      }
    } else {
      return {
        success: false,
        message: `Erro na API Telegram: ${responseText}`,
        data: { response: responseText },
      }
    }
  } catch (error: any) {
    console.error("❌ Erro Telegram:", error)
    return {
      success: false,
      message: `Erro ao enviar Telegram: ${error.message}`,
      data: { error: error.message },
    }
  }
}

export async function POST(request: Request) {
  try {
    console.log("📋 Iniciando processamento de notificação...")

    const claimData: ClaimData = await request.json()
    console.log("📊 Dados recebidos:", {
      wallet: claimData.walletAddress?.slice(0, 10) + "...",
      tokens: claimData.tokensAllocated,
      txHash: claimData.txHash?.slice(0, 10) + "...",
    })

    // Validar dados obrigatórios
    if (!claimData.walletAddress || !claimData.txHash) {
      console.error("❌ Dados obrigatórios não fornecidos")
      return NextResponse.json(
        {
          success: false,
          message: "Dados obrigatórios não fornecidos (walletAddress, txHash)",
          received: {
            walletAddress: !!claimData.walletAddress,
            txHash: !!claimData.txHash,
          },
        },
        { status: 400 },
      )
    }

    // Formatar mensagem
    const message = formatClaimMessage(claimData)
    console.log("📝 Mensagem formatada:", message.substring(0, 100) + "...")

    // Tentar enviar notificações
    const results = {
      whatsapp: { success: false, message: "", data: null },
      telegram: { success: false, message: "", data: null },
    }

    // Enviar WhatsApp (principal)
    console.log("📱 Tentando enviar WhatsApp...")
    results.whatsapp = await sendWhatsAppNotification(message)

    // Enviar Telegram (se configurado)
    console.log("📨 Tentando enviar Telegram...")
    results.telegram = await sendTelegramNotification(message)

    // Verificar resultados
    const whatsappSuccess = results.whatsapp.success
    const telegramSuccess = results.telegram.success
    const anySuccess = whatsappSuccess || telegramSuccess

    console.log("📊 Resultados:", {
      whatsapp: whatsappSuccess ? "✅" : "❌",
      telegram: telegramSuccess ? "✅" : "❌",
      anySuccess,
    })

    if (anySuccess) {
      return NextResponse.json({
        success: true,
        message: "Notificação enviada com sucesso",
        details: results,
        summary: {
          whatsapp: whatsappSuccess,
          telegram: telegramSuccess,
          totalSent: (whatsappSuccess ? 1 : 0) + (telegramSuccess ? 1 : 0),
        },
        claimData: {
          wallet: claimData.walletAddress,
          tokens: claimData.tokensAllocated,
          txHash: claimData.txHash,
        },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Falha ao enviar todas as notificações",
          details: results,
          config: {
            whatsapp: {
              phone: CALLMEBOT_CONFIG.whatsapp.phone ? "Configurado" : "Não configurado",
              apikey: CALLMEBOT_CONFIG.whatsapp.apikey ? "Configurado" : "Não configurado",
            },
            telegram: {
              chatId: CALLMEBOT_CONFIG.telegram.chatId ? "Configurado" : "Não configurado",
              apikey: CALLMEBOT_CONFIG.telegram.apikey ? "Configurado" : "Não configurado",
            },
          },
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("❌ Erro geral na notificação:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
        error: process.env.NODE_ENV === "development" ? error.message : "Erro interno",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

// Endpoint para testar e verificar configurações
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const test = searchParams.get("test")

    // Verificar configurações
    const configStatus = {
      whatsapp: {
        phone: CALLMEBOT_CONFIG.whatsapp.phone ? "✅ Configurado" : "❌ Não configurado",
        apikey: CALLMEBOT_CONFIG.whatsapp.apikey ? "✅ Configurado" : "❌ Não configurado",
        phoneValue: CALLMEBOT_CONFIG.whatsapp.phone
          ? `${CALLMEBOT_CONFIG.whatsapp.phone.slice(0, 4)}****${CALLMEBOT_CONFIG.whatsapp.phone.slice(-2)}`
          : "Não definido",
      },
      telegram: {
        chatId: CALLMEBOT_CONFIG.telegram.chatId ? "✅ Configurado" : "❌ Não configurado",
        apikey: CALLMEBOT_CONFIG.telegram.apikey ? "✅ Configurado" : "❌ Não configurado",
      },
      validation: validateConfig(),
    }

    if (test === "true") {
      console.log("🧪 Executando teste de notificação...")

      const testMessage = `🧪 TESTE DO SISTEMA USDT.z

⏰ Data: ${new Date().toLocaleString("pt-BR")}
🤖 Sistema funcionando corretamente!
🔧 Teste de conectividade CallMeBot

---
Teste automático do sistema de notificações`

      const results = {
        whatsapp: await sendWhatsAppNotification(testMessage),
        telegram: await sendTelegramNotification(testMessage),
      }

      return NextResponse.json({
        success: true,
        message: "Teste de notificação executado",
        results,
        config: configStatus,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Endpoint de notificações ativo",
      config: configStatus,
      endpoints: {
        notify: "POST /api/notify-claim",
        test: "GET /api/notify-claim?test=true",
        status: "GET /api/notify-claim",
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("❌ Erro no endpoint GET:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro no endpoint de notificações",
        error: process.env.NODE_ENV === "development" ? error.message : "Erro interno",
      },
      { status: 500 },
    )
  }
}
