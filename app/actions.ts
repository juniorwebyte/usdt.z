"use server"

import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import { redirect } from "next/navigation"

interface UserTaskData {
  walletAddress: string
  walletType: string
  twitterUsername: string
  telegramId: string
  completedAt: string
}

interface UserClaim {
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

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "webytebr"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "99110990Webytebr@"
const SESSION_COOKIE_NAME = "admin_session"
const SESSION_EXPIRY = 24 * 60 * 60 * 1000

export async function storeWalletAddress(address: string) {
  try {
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return {
        success: false,
        message: "Endereço de carteira inválido",
      }
    }

    console.log(`Novo endereço registrado para AirDrop: ${address}`)

    return {
      success: true,
      message: "Endereço registrado com sucesso para o AirDrop",
    }
  } catch (error) {
    console.error("Erro ao armazenar endereço da carteira:", error)
    return {
      success: false,
      message: "Erro ao processar a solicitação. Tente novamente mais tarde.",
    }
  }
}

export async function storeUserTasks(taskData: UserTaskData) {
  try {
    if (!taskData.walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(taskData.walletAddress)) {
      return {
        success: false,
        message: "Endereço de carteira inválido",
      }
    }

    console.log(`Dados de tarefas registrados para: ${taskData.walletAddress}`)

    return {
      success: true,
      message: "Dados de tarefas registrados com sucesso",
    }
  } catch (error) {
    console.error("Erro ao armazenar dados de tarefas:", error)
    return {
      success: false,
      message: "Erro ao processar a solicitação. Tente novamente mais tarde.",
    }
  }
}

export async function getRegisteredWallets(): Promise<string[]> {
  try {
    // Simular lista de carteiras registradas
    return []
  } catch (error) {
    console.error("Erro ao obter endereços registrados:", error)
    return []
  }
}

export async function authenticateAdmin(username: string, password: string) {
  try {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const sessionToken = uuidv4()

      cookies().set({
        name: SESSION_COOKIE_NAME,
        value: sessionToken,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      return {
        success: true,
        message: "Autenticação bem-sucedida",
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: false,
        message: "Credenciais inválidas",
      }
    }
  } catch (error) {
    console.error("Erro ao autenticar administrador:", error)
    return {
      success: false,
      message: "Erro ao processar a solicitação. Tente novamente mais tarde.",
    }
  }
}

export async function checkAdminSession() {
  try {
    const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value

    if (!sessionToken) {
      return {
        authenticated: false,
        message: "Sessão não encontrada",
      }
    }

    return {
      authenticated: true,
      message: "Sessão válida",
    }
  } catch (error) {
    console.error("Erro ao verificar sessão:", error)
    return {
      authenticated: false,
      message: "Erro ao verificar sessão",
    }
  }
}

export async function logoutAdmin() {
  try {
    cookies().delete(SESSION_COOKIE_NAME)

    return {
      success: true,
      message: "Logout realizado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return {
      success: false,
      message: "Erro ao processar a solicitação. Tente novamente mais tarde.",
    }
  }
}

export async function getUserClaims(): Promise<UserClaim[]> {
  try {
    // Simular lista de reivindicações
    return []
  } catch (error) {
    console.error("Erro ao obter reivindicações:", error)
    return []
  }
}

export async function distributeTokens(userId: string, amount: number) {
  try {
    if (!userId || amount <= 0) {
      return {
        success: false,
        message: "Parâmetros inválidos",
      }
    }

    const sessionCheck = await checkAdminSession()
    if (!sessionCheck.authenticated) {
      return {
        success: false,
        message: "Não autorizado",
      }
    }

    return {
      success: true,
      message: `${amount} tokens distribuídos com sucesso para o usuário`,
    }
  } catch (error) {
    console.error("Erro ao distribuir tokens:", error)
    return {
      success: false,
      message: "Erro ao processar a solicitação. Tente novamente mais tarde.",
    }
  }
}

export async function adminMiddleware() {
  const sessionCheck = await checkAdminSession()

  if (!sessionCheck.authenticated) {
    redirect("/admin/login")
  }
}
