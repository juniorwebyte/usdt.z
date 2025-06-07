import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-white">Página não encontrada</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-8 space-y-4">
          <Link href="/" passHref>
            <Button variant="default" size="lg" className="w-full">
              🏠 Voltar ao Início
            </Button>
          </Link>
          <Link href="/claim" passHref>
            <Button variant="outline" size="lg" className="w-full">
              🎁 Ir para Reivindicação
            </Button>
          </Link>
        </div>
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Se você acredita que isso é um erro, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  )
}
