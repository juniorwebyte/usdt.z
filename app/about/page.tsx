"use client"

import GalaxyAnimation from "@/components/galaxy-animation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
  Rocket,
  Target,
  Coins,
  Users,
  Github,
  Twitter,
  Linkedin,
  CheckCircle,
  Award,
  BookOpen,
  Shield,
  Zap,
  Globe,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import PerformanceToggle from "@/components/performance-toggle"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white relative overflow-hidden">
      <GalaxyAnimation />
      <Navbar isWalletConnected={false} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-green-500 to-teal-600">
              Sobre o Tether USD Bridged ZED20
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              A stablecoin mais confiável do mundo, agora bridgeada para a rede ZED20, oferecendo estabilidade,
              segurança e transações ultrarrápidas com taxas reduzidas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Missão e Visão Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 border-teal-800/30 p-6 rounded-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-400">Nossa Missão</h2>
              <p className="text-gray-300">
                Democratizar o acesso a uma stablecoin estável e confiável através da tecnologia blockchain ZED20,
                oferecendo transações rápidas, seguras e com taxas reduzidas para usuários em todo o mundo. Queremos ser
                a ponte entre a estabilidade do dólar americano e a inovação da blockchain.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                  <p className="text-gray-300">Manter paridade 1:1 com o dólar americano</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                  <p className="text-gray-300">Oferecer transações ultrarrápidas na rede ZED20</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                  <p className="text-gray-300">Garantir máxima segurança e transparência</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 border-teal-800/30 p-6 rounded-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-400">Nossa Visão</h2>
              <p className="text-gray-300">
                Ser a principal stablecoin da rede ZED20, estabelecendo um novo padrão para estabilidade e eficiência no
                ecossistema cripto. Queremos criar um mundo onde as transações digitais sejam tão confiáveis quanto o
                dinheiro tradicional, mas com a velocidade e inovação da blockchain.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                  <p className="text-gray-300">Liderar a adoção de stablecoins na rede ZED20</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                  <p className="text-gray-300">Expandir o acesso global a serviços financeiros estáveis</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                  <p className="text-gray-300">Inspirar inovação no setor de pagamentos digitais</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nossa História Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-teal-400">Nossa História</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  O Tether USD Bridged ZED20 nasceu da necessidade de trazer a estabilidade e confiabilidade do USDT
                  para a inovadora rede ZED20. Reconhecendo o potencial da blockchain ZED20 para transações mais rápidas
                  e econômicas, nossa equipe trabalhou incansavelmente para criar uma ponte segura e eficiente.
                </p>
                <p>
                  Nossa Jornada: 2023 – Análise técnica da rede ZED20 e planejamento do bridge. 2024 – Desenvolvimento
                  do protocolo de bridge e testes de segurança. 2025 – Lançamento oficial do USDT.z e programa de
                  airdrop!
                </p>
                <p>
                  Por que o USDT.z é revolucionário? Estabilidade comprovada: Mantém a paridade 1:1 com o USD.
                  Velocidade superior: Transações em segundos na rede ZED20. Taxas reduzidas: Custos mínimos para
                  transferências. Segurança máxima: Auditado e verificado por especialistas em blockchain.
                </p>
                <p>
                  Junte-se a nós! Faça parte da revolução das stablecoins e experimente a próxima geração de pagamentos
                  digitais! USDT.z – A Stablecoin do Futuro!
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-teal-900/20 border border-teal-800/30 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-teal-300">Lançamento</h4>
                  <p className="text-sm text-gray-400 mt-1">2025</p>
                </div>

                <div className="bg-teal-900/20 border border-teal-800/30 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-teal-300">Comunidade</h4>
                  <p className="text-sm text-gray-400 mt-1">50.000+ usuários</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-96 bg-gradient-to-br from-teal-400/20 to-green-600/20 border border-teal-500/30 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-teal-400 mb-4">USDT.z</div>
                    <p className="text-teal-300 text-xl">Bridged to ZED20</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">Nossa Jornada</h3>
                    <p className="text-gray-300 text-sm">Da estabilidade tradicional à inovação blockchain</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-teal-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nossos Valores Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-teal-400">Nossos Valores</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Os princípios que guiam todas as nossas decisões e ações</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-6 rounded-xl border border-teal-800/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-300">Estabilidade</h3>
              <p className="text-gray-400">
                Mantemos a paridade 1:1 com o dólar americano, garantindo que cada USDT.z seja sempre respaldado por
                reservas reais e auditadas regularmente.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-6 rounded-xl border border-teal-800/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-300">Transparência</h3>
              <p className="text-gray-400">
                Mantemos total transparência em nossas operações, reservas e processos de bridge. Todas as transações
                são verificáveis na blockchain ZED20.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-6 rounded-xl border border-teal-800/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-300">Inovação</h3>
              <p className="text-gray-400">
                Utilizamos a tecnologia mais avançada da rede ZED20 para oferecer transações ultrarrápidas e taxas
                reduzidas, sem comprometer a segurança.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-teal-400"
          >
            Roadmap
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: -5 }}
                  className="bg-gradient-to-br from-teal-900/20 to-green-900/20 border border-teal-800/30 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-green-400">2023 - Planejamento</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-teal-400" />
                      Análise técnica da rede ZED20
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-teal-400" />
                      Desenvolvimento do conceito de bridge
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-400" />
                      Formação da equipe técnica
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: -5 }}
                  className="bg-gradient-to-br from-teal-900/20 to-green-900/20 border border-teal-800/30 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-green-400">2024 - Desenvolvimento</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-teal-400" />
                      Desenvolvimento do protocolo de bridge
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-teal-400" />
                      Auditorias de segurança
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-teal-400" />
                      Testes em testnet
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="bg-gradient-to-br from-teal-900/20 to-green-900/20 border border-teal-800/30 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-green-400">Q1 2025 - Lançamento</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-teal-400" />
                      Lançamento oficial do USDT.z
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-400" />
                      Programa de airdrop
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-teal-400" />
                      Listagem em exchanges
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="bg-gradient-to-br from-teal-900/20 to-green-900/20 border border-teal-800/30 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-green-400">S2 2025 - Expansão</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-teal-400" />
                      Parcerias estratégicas
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-teal-400" />
                      Otimizações de performance
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-400" />
                      Expansão da comunidade global
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Apenas Júnior Alves */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-teal-400"
          >
            Nossa Equipe
          </motion.h2>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(45, 212, 191, 0.3)" }}
              className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-6 rounded-xl border border-teal-800/30 backdrop-blur-sm max-w-md"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-teal-600/30">
                  <Image
                    src="/junior.jpg" // coloque sua foto na pasta public e ajuste o nome aqui
                    alt="Foto de Júnior Alves"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-bold text-teal-400">Júnior Alves</h3>
                <div className="text-green-400 mb-4 text-center">
                  Arquiteto Blockchain e Especialista em Tecnologia Full Stack
                </div>
                <p className="text-gray-300 text-center mb-6">
                  Profissional sênior em desenvolvimento full stack e blockchain, é o arquiteto por trás da
                  infraestrutura tecnológica do Tether USD Bridged ZED20. Com vasta experiência em criptoativos,
                  contratos inteligentes e sistemas descentralizados, ele lidera a inovação do projeto, garantindo
                  segurança, escalabilidade e estabilidade. Sua paixão pela tecnologia blockchain impulsiona a criação
                  de um ecossistema robusto, conectando estabilidade financeira e inovação tecnológica.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="https://x.com/juniorwebyte"
                    target="_blank"
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/j%C3%BAnior-alves-6a625049/"
                    target="_blank"
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://github.com/juniorwebyte"
                    target="_blank"
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parcerias Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-teal-400">Nossas Parcerias</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Trabalhamos com organizações líderes no setor blockchain e DeFi, incluindo parcerias estratégicas com
              exchanges e protocolos de primeira linha.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/30 to-green-900/30 p-6 rounded-xl border border-teal-800/20 flex items-center justify-center h-32"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">ZED20</div>
                <div className="text-sm text-gray-400">Blockchain</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/30 to-green-900/30 p-6 rounded-xl border border-teal-800/20 flex items-center justify-center h-32"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">USDT</div>
                <div className="text-sm text-gray-400">Tether</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/30 to-green-900/30 p-6 rounded-xl border border-teal-800/20 flex items-center justify-center h-32"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">DEX</div>
                <div className="text-sm text-gray-400">Exchanges</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-900/30 to-green-900/30 p-6 rounded-xl border border-teal-800/20 flex items-center justify-center h-32"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">DeFi</div>
                <div className="text-sm text-gray-400">Protocolos</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-gray-400">
              Interessado em se tornar um parceiro?{" "}
              <Link
                href="https://t.me/usdtzflash"
                target="_blank"
                className="text-teal-400 hover:text-teal-300 underline"
              >
                Entre em contato
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 0 30px rgba(45, 212, 191, 0.3)" }}
            className="bg-gradient-to-r from-teal-900/30 to-green-900/30 rounded-2xl p-8 md:p-12 border border-teal-800/30 backdrop-blur-sm"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-teal-300">Faça Parte desta Revolução</h2>
              <p className="text-gray-300 text-lg mb-8">
                Junte-se a nós nesta missão de democratizar o acesso a stablecoins estáveis e eficientes através da
                tecnologia blockchain ZED20.
              </p>
              <Link href="/claim">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8">
                  Participar do Airdrop
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PerformanceToggle />
    </main>
  )
}
