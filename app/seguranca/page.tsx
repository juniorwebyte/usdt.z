import type { Metadata } from "next"
import { Shield, Lock, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Segurança | Tether USD Bridged ZED20",
  description: "Informações sobre segurança e proteção para usuários do Tether USD Bridged ZED20",
}

export default function SecurityPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0" />

      <div className="max-w-4xl w-full z-10 mt-20 mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-900/30 rounded-full mb-4">
            <Shield className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-purple-400">Centro de Segurança</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Sua segurança é nossa prioridade. Saiba como proteger seus ativos digitais e navegar com segurança no
            ecossistema Tether USD Bridged ZED20.
          </p>
        </div>

        <Alert className="bg-yellow-900/20 border-yellow-800/30 mb-8">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <AlertTitle className="text-yellow-400">Importante</AlertTitle>
          <AlertDescription className="text-yellow-300">
            Nunca compartilhe sua frase de recuperação, chaves privadas ou senhas com ninguém, incluindo a equipe do
            Street Dog Coin. Nós nunca pediremos essas informações.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-black/40 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Lock className="h-5 w-5" /> Proteja sua Carteira
              </CardTitle>
              <CardDescription>Dicas essenciais para manter sua carteira segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Mantenha sua frase de recuperação offline, em um local seguro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Utilize autenticação de dois fatores (2FA) sempre que possível</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Considere usar uma carteira de hardware para grandes quantias</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Verifique sempre os endereços antes de enviar tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Para USDT, confirme a rede correta (ZED20) antes de transações</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Segurança USDT e Bridge
              </CardTitle>
              <CardDescription>Cuidados específicos para operações com stablecoins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Sempre verifique a rede de destino em operações de bridge</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Confirme o endereço do contrato USDT oficial antes de aprovar</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Aguarde confirmações suficientes em operações de bridge</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Use apenas bridges oficiais e auditados</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Monitore taxas de gas antes de confirmar transações</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-purple-900/10 border border-purple-800/20 rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Como verificar a autenticidade do site</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Para garantir que você está no site oficial do Street Dog Coin, siga estas etapas:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
              <li>
                <strong className="text-purple-300">Verifique o URL:</strong> O endereço oficial é{" "}
                <code className="bg-purple-900/30 px-2 py-0.5 rounded text-purple-200">streetdogcoin.com</code> ou
                subdomínios como{" "}
                <code className="bg-purple-900/30 px-2 py-0.5 rounded text-purple-200">airdrop.streetdogcoin.com</code>
              </li>
              <li>
                <strong className="text-purple-300">Procure o cadeado:</strong> Verifique se há um cadeado na barra de
                endereço do navegador, indicando uma conexão segura (HTTPS)
              </li>
              <li>
                <strong className="text-purple-300">Verifique os certificados:</strong> Clique no cadeado para ver os
                detalhes do certificado de segurança
              </li>
              <li>
                <strong className="text-purple-300">Use marcadores:</strong> Salve o site oficial nos favoritos para
                acessá-lo com segurança no futuro
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-blue-900/10 border border-blue-800/20 rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Segurança Específica para USDT e ZED20</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Com a integração do Tether USD Bridged ZED20, é importante seguir práticas específicas de segurança:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Contratos Oficiais</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>
                    <strong>USDT ZED20:</strong> Sempre verifique o endereço do contrato oficial
                  </li>
                  <li>
                    <strong>Bridge Contract:</strong> Use apenas bridges auditados e verificados
                  </li>
                  <li>
                    <strong>Pool Contracts:</strong> Confirme endereços de pools de liquidez
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Operações de Bridge</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Confirme a rede de origem e destino</li>
                  <li>Verifique taxas de bridge antes de confirmar</li>
                  <li>Aguarde confirmações completas</li>
                  <li>Mantenha registro de hashes de transação</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-purple-800/30" />

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-purple-400">Recursos de Segurança</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://tether.to/en/transparency"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-black/40 border border-purple-800/30 rounded-lg hover:bg-purple-900/10 transition-colors"
            >
              <div className="mr-3 mt-1">
                <ExternalLink className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-purple-300">Transparência Tether</h3>
                <p className="text-sm text-gray-400">Relatórios oficiais de reservas e auditoria do USDT</p>
              </div>
            </a>
            <a
              href="https://ethereum.org/en/security/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-black/40 border border-purple-800/30 rounded-lg hover:bg-purple-900/10 transition-colors"
            >
              <div className="mr-3 mt-1">
                <ExternalLink className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-purple-300">Guia de Segurança Ethereum</h3>
                <p className="text-sm text-gray-400">
                  Práticas recomendadas de segurança para usuários de criptomoedas
                </p>
              </div>
            </a>
            <a
              href="https://support.metamask.io/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-black/40 border border-purple-800/30 rounded-lg hover:bg-purple-900/10 transition-colors"
            >
              <div className="mr-3 mt-1">
                <ExternalLink className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-purple-300">Dicas de Segurança MetaMask</h3>
                <p className="text-sm text-gray-400">Guia oficial de segurança para usuários de MetaMask</p>
              </div>
            </a>
            <a
              href="https://docs.zksync.io/build/developer-reference/bridging-asset"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-black/40 border border-purple-800/30 rounded-lg hover:bg-purple-900/10 transition-colors"
            >
              <div className="mr-3 mt-1">
                <ExternalLink className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-purple-300">Guia de Bridge Seguro</h3>
                <p className="text-sm text-gray-400">Melhores práticas para operações de bridge</p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Se você encontrar um site suspeito ou atividade fraudulenta relacionada ao Street Dog Coin, por favor
            reporte para{" "}
            <a href="mailto:security@streetdogcoin.com" className="text-purple-400 hover:text-purple-300">
              security@streetdogcoin.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
