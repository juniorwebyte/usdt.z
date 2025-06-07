"use client"

import GalaxyAnimation from "@/components/galaxy-animation"
import Navbar from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, Heart, Rocket, Shield, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function TokenomicsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white relative overflow-hidden">
      <GalaxyAnimation />
      <Navbar isWalletConnected={false} />

      <section className="pt-24 pb-12 relative" id="hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
              Tokenomics USDT.z
            </h1>
            <p className="text-xl text-gray-300">
              Entenda a economia, distribuição e utilidade do Tether USD Bridged ZED20 (USDT.z).
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Visão Geral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-8 backdrop-blur-sm mb-12"
              id="overview"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Visão Geral</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  O Tether USD Bridged ZED20 (USDT.z) é um token stablecoin pareado 1:1 com o USDT, operando na
                  blockchain ZED20. Este token oferece todas as vantagens de estabilidade do USDT tradicional, mas com
                  as melhorias de velocidade, baixo custo e eficiência energética da rede ZED20.
                </p>
                <p className="text-gray-300 mt-4">
                  O USDT.z mantém paridade com o dólar americano através de reservas totalmente auditadas e
                  transparentes, proporcionando aos usuários uma ponte segura e eficiente entre o ecossistema
                  tradicional do Tether e a inovadora blockchain ZED20.
                </p>
              </div>
            </motion.div>

            {/* Fornecimento e Taxas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" id="supply-fees">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-8 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-400">Fornecimento de Tokens</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Fornecimento Total:</span>
                    <span className="text-blue-300 font-semibold">Ilimitado (Baseado em Reservas)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Fornecimento Circulante:</span>
                    <span className="text-blue-300 font-semibold">500.000.000 USDT.z</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Tokens Bloqueados:</span>
                    <span className="text-blue-300 font-semibold">N/A (Baseado em Demanda)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Mecanismo de Queima:</span>
                    <span className="text-blue-300 font-semibold">Automático (Resgates)</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-8 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-400">Taxas de Transação</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Taxa Total:</span>
                    <span className="text-blue-300 font-semibold">0.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Fundo de Desenvolvimento:</span>
                    <span className="text-blue-300 font-semibold">0.05%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Manutenção da Rede:</span>
                    <span className="text-blue-300 font-semibold">0.05%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Isenções para Grandes Volumes:</span>
                    <span className="text-blue-300 font-semibold">Disponíveis</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Distribuição de Tokens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
              id="distribution"
            >
              <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center">Distribuição de Tokens</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                        <Shield className="h-8 w-8 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 mb-2">40%</h3>
                      <p className="text-gray-300">Reservas Garantidas</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                        <Coins className="h-8 w-8 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 mb-2">25%</h3>
                      <p className="text-gray-300">Liquidez de Mercado</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                        <Rocket className="h-8 w-8 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 mb-2">20%</h3>
                      <p className="text-gray-300">Desenvolvimento e Operações</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 mb-2">10%</h3>
                      <p className="text-gray-300">Parcerias Estratégicas</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                        <Heart className="h-8 w-8 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 mb-2">5%</h3>
                      <p className="text-gray-300">Fundo de Emergência</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Utilidade do Token */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-8 backdrop-blur-sm mb-12"
              id="utility"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Utilidade do Token</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Stablecoin Pareado</h3>
                  <p className="text-gray-300">
                    O USDT.z mantém paridade 1:1 com o USDT, oferecendo estabilidade de preço e proteção contra
                    volatilidade do mercado de criptomoedas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Transações Rápidas e Baratas</h3>
                  <p className="text-gray-300">
                    Aproveite a velocidade da rede ZED20 com confirmações em segundos e taxas de transação extremamente
                    baixas, ideais para pagamentos e transferências frequentes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">DeFi e Yield Farming</h3>
                  <p className="text-gray-300">
                    Utilize USDT.z em protocolos DeFi da rede ZED20 para yield farming, empréstimos e outras
                    oportunidades de rendimento passivo com a segurança de um stablecoin.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Bridge Bidirecional</h3>
                  <p className="text-gray-300">
                    Converta facilmente entre USDT tradicional e USDT.z através de nossa ponte segura e auditada,
                    mantendo sempre a paridade de valor.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Pagamentos Comerciais</h3>
                  <p className="text-gray-300">
                    Ideal para pagamentos comerciais, e-commerce e transferências internacionais com liquidação
                    instantânea e custos mínimos.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mecanismos de Segurança */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-8 backdrop-blur-sm"
              id="security"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Mecanismos de Segurança</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Reservas Auditadas</h3>
                  <p className="text-gray-300">
                    Todas as reservas USDT que garantem o USDT.z são auditadas mensalmente por empresas de auditoria
                    independentes e os relatórios são publicados publicamente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Bridge Segura</h3>
                  <p className="text-gray-300">
                    Nossa ponte entre USDT e USDT.z utiliza contratos inteligentes auditados e um sistema de validadores
                    múltiplos para garantir a segurança das transferências.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Transparência Total</h3>
                  <p className="text-gray-300">
                    Todas as transações de mint e burn são públicas e verificáveis na blockchain ZED20, garantindo
                    transparência total sobre o fornecimento circulante.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Conformidade Regulatória</h3>
                  <p className="text-gray-300">
                    O USDT.z opera em total conformidade com as regulamentações financeiras aplicáveis, incluindo
                    políticas KYC/AML para grandes transações.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
