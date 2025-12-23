'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Truck } from 'lucide-react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">تم استلام طلبك بنجاح!</h1>
          <p className="text-gray-600 mb-6">رقم الطلب: #{orderId || '12345'}</p>
          <div className="space-y-4 mb-8 text-right">
            <div className="flex items-center gap-3">
              <Package className="text-medical-blue" />
              <span>جاري تجهيز طلبك</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="text-medical-blue" />
              <span>سيتم التوصيل خلال 2-3 أيام عمل</span>
            </div>
          </div>
          <Link 
            href="/"
            className="block w-full bg-medical-blue text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            العودة للرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}