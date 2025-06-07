import { NextResponse } from "next/server"

export async function GET(request: Request) {
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

    // Simular estatísticas de referral
    // Em um ambiente real, isso viria de um banco de dados
    const mockStats = {
      totalReferrals: Math.floor(Math.random() * 10),
      totalRewards: Math.floor(Math.random() * 1000),
      pendingRewards: Math.floor(Math.random() * 500),
      referredUsers: Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => ({
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        reward: 100,
        status: Math.random() > 0.5 ? "completed" : "pending",
      })),
    }

    return NextResponse.json({
      success: true,
      stats: mockStats,
    })
  } catch (error) {
    console.error("Erro ao obter estatísticas de referral:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao obter estatísticas",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
