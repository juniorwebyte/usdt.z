import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

interface ClaimData {
  txHash: string
  timestamp: string
  amount: string
  currency: string
  walletAddress: string
  twitterUsername: string
  telegramId: string
  tokensAllocated: number
  tokenSymbol?: string
  tokenName?: string
  userAgent?: string
  ipAddress?: string
  referralCode?: string
}

export async function POST(request: Request) {
  try {
    const claimData: ClaimData = await request.json()

    // Validar dados obrigatórios
    if (!claimData.walletAddress || !claimData.txHash) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados obrigatórios não fornecidos (walletAddress, txHash)",
        },
        { status: 400 },
      )
    }

    // Adicionar informações extras
    const enhancedClaimData = {
      ...claimData,
      id: `claim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "Unknown",
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown",
      status: "pending",
      processed: false,
    }

    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "claims.json")

    // Garantir que o diretório existe
    await fs.mkdir(dataDir, { recursive: true })

    let claims = []

    try {
      // Tentar ler arquivo existente
      const fileContent = await fs.readFile(filePath, "utf-8")
      claims = JSON.parse(fileContent)
    } catch (error) {
      // Se arquivo não existir, inicializar array vazio
      if (error.code === "ENOENT") {
        console.log("Criando novo arquivo de reivindicações...")
        claims = []
      } else {
        console.error("Erro ao ler arquivo de reivindicações:", error)
        claims = []
      }
    }

    // Verificar se já existe uma reivindicação para este endereço
    const existingClaimIndex = claims.findIndex(
      (claim: any) =>
        claim.walletAddress && claim.walletAddress.toLowerCase() === claimData.walletAddress.toLowerCase(),
    )

    if (existingClaimIndex !== -1) {
      // Atualizar reivindicação existente
      claims[existingClaimIndex] = {
        ...claims[existingClaimIndex],
        ...enhancedClaimData,
        updatedAt: new Date().toISOString(),
      }
      console.log("Reivindicação atualizada para:", claimData.walletAddress)
    } else {
      // Adicionar nova reivindicação
      claims.push(enhancedClaimData)
      console.log("Nova reivindicação adicionada para:", claimData.walletAddress)
    }

    // Salvar arquivo
    await fs.writeFile(filePath, JSON.stringify(claims, null, 2))

    // Criar backup com timestamp
    const backupDir = path.join(dataDir, "backups")
    await fs.mkdir(backupDir, { recursive: true })

    const backupFileName = `claims_backup_${new Date().toISOString().replace(/[:.]/g, "-")}.json`
    const backupPath = path.join(backupDir, backupFileName)
    await fs.writeFile(backupPath, JSON.stringify(claims, null, 2))

    return NextResponse.json({
      success: true,
      message: "Reivindicação salva com sucesso",
      claimId: enhancedClaimData.id,
      totalClaims: claims.length,
    })
  } catch (error) {
    console.error("Erro ao salvar reivindicação:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao salvar reivindicação",
        error: process.env.NODE_ENV === "development" ? error.message : "Erro interno",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get("wallet")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "claims.json")

    let claims = []

    try {
      const fileContent = await fs.readFile(filePath, "utf-8")
      claims = JSON.parse(fileContent)
    } catch (error) {
      if (error.code === "ENOENT") {
        return NextResponse.json({
          success: true,
          claims: [],
          total: 0,
          message: "Nenhuma reivindicação encontrada",
        })
      }
      throw error
    }

    // Filtrar por endereço se fornecido
    if (walletAddress) {
      claims = claims.filter(
        (claim: any) => claim.walletAddress && claim.walletAddress.toLowerCase() === walletAddress.toLowerCase(),
      )
    }

    // Ordenar por data (mais recente primeiro)
    claims.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Aplicar paginação
    const paginatedClaims = claims.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      claims: paginatedClaims,
      total: claims.length,
      limit,
      offset,
      hasMore: offset + limit < claims.length,
    })
  } catch (error) {
    console.error("Erro ao buscar reivindicações:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao buscar reivindicações",
        error: process.env.NODE_ENV === "development" ? error.message : "Erro interno",
      },
      { status: 500 },
    )
  }
}
