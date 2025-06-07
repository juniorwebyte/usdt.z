import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get("wallet")

    if (!walletAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Endereço da carteira é obrigatório",
        },
        { status: 400 },
      )
    }

    // Simular verificação de reivindicação
    const mockClaim = {
      walletAddress,
      status: "pending",
      tokensAllocated: 1000,
      timestamp: new Date().toISOString(),
      formattedTimestamp: new Date().toLocaleString("pt-BR"),
      formattedAmount: "1,000 USDT.z",
    }

    // Simular chance de encontrar uma reivindicação
    const exists = Math.random() > 0.7

    if (exists) {
      return NextResponse.json({
        success: true,
        exists: true,
        claimData: mockClaim,
      })
    }

    return NextResponse.json({
      success: true,
      exists: false,
      message: "Nenhuma reivindicação encontrada para este endereço",
    })
  } catch (error) {
    console.error("Erro ao verificar reivindicação:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao verificar reivindicação",
        error: process.env.NODE_ENV === "development" ? error.message : "Erro interno",
      },
      { status: 500 },
    )
  }
}
