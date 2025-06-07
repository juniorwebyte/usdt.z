"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText, Globe, Shield, Zap, Users, TrendingUp, Target, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-black to-green-900/10" />
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full bg-gradient-to-br from-teal-500/5 via-transparent to-green-500/5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="py-8 border-b border-teal-800/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowLeft className="h-6 w-6 text-teal-400" />
                  <span className="text-teal-400 font-medium">Voltar ao Início</span>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-teal-600 text-teal-400 hover:bg-teal-900/20">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section className="py-16 text-center" {...fadeInUp}>
          <div className="container mx-auto px-4">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-400/30 rounded-full text-teal-300 text-sm font-medium backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FileText className="h-4 w-4" />
              Whitepaper Oficial
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-black mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400">
                Tether USD Bridged ZED20
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Uma stablecoin revolucionária que combina a estabilidade do Tether USD com a inovação da rede ZED20,
              oferecendo transações mais rápidas, taxas reduzidas e máxima segurança.
            </motion.p>

            <motion.div
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Versão 1.0 • Dezembro 2024 • Equipe USDT.z
            </motion.div>
          </div>
        </motion.section>

        {/* Table of Contents */}
        <motion.section
          className="py-12 bg-gradient-to-r from-teal-900/10 to-green-900/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-teal-400 mb-8 text-center">Índice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                "1. Resumo Executivo",
                "2. Introdução",
                "3. Problema e Solução",
                "4. Tecnologia ZED20",
                "5. Tokenomics",
                "6. Roadmap",
                "7. Equipe",
                "8. Riscos e Considerações",
                "9. Conclusão",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-teal-900/20 border border-teal-800/30 rounded-lg hover:bg-teal-900/30 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-16 space-y-16">
          {/* 1. Resumo Executivo */}
          <motion.section id="resumo-executivo" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              Resumo Executivo
            </h2>
            <div className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                O <strong className="text-teal-400">Tether USD Bridged ZED20 (USDT.z)</strong> representa uma evolução
                natural das stablecoins, combinando a confiabilidade e estabilidade do Tether USD com as vantagens
                tecnológicas da rede ZED20.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Nossa missão é democratizar o acesso a uma stablecoin verdadeiramente eficiente, oferecendo:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Estabilidade Garantida", desc: "Lastro 1:1 com USD" },
                  { icon: Zap, title: "Transações Rápidas", desc: "Confirmação em segundos" },
                  { icon: TrendingUp, title: "Taxas Reduzidas", desc: "Custos mínimos de transação" },
                  { icon: Globe, title: "Acesso Global", desc: "Disponível mundialmente" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-teal-900/10 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-300 mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 2. Introdução */}
          <motion.section id="introducao" {...fadeInLeft}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              Introdução
            </h2>
            <div className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                O mercado de criptomoedas tem experimentado um crescimento exponencial, mas ainda enfrenta desafios
                significativos relacionados à volatilidade e usabilidade. As stablecoins emergiram como uma solução
                crucial, oferecendo estabilidade de preço enquanto mantêm os benefícios da tecnologia blockchain.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                O Tether USD (USDT) estabeleceu-se como a stablecoin líder mundial, mas limitações de rede têm
                restringido seu potencial. O USDT.z resolve essas limitações através da implementação na rede ZED20, uma
                blockchain de nova geração projetada para alta performance e baixo custo.
              </p>
              <div className="bg-teal-900/20 border-l-4 border-teal-400 p-6 rounded-r-lg">
                <h4 className="text-teal-300 font-semibold mb-2">Visão do Projeto</h4>
                <p className="text-gray-300">
                  Criar a stablecoin mais eficiente e acessível do mercado, mantendo a confiabilidade do USDT enquanto
                  oferece velocidade e economia da rede ZED20.
                </p>
              </div>
            </div>
          </motion.section>

          {/* 3. Problema e Solução */}
          <motion.section id="problema-solucao" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                3
              </div>
              Problema e Solução
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Problemas */}
              <motion.div
                className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-xl border border-red-800/30 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-bold text-red-400 mb-6">Problemas Atuais</h3>
                <div className="space-y-4">
                  {[
                    "Taxas de transação elevadas em redes congestionadas",
                    "Tempos de confirmação lentos durante picos de uso",
                    "Limitações de escalabilidade das redes tradicionais",
                    "Complexidade para usuários iniciantes",
                    "Falta de interoperabilidade entre diferentes blockchains",
                  ].map((problem, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" />
                      <p className="text-gray-300">{problem}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Soluções */}
              <motion.div
                className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-bold text-teal-400 mb-6">Nossa Solução</h3>
                <div className="space-y-4">
                  {[
                    "Taxas de transação ultra-baixas na rede ZED20",
                    "Confirmações instantâneas em menos de 3 segundos",
                    "Escalabilidade ilimitada com arquitetura moderna",
                    "Interface intuitiva e experiência simplificada",
                    "Bridge nativo para múltiplas blockchains",
                  ].map((solution, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{solution}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* 4. Tecnologia ZED20 */}
          <motion.section id="tecnologia" {...fadeInLeft}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                4
              </div>
              Tecnologia ZED20
            </h2>
            <div className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                A rede ZED20 representa uma nova geração de tecnologia blockchain, projetada especificamente para
                superar as limitações das redes tradicionais.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Consenso Híbrido",
                    description: "Combinação de Proof of Stake e Proof of Authority para máxima eficiência",
                    metric: "99.9% Uptime",
                  },
                  {
                    title: "Sharding Dinâmico",
                    description: "Divisão inteligente da rede para processamento paralelo",
                    metric: "100,000+ TPS",
                  },
                  {
                    title: "Smart Contracts 2.0",
                    description: "Contratos inteligentes otimizados com execução instantânea",
                    metric: "<0.01s Execução",
                  },
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-teal-900/10 rounded-lg border border-teal-800/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(45, 212, 191, 0.5)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-teal-300 font-semibold mb-3">{tech.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{tech.description}</p>
                    <div className="text-2xl font-bold text-teal-400">{tech.metric}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-teal-900/20 border-l-4 border-teal-400 p-6 rounded-r-lg">
                <h4 className="text-teal-300 font-semibold mb-2">Vantagens Técnicas</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Finalidade instantânea de transações</li>
                  <li>• Resistência a ataques MEV (Maximal Extractable Value)</li>
                  <li>• Compatibilidade com EVM (Ethereum Virtual Machine)</li>
                  <li>• Governança descentralizada integrada</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* 5. Tokenomics */}
          <motion.section id="tokenomics" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                5
              </div>
              Tokenomics
            </h2>
            <div className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distribuição */}
                <div>
                  <h3 className="text-2xl font-bold text-teal-300 mb-6">Distribuição de Tokens</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Venda Pública e Airdrop", percentage: 40, color: "bg-teal-500" },
                      { label: "Recompensas e Incentivos", percentage: 20, color: "bg-green-500" },
                      { label: "Reserva para Desenvolvimento", percentage: 20, color: "bg-blue-500" },
                      { label: "Parcerias e Marketing", percentage: 10, color: "bg-purple-500" },
                      { label: "Equipe e Operações", percentage: 10, color: "bg-orange-500" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-teal-400 font-medium">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <motion.div
                            className={`${item.color} h-3 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Detalhes */}
                <div>
                  <h3 className="text-2xl font-bold text-teal-300 mb-6">Detalhes do Token</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-teal-900/10 rounded-lg">
                      <h4 className="text-teal-300 font-semibold mb-2">Fornecimento Total</h4>
                      <p className="text-3xl font-bold text-white">1.000.000.000</p>
                      <p className="text-gray-400">USDT.z tokens</p>
                    </div>

                    <div className="p-4 bg-teal-900/10 rounded-lg">
                      <h4 className="text-teal-300 font-semibold mb-2">Lastro</h4>
                      <p className="text-3xl font-bold text-white">1:1</p>
                      <p className="text-gray-400">com USD reservado</p>
                    </div>

                    <div className="p-4 bg-teal-900/10 rounded-lg">
                      <h4 className="text-teal-300 font-semibold mb-2">Airdrop</h4>
                      <p className="text-3xl font-bold text-white">1.000</p>
                      <p className="text-gray-400">USDT.z por participante</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 6. Roadmap */}
          <motion.section id="roadmap" {...fadeInLeft}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                6
              </div>
              Roadmap
            </h2>
            <div className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm">
              <div className="space-y-8">
                {[
                  {
                    phase: "Q4 2024",
                    title: "Lançamento e Airdrop",
                    status: "Em Andamento",
                    items: [
                      "Lançamento oficial do USDT.z",
                      "Início da campanha de airdrop",
                      "Desenvolvimento da plataforma web",
                      "Auditoria de segurança completa",
                    ],
                  },
                  {
                    phase: "Q1 2025",
                    title: "Expansão e Parcerias",
                    status: "Planejado",
                    items: [
                      "Listagem em exchanges principais",
                      "Parcerias com carteiras digitais",
                      "Integração com DeFi protocols",
                      "Lançamento do bridge multi-chain",
                    ],
                  },
                  {
                    phase: "Q2 2025",
                    title: "Produtos Avançados",
                    status: "Planejado",
                    items: [
                      "Lançamento de staking rewards",
                      "Produtos de yield farming",
                      "API para desenvolvedores",
                      "Mobile app nativo",
                    ],
                  },
                  {
                    phase: "Q3 2025",
                    title: "Governança Descentralizada",
                    status: "Futuro",
                    items: [
                      "Implementação de DAO",
                      "Sistema de votação on-chain",
                      "Programa de grants",
                      "Expansão global",
                    ],
                  },
                ].map((roadmapItem, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-8 border-l-2 border-teal-600/30"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>

                    <div className="pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-teal-400 font-bold">{roadmapItem.phase}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            roadmapItem.status === "Em Andamento"
                              ? "bg-green-600/20 text-green-400"
                              : roadmapItem.status === "Planejado"
                                ? "bg-yellow-600/20 text-yellow-400"
                                : "bg-gray-600/20 text-gray-400"
                          }`}
                        >
                          {roadmapItem.status}
                        </span>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-3">{roadmapItem.title}</h4>
                      <ul className="space-y-2">
                        {roadmapItem.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-gray-300">
                            <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 7. Equipe */}
          <motion.section id="equipe" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                7
              </div>
              Equipe
            </h2>
            <div className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Nossa equipe é composta por especialistas em blockchain, finanças e tecnologia, com experiência
                comprovada em projetos de grande escala.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    role: "Blockchain Development",
                    description: "Especialistas em desenvolvimento de smart contracts e arquitetura blockchain",
                    experience: "10+ anos",
                  },
                  {
                    role: "Financial Engineering",
                    description: "Experts em produtos financeiros e gestão de riscos",
                    experience: "15+ anos",
                  },
                  {
                    role: "Security & Auditing",
                    description: "Profissionais em segurança cibernética e auditoria de código",
                    experience: "12+ anos",
                  },
                  {
                    role: "Product Management",
                    description: "Gestores de produto com foco em experiência do usuário",
                    experience: "8+ anos",
                  },
                  {
                    role: "Marketing & Growth",
                    description: "Especialistas em crescimento e marketing digital",
                    experience: "10+ anos",
                  },
                  {
                    role: "Legal & Compliance",
                    description: "Advogados especializados em regulamentação cripto",
                    experience: "12+ anos",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-teal-900/10 rounded-lg border border-teal-800/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(45, 212, 191, 0.5)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-teal-300 font-semibold mb-2">{member.role}</h4>
                    <p className="text-gray-400 text-sm mb-3">{member.description}</p>
                    <div className="text-teal-400 font-medium">{member.experience}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 8. Riscos e Considerações */}
          <motion.section id="riscos" {...fadeInLeft}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                8
              </div>
              Riscos e Considerações
            </h2>
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-8 rounded-xl border border-orange-800/30 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Como qualquer projeto de criptomoeda, o USDT.z apresenta riscos que devem ser considerados por todos os
                participantes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    category: "Riscos Técnicos",
                    risks: [
                      "Vulnerabilidades em smart contracts",
                      "Falhas na rede ZED20",
                      "Problemas de escalabilidade",
                      "Bugs no código",
                    ],
                  },
                  {
                    category: "Riscos Regulatórios",
                    risks: [
                      "Mudanças na legislação",
                      "Restrições governamentais",
                      "Compliance em diferentes jurisdições",
                      "Políticas de exchanges",
                    ],
                  },
                  {
                    category: "Riscos de Mercado",
                    risks: [
                      "Volatilidade do mercado cripto",
                      "Perda de confiança em stablecoins",
                      "Competição com outros projetos",
                      "Liquidez insuficiente",
                    ],
                  },
                  {
                    category: "Riscos Operacionais",
                    risks: [
                      "Falhas de segurança",
                      "Perda de chaves privadas",
                      "Ataques cibernéticos",
                      "Problemas de governança",
                    ],
                  },
                ].map((riskCategory, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-orange-900/10 rounded-lg border border-orange-800/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-orange-400 font-semibold mb-4">{riskCategory.category}</h4>
                    <ul className="space-y-2">
                      {riskCategory.risks.map((risk, riskIndex) => (
                        <li key={riskIndex} className="flex items-start gap-2 text-gray-300">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-orange-900/20 border border-orange-400 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">⚠️ Aviso Importante</h4>
                <p className="text-gray-300">
                  Este whitepaper não constitui aconselhamento financeiro. Todos os investidores devem realizar sua
                  própria pesquisa e consultar profissionais qualificados antes de tomar decisões de investimento.
                </p>
              </div>
            </div>
          </motion.section>

          {/* 9. Conclusão */}
          <motion.section id="conclusao" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                9
              </div>
              Conclusão
            </h2>
            <div className="bg-gradient-to-br from-teal-900/20 to-green-900/20 p-8 rounded-xl border border-teal-800/30 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                O <strong className="text-teal-400">Tether USD Bridged ZED20</strong> representa um marco significativo
                na evolução das stablecoins, combinando a confiabilidade estabelecida do USDT com as inovações
                tecnológicas da rede ZED20.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Nossa abordagem focada em velocidade, baixo custo e facilidade de uso posiciona o USDT.z como a próxima
                geração de stablecoins, adequada tanto para usuários individuais quanto para aplicações empresariais.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Inovação Tecnológica",
                    description: "Aproveitando o melhor da rede ZED20 para máxima eficiência",
                  },
                  {
                    title: "Estabilidade Comprovada",
                    description: "Mantendo o lastro 1:1 com USD que tornou o USDT confiável",
                  },
                  {
                    title: "Futuro Sustentável",
                    description: "Construindo uma base sólida para crescimento a longo prazo",
                  },
                ].map((conclusion, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-teal-900/10 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-teal-300 font-semibold mb-2">{conclusion.title}</h4>
                    <p className="text-gray-400 text-sm">{conclusion.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-xl text-teal-300 font-semibold mb-4">Junte-se a nós nesta jornada revolucionária</p>
                <p className="text-gray-300 mb-8">O futuro das stablecoins começa agora com o USDT.z</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/claim">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8">
                        Participar do Airdrop
                      </Button>
                    </motion.div>
                  </Link>
                  <motion.a
                    href="https://presale.usdtbridged.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-teal-600 text-teal-400 hover:bg-teal-900/20 px-8"
                    >
                      Adquirir USDT.z
                    </Button>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <motion.footer
          className="py-8 border-t border-teal-800/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <p className="text-gray-400 mb-4">© 2024 Tether USD Bridged ZED20. Todos os direitos reservados.</p>
            <p className="text-sm text-gray-500">
              Este documento é apenas para fins informativos e não constitui uma oferta de investimento.
            </p>
          </div>
        </motion.footer>
      </div>
    </main>
  )
}
