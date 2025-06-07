import { NextResponse } from "next/server"

// Configuração direta do WhatsApp
const WHATSAPP_CONFIG = {
  apiUrl: "https://api.callmebot.com/whatsapp.php",
  phone: "5511984801839",
  apiKey: "1782254",
}

export async function GET() {
  console.log("🧪 [TEST-WHATSAPP] Iniciando teste...")

  try {
    // Mensagem de teste
    const testMessage = `🧪 TESTE DO SISTEMA WHATSAPP 🧪

📅 Data/Hora: ${new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}

✅ Sistema de notificações funcionando!
🚀 Pronto para receber reivindicações reais.

*Este é um teste automático do sistema.*`

    console.log("📝 [TEST-WHATSAPP] Mensagem de teste criada")

    // Codificar mensagem
    const encodedMessage = encodeURIComponent(testMessage)
    const url = `${WHATSAPP_CONFIG.apiUrl}?phone=${WHATSAPP_CONFIG.phone}&text=${encodedMessage}&apikey=${WHATSAPP_CONFIG.apiKey}`

    console.log("🔗 [TEST-WHATSAPP] URL:", url.substring(0, 100) + "...")

    // Fazer requisição com timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos

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

    console.log("📋 [TEST-WHATSAPP] Status:", response.status)
    console.log("📋 [TEST-WHATSAPP] Resposta:", responseText)

    // Verificar sucesso
    const isSuccess =
      response.ok &&
      !responseText.toLowerCase().includes("error") &&
      !responseText.toLowerCase().includes("failed") &&
      !responseText.toLowerCase().includes("invalid")

    if (isSuccess) {
      console.log("✅ [TEST-WHATSAPP] Teste bem-sucedido!")
      return NextResponse.json({
        success: true,
        message: "Teste WhatsApp enviado com sucesso! Verifique seu WhatsApp.",
        response: responseText,
        status: response.status,
      })
    } else {
      console.error("❌ [TEST-WHATSAPP] Teste falhou:", responseText)
      return NextResponse.json({
        success: false,
        message: "Falha no teste WhatsApp",
        error: responseText,
        status: response.status,
      })
    }
  } catch (error: any) {
    console.error("❌ [TEST-WHATSAPP] Erro:", error)
    return NextResponse.json({
      success: false,
      message: "Erro no teste WhatsApp",
      error: error.message,
      status: 0,
    })
  }
}
