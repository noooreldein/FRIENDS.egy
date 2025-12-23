'use client'

import { Header } from '../components/Header'
import { ProductGrid } from '../components/ProductGrid'
import { Footer } from '../components/Footer'
import { useCart } from '../contexts/CartContext' // ده السطر اللي بيحل المشكلة

export default function Home() {
  // السطر ده وظيفته يخلي الصفحة تتعرف على السلة
  const cart = useCart(); 

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-medical-blue mb-4">
            متجر المنتجات الطبية
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من المنتجات الطبية عالية الجودة مع خدمة توصيل موثوقة وأسعار تنافسية
          </p>
        </section>
        
        {/* شبكة المنتجات */}
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}