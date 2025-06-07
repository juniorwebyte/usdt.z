import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

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

    // Verificar se existe uma reivindicação para este endereço
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "claims.json")

    let claims = []

    try {
      // Verificar se o diretório existe, se não, criar
      await fs.mkdir(dataDir, { recursive: true })

      // Verificar se o arquivo existe
      await fs.access(filePath)

      // Ler o arquivo
      const fileContent = await fs.readFile(filePath, "utf-8")
      claims = JSON.parse(fileContent)
    } catch (error) {
      // Se o arquivo não existir ou houver erro na leitura, inicializar array vazio
      if (error.code === "ENOENT") {
        console.log("Arquivo de reivindicações não encontrado, criando novo...")
        claims = []
        // Criar arquivo vazio
        await fs.writeFile(filePath, JSON.stringify([], null, 2))
      } else {
        console.error("Erro ao ler arquivo de reivindicações:", error)
        claims = []
      }
    }

    // Procurar por uma reivindicação existente
    const existingClaim = claims.find(
      (claim: any) => claim.walletAddress && claim.walletAddress.toLowerCase() === walletAddress.toLowerCase(),
    )

    if (existingClaim) {
      return NextResponse.json({
        success: true,
        exists: true,
        claimData: {
          ...existingClaim,
          // Adicionar informações de formatação para exibição
          formattedTimestamp: new Date(existingClaim.timestamp).toLocaleString("pt-BR"),
          formattedAmount: `${existingClaim.tokensAllocated?.toLocaleString() || "N/A"} USDT.z`,
        },
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
