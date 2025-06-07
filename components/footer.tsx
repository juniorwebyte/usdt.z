"use client"

import { DogIcon, Facebook, Github, Heart, Instagram, Mail, Twitter, Check } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { useState } from "react"

export default function Footer() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copyWalletAddress = async () => {
    const walletAddress = "0x0Fcf41A546b2de64aBDc320703dDD657dF802Eb4"

    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000) // Remove a mensagem após 3 segundos
    } catch (err) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement("textarea")
      textArea.value = walletAddress
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-black/50 to-gray-900/80 border-t border-gray-700/50 backdrop-blur-sm pt-8 md:pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <div className="flex items-center mb-4">
              <DogIcon className="h-5 w-5 md:h-6 md:w-6 text-teal-400 mr-2" />
              <h3 className="text-lg md:text-xl font-bold text-teal-400">Tether USD Bridged ZED20</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm md:text-base">
              Uma criptomoeda estável com propósito, unindo tecnologia blockchain e estabilidade financeira na rede
              ZED20.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/usdtzcaptalize"
                target="_blank"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61577170581305"
                target="_blank"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/usdt.zcapitalize/"
                target="_blank"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="https://github.com/juniorwebyte"
                target="_blank"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-teal-400 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/claim"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Airdrop
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="/verify"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Verificar
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Recursos */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-teal-400 mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/seguranca"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Segurança
                </Link>
              </li>
              <li>
                <Link
                  href="/whitepaper"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link
                  href="/tokenomics"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-teal-400 mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-teal-400 mr-2" />
                <a
                  href="mailto:contato@capitalize.store"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-sm md:text-base"
                >
                  contato@capitalize.store
                </a>
              </li>
              <li className="mt-4">
                <button
                  onClick={copyWalletAddress}
                  disabled={copied}
                  className={`inline-flex items-center px-3 md:px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
                    copied ? "bg-green-600 text-white" : "bg-teal-600 hover:bg-teal-700 text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Endereço Copiado!
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Doar Agora
                    </>
                  )}
                </button>
                {copied && <p className="text-green-400 text-sm mt-2 animate-fade-in">Obrigado por ser gentil! 💚</p>}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Tether USD Bridged ZED20. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/termos-de-servico" className="text-gray-400 hover:text-teal-400 transition-colors">
                Termos de Serviço
              </Link>
              <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-teal-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-teal-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </footer>
  )
}
