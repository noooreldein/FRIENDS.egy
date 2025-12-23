'use client'

import { Header } from '../components/Header'
import { ProductGrid } from '../components/ProductGrid'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}