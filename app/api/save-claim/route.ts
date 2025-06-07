import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, txHash, amount, currency, twitterUsername, telegramId } = body

    if (!walletAddress || !txHash || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados obrigatórios não fornecidos",
        },
        { status: 400 },
      )
    }

    // Simular salvamento da reivindicação
    const claimData = {
      id: `claim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      walletAddress,
      txHash,
      amount,
      currency: currency || "USDT.z",
      twitterUsername: twitterUsername || "",
      telegramId: telegramId || "",
      tokensAllocated: 1000,
      tokenSymbol: "USDT.z",
      tokenName: "Tether USD Bridged ZED20",
      status: "pending",
      processed: false,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    console.log("Reivindicação salva:", claimData)

    return NextResponse.json({
      success: true,
      message: "Reivindicação salva com sucesso",
      claimId: claimData.id,
      data: claimData,
    })
  } catch (error) {
    console.error("Erro ao salvar reivindicação:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
        error: process.env.NODE_ENV === "development" ? error.message : "Erro interno",
      },
      { status: 500 },
    )
  }
}
