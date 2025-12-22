'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { ShoppingCart, User, Menu, X, LogOut, Settings } from 'lucide-react'

export function Header() {
  const { user, signOut } = useAuth()
  const { getItemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsUserMenuOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">م</span>
            </div>
            <span className="text-xl font-bold text-medical-blue">الطبي</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-medical-blue transition-colors">
              الرئيسية
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-medical-blue transition-colors">
              المنتجات
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-medical-blue transition-colors">
              عن المتجر
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-medical-blue transition-colors">
              اتصل بنا
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-medical-blue transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-medical-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-medical-blue transition-colors"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden sm:block text-sm">{user.full_name || user.email}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 inline mr-2" />
                      الملف الشخصي
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      طلباتي
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        لوحة الإدارة
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-medical-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="bg-medical-blue text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-medical-blue transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-medical-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-medical-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                المنتجات
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-medical-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                عن المتجر
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-medical-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}