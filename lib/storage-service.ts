// Remove the problematic import
// import {} from "lib/storage-service"

// Add these interfaces at the top
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

export interface ClaimRecord {
  id: string
  walletAddress: string
  txHash: string
  timestamp: string
  amount: string
  currency: string
  twitterUsername: string
  telegramId: string
  tokensAllocated: number
  tokenSymbol: string
  tokenName: string
  status: "pending" | "confirmed" | "failed"
  processed: boolean
  createdAt: string
  updatedAt?: string
  userAgent?: string
  ipAddress?: string
  referralCode?: string
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
    // Updated admin credentials
    const ADMIN_USERNAME = "webytebr"
    const ADMIN_PASSWORD = "99110990Webytebr@"

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      if (typeof window !== "undefined") {
        // Create session data
        const sessionData = {
          username: username,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
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
      // Initialize user claims if not exists
      if (!localStorage.getItem("user-claims")) {
        localStorage.setItem("user-claims", JSON.stringify([]))
      }

      // Initialize system config if not exists
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

// Server-side storage service (only for server-side operations)
export class StorageService {
  private dataDir: string
  private claimsFile: string
  private backupDir: string

  constructor() {
    // Only initialize paths on server side
    if (typeof window === "undefined") {
      try {
        const path = require("path")
        this.dataDir = path.join(process.cwd(), "data")
        this.claimsFile = path.join(this.dataDir, "claims.json")
        this.backupDir = path.join(this.dataDir, "backups")
      } catch (error) {
        console.error("Error initializing StorageService:", error)
      }
    }
  }

  async ensureDirectories(): Promise<void> {
    if (typeof window !== "undefined") return

    try {
      const fs = require("fs").promises
      await fs.mkdir(this.dataDir, { recursive: true })
      await fs.mkdir(this.backupDir, { recursive: true })
    } catch (error) {
      console.error("Error ensuring directories:", error)
    }
  }

  async readClaims(): Promise<ClaimRecord[]> {
    if (typeof window !== "undefined") return []

    try {
      const fs = require("fs").promises
      await this.ensureDirectories()
      const fileContent = await fs.readFile(this.claimsFile, "utf-8")
      return JSON.parse(fileContent)
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await this.writeClaims([])
        return []
      }
      throw error
    }
  }

  async writeClaims(claims: ClaimRecord[]): Promise<void> {
    if (typeof window !== "undefined") return

    try {
      const fs = require("fs").promises
      await this.ensureDirectories()
      await fs.writeFile(this.claimsFile, JSON.stringify(claims, null, 2))
    } catch (error) {
      console.error("Error writing claims:", error)
    }
  }

  async addClaim(claimData: Partial<ClaimRecord>): Promise<ClaimRecord> {
    if (typeof window !== "undefined") {
      throw new Error("Server-only function called on client")
    }

    const claims = await this.readClaims()

    const newClaim: ClaimRecord = {
      id: `claim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      processed: false,
      ...(claimData as ClaimRecord),
    }

    const existingIndex = claims.findIndex(
      (claim) => claim.walletAddress.toLowerCase() === newClaim.walletAddress.toLowerCase(),
    )

    if (existingIndex !== -1) {
      claims[existingIndex] = {
        ...claims[existingIndex],
        ...newClaim,
        updatedAt: new Date().toISOString(),
      }
    } else {
      claims.push(newClaim)
    }

    await this.writeClaims(claims)
    await this.createBackup(claims)

    return newClaim
  }

  async findClaimByWallet(walletAddress: string): Promise<ClaimRecord | null> {
    if (typeof window !== "undefined") return null

    const claims = await this.readClaims()
    return claims.find((claim) => claim.walletAddress.toLowerCase() === walletAddress.toLowerCase()) || null
  }

  async updateClaimStatus(claimId: string, status: ClaimRecord["status"]): Promise<boolean> {
    if (typeof window !== "undefined") return false

    const claims = await this.readClaims()
    const claimIndex = claims.findIndex((claim) => claim.id === claimId)

    if (claimIndex === -1) {
      return false
    }

    claims[claimIndex].status = status
    claims[claimIndex].updatedAt = new Date().toISOString()

    await this.writeClaims(claims)
    return true
  }

  async getClaimStats(): Promise<{
    total: number
    pending: number
    confirmed: number
    failed: number
    totalTokens: number
  }> {
    if (typeof window !== "undefined") {
      return {
        total: 0,
        pending: 0,
        confirmed: 0,
        failed: 0,
        totalTokens: 0,
      }
    }

    const claims = await this.readClaims()

    return {
      total: claims.length,
      pending: claims.filter((c) => c.status === "pending").length,
      confirmed: claims.filter((c) => c.status === "confirmed").length,
      failed: claims.filter((c) => c.status === "failed").length,
      totalTokens: claims.reduce((sum, claim) => sum + (claim.tokensAllocated || 0), 0),
    }
  }

  async createBackup(claims?: ClaimRecord[]): Promise<void> {
    if (typeof window !== "undefined") return

    try {
      const fs = require("fs").promises
      const path = require("path")

      if (!claims) {
        claims = await this.readClaims()
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      const backupFileName = `claims_backup_${timestamp}.json`
      const backupPath = path.join(this.backupDir, backupFileName)

      await fs.writeFile(backupPath, JSON.stringify(claims, null, 2))
      await this.cleanOldBackups()
    } catch (error) {
      console.error("Error creating backup:", error)
    }
  }

  private async cleanOldBackups(): Promise<void> {
    if (typeof window !== "undefined") return

    try {
      const fs = require("fs").promises
      const path = require("path")

      const files = await fs.readdir(this.backupDir)
      const backupFiles = files
        .filter((file: string) => file.startsWith("claims_backup_") && file.endsWith(".json"))
        .sort()
        .reverse()

      const filesToDelete = backupFiles.slice(10)

      for (const file of filesToDelete) {
        await fs.unlink(path.join(this.backupDir, file))
      }
    } catch (error) {
      console.error("Erro ao limpar backups antigos:", error)
    }
  }

  async exportClaims(format: "json" | "csv" = "json"): Promise<string> {
    if (typeof window !== "undefined") return ""

    const claims = await this.readClaims()

    if (format === "csv") {
      const headers = [
        "ID",
        "Wallet Address",
        "TX Hash",
        "Timestamp",
        "Amount",
        "Currency",
        "Twitter Username",
        "Telegram ID",
        "Tokens Allocated",
        "Status",
        "Created At",
      ]

      const csvRows = [
        headers.join(","),
        ...claims.map((claim) =>
          [
            claim.id,
            claim.walletAddress,
            claim.txHash,
            claim.timestamp,
            claim.amount,
            claim.currency,
            claim.twitterUsername || "",
            claim.telegramId || "",
            claim.tokensAllocated,
            claim.status,
            claim.createdAt,
          ].join(","),
        ),
      ]

      return csvRows.join("\n")
    }

    return JSON.stringify(claims, null, 2)
  }
}

// Singleton instance
export const storageService = new StorageService()
export default storageService
