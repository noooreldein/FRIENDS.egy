'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { user } = useAuth()
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    try {
      await updateQuantity(productId, newQuantity)
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const handleClearCart = async () => {
    if (confirm('هل أنت متأكد من إفراغ السلة؟')) {
      try {
        await clearCart()
      } catch (error) {
        console.error('Error clearing cart:', error)
      }
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">يرجى تسجيل الدخول</h2>
          <p className="text-gray-600 mb-6">يجب عليك تسجيل الدخول لرؤية سلة التسوق</p>
          <Link
            href="/login"
            className="bg-medical-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">سلة التسوق فارغة</h2>
          <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <Link
            href="/"
            className="bg-medical-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            تصفح المنتجات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">سلة التسوق</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            إفراغ السلة
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 relative bg-gray-100 rounded-md overflow-hidden">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-xs">لا صورة</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.product.price} ج.م</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 border border-gray-300 rounded-md min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                        disabled={item.quantity >= item.product.stock_quantity}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {(item.product.price * item.quantity).toFixed(2)} ج.م
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.product_id)}
                        className="text-red-600 hover:text-red-800 mt-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">ملخص الطلب</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد المنتجات:</span>
                  <span className="font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span className="font-medium">{getTotal().toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن:</span>
                  <span className="font-medium">مجاني</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>المجموع الكلي:</span>
                    <span className="text-medical-blue">{getTotal().toFixed(2)} ج.م</span>
                  </div>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full bg-medical-blue text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block font-medium"
              >
                متابعة الدفع
              </Link>
              <Link
                href="/"
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors text-center block"
              >
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}