// Client-side only storage service
export interface UserClaim {
  id: string
  name: string
  walletAddress: string
  walletType: string
  twitterUsername: string
  telegramId: string
  tokensRequested: number
  status: "pending" | "processed" | "rejected" | "failed"
  createdAt: string
  processedAt?: string
}

export interface SystemConfig {
  airdropEnabled: boolean
  totalTokensAllocated: number
  tokensPerClaim: number
  claimDeadline: string
  requireTwitter: boolean
  requireTelegram: boolean
  launchDate?: string
}

export interface AirdropStats {
  totalClaims: number
  pendingClaims: number
  processedClaims: number
  rejectedClaims: number
  failedClaims: number
  totalTokensAllocated: number
  tokensDistributed: number
  tokensRemaining: number
}

// Client-side storage functions
export function getAllClaims(): UserClaim[] {
  try {
    if (typeof window !== "undefined") {
      const claims = localStorage.getItem("user-claims")
      return claims ? JSON.parse(claims) : []
    }
    return []
  } catch (error) {
    console.error("Erro ao obter reivindicações:", error)
    return []
  }
}

export function getSystemConfig(): SystemConfig {
  try {
    if (typeof window !== "undefined") {
      const config = localStorage.getItem("system-config")
      return config
        ? JSON.parse(config)
        : {
            airdropEnabled: true,
            totalTokensAllocated: 1000000,
            tokensPerClaim: 1000,
            claimDeadline: "",
            requireTwitter: true,
            requireTelegram: true,
          }
    }
    return {
      airdropEnabled: true,
      totalTokensAllocated: 1000000,
      tokensPerClaim: 1000,
      claimDeadline: "",
      requireTwitter: true,
      requireTelegram: true,
    }
  } catch (error) {
    console.error("Erro ao obter configurações:", error)
    return {
      airdropEnabled: true,
      totalTokensAllocated: 1000000,
      tokensPerClaim: 1000,
      claimDeadline: "",
      requireTwitter: true,
      requireTelegram: true,
    }
  }
}

export function getAirdropStats(): AirdropStats {
  try {
    const claims = getAllClaims()
    const config = getSystemConfig()

    const pendingClaims = claims.filter((c) => c.status === "pending").length
    const processedClaims = claims.filter((c) => c.status === "processed").length
    const rejectedClaims = claims.filter((c) => c.status === "rejected").length
    const failedClaims = claims.filter((c) => c.status === "failed").length

    const tokensDistributed = claims
      .filter((c) => c.status === "processed")
      .reduce((sum, claim) => sum + (claim.tokensRequested || 0), 0)

    return {
      totalClaims: claims.length,
      pendingClaims,
      processedClaims,
      rejectedClaims,
      failedClaims,
      totalTokensAllocated: config.totalTokensAllocated,
      tokensDistributed,
      tokensRemaining: config.totalTokensAllocated - tokensDistributed,
    }
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error)
    return {
      totalClaims: 0,
      pendingClaims: 0,
      processedClaims: 0,
      rejectedClaims: 0,
      failedClaims: 0,
      totalTokensAllocated: 1000000,
      tokensDistributed: 0,
      tokensRemaining: 1000000,
    }
  }
}

export function updateClaim(claimId: string, updates: Partial<UserClaim>): boolean {
  try {
    if (typeof window !== "undefined") {
      const claims = getAllClaims()
      const claimIndex = claims.findIndex((claim) => claim.id === claimId)

      if (claimIndex === -1) {
        return false
      }

      claims[claimIndex] = { ...claims[claimIndex], ...updates }
      localStorage.setItem("user-claims", JSON.stringify(claims))
      return true
    }
    return false
  } catch (error) {
    console.error("Erro ao atualizar reivindicação:", error)
    return false
  }
}

export function updateSystemConfig(config: SystemConfig): boolean {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("system-config", JSON.stringify(config))
      return true
    }
    return false
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error)
    return false
  }
}

export function exportClaimsToCSV(): string {
  try {
    const claims = getAllClaims()

    const headers = [
      "ID",
      "Nome",
      "Carteira",
      "Twitter",
      "Telegram",
      "Tokens",
      "Status",
      "Data Criação",
      "Data Processamento",
    ]

    const csvRows = [
      headers.join(","),
      ...claims.map((claim) =>
        [
          claim.id,
          claim.name || "",
          claim.walletAddress,
          claim.twitterUsername || "",
          claim.telegramId || "",
          claim.tokensRequested,
          claim.status,
          claim.createdAt,
          claim.processedAt || "",
        ].join(","),
      ),
    ]

    return csvRows.join("\n")
  } catch (error) {
    console.error("Erro ao exportar CSV:", error)
    return ""
  }
}

export function checkAdminAuthentication(): boolean {
  try {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin-session")
      if (!session) return false

      const sessionData = JSON.parse(session)
      const expiresAt = new Date(sessionData.expiresAt).getTime()

      if (expiresAt < Date.now()) {
        localStorage.removeItem("admin-session")
        return false
      }

      return true
    }
    return false
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error)
    return false
  }
}

export function authenticateAdmin(username: string, password: string): boolean {
  try {
    const ADMIN_USERNAME = "webytebr"
    const ADMIN_PASSWORD = "99110990Webytebr@"

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      if (typeof window !== "undefined") {
        const sessionData = {
          username: username,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }

        localStorage.setItem("admin-session", JSON.stringify(sessionData))
        return true
      }
    }

    return false
  } catch (error) {
    console.error("Erro ao autenticar:", error)
    return false
  }
}

export function logoutAdmin(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin-session")
    }
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
  }
}

export function getClaimStatus(walletAddress: string): string | null {
  try {
    const claims = getAllClaims()
    const claim = claims.find((c) => c.walletAddress.toLowerCase() === walletAddress.toLowerCase())
    return claim ? claim.status : null
  } catch (error) {
    console.error("Erro ao obter status da reivindicação:", error)
    return null
  }
}

export function getClaimByWalletAddress(walletAddress: string): UserClaim | null {
  try {
    const claims = getAllClaims()
    return claims.find((c) => c.walletAddress.toLowerCase() === walletAddress.toLowerCase()) || null
  } catch (error) {
    console.error("Erro ao obter reivindicação:", error)
    return null
  }
}

export function initializeStorage(): void {
  try {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("user-claims")) {
        localStorage.setItem("user-claims", JSON.stringify([]))
      }

      if (!localStorage.getItem("system-config")) {
        const defaultConfig = {
          airdropEnabled: true,
          totalTokensAllocated: 1000000,
          tokensPerClaim: 1000,
          claimDeadline: "",
          requireTwitter: true,
          requireTelegram: true,
        }
        localStorage.setItem("system-config", JSON.stringify(defaultConfig))
      }

      console.log("Storage initialized successfully")
    }
  } catch (error) {
    console.error("Error initializing storage:", error)
  }
}
