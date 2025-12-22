'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Truck } from 'lucide-react'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      // In a real app, fetch order details from API
      // For now, just show confirmation
      setOrder({ id: orderId })
      setLoading(false)
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تم تأكيد الطلب بنجاح!</h1>
          <p className="text-lg text-gray-600 mb-8">
            شكراً لك على طلبك. سيتم التواصل معك قريباً لتأكيد التفاصيل.
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-medical-blue mr-2" />
              <span className="text-lg font-medium">رقم الطلب: {orderId}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Truck className="h-6 w-6 text-medical-blue mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">قيد المراجعة</h3>
                <p className="text-sm text-gray-600">جاري مراجعة طلبك</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Package className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-400">قيد التحضير</h3>
                <p className="text-sm text-gray-600">سيتم تحضير الطلب قريباً</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Truck className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-400">قيد التوصيل</h3>
                <p className="text-sm text-gray-600">سيتم توصيل الطلب</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              ستتلقى تحديثات حول حالة طلبك عبر البريد الإلكتروني أو الهاتف.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/orders"
                className="bg-medical-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                عرض طلباتي
              </Link>
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
