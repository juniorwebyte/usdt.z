// Constantes do aplicativo USDT.z
export const TOKEN_CONTRACT_ADDRESS = "0x11DF3eA380AAD59D1c5Dca065Eac645dD0AFA877"
export const RECIPIENT_ADDRESS = "0x0Fcf41A546b2de64aBDc320703dDD657dF802Eb4"
export const FEE_AMOUNT = "0.000012" // BNB
export const TOKENS_PER_CLAIM = 10000 // USDT.z tokens por reivindicação
export const REFERRAL_BONUS = 100 // Tokens de bônus por referral
export const REFERRED_BONUS = 50 // Tokens extras para quem usa referral

// Informações do token
export const TOKEN_INFO = {
  name: "Tether USD Bridged ZED20",
  symbol: "USDT.z",
  decimals: 18,
  address: TOKEN_CONTRACT_ADDRESS,
  network: "BSC", // Binance Smart Chain
  chainId: 56,
  logo: "/images/USDT-1.png",
  explorerUrl: "https://bscscan.com/token/",
}

// URLs das redes sociais
export const SOCIAL_LINKS = {
  twitter: "https://x.com/usdtzcaptalize",
  telegram: "https://t.me/usdtzflash",
  facebook: "https://www.facebook.com/profile.php?id=61577170581305",
  instagram: "https://www.instagram.com/usdt.zcapitalize/",
  github: "https://github.com/juniorwebyte",
}

// Configurações da API CallMeBot
export const WHATSAPP_CONFIG = {
  apiUrl: "https://api.callmebot.com/whatsapp.php",
  adminNumbers: [
    {
      name: "Júnior Alves - Admin",
      number: "5511984801839",
      apiKey: "1782254",
    },
  ],
}

// Configurações do projeto
export const PROJECT_CONFIG = {
  name: "USDT.z Airdrop",
  fullName: "Tether USD Bridged ZED20",
  symbol: "USDT.z",
  description: "Sistema de reivindicação de AirDrop para distribuição de tokens USDT.z - Tether USD Bridged ZED20",
  website: "https://capitalize.store",
  email: "contato@capitalize.store",
  domain: "capitalize.store",
  version: "2.0.0",
}

// Configurações de animação
export const ANIMATION_CONFIG = {
  particles: {
    count: 2000,
    size: { min: 0.1, max: 2.5 },
    speed: { min: 0.05, max: 0.2 },
    color: "#2dd4bf",
  },
  webgl: {
    quality: {
      high: {
        particleCount: 5000,
        shadows: true,
        postProcessing: true,
        antialias: true,
      },
      medium: {
        particleCount: 3000,
        shadows: true,
        postProcessing: false,
        antialias: true,
      },
      low: {
        particleCount: 1000,
        shadows: false,
        postProcessing: false,
        antialias: false,
      },
    },
  },
}

// Configurações de verificação
export const VERIFICATION_CONFIG = {
  minVerificationTime: 5000, // 5 segundos
  maxVerificationTime: 10000, // 10 segundos
  steps: [
    "Verificando carteira",
    "Validando tarefas",
    "Confirmando elegibilidade",
    "Preparando tokens",
    "Finalizando verificação",
  ],
}
