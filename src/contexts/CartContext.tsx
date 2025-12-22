'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'
import { Product } from '@/types'

interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: Product
}

interface CartContextType {
  items: CartItem[]
  loading: boolean
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setItems([])
    }
  }, [user])

  const fetchCart = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('cart')
        .select(`
          id,
          product_id,
          quantity,
          product:products(*)
        `)
        .eq('user_id', user.id)

      if (error) throw error

      setItems(data || [])
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: string, quantity = 1) => {
    if (!user) {
      // Redirect to login or show message
      return
    }

    try {
      // Check if item already exists
      const existingItem = items.find(item => item.product_id === productId)

      if (existingItem) {
        await updateQuantity(productId, existingItem.quantity + quantity)
      } else {
        const { data, error } = await supabase
          .from('cart')
          .insert([{
            user_id: user.id,
            product_id: productId,
            quantity
          }])
          .select(`
            id,
            product_id,
            quantity,
            product:products(*)
          `)
          .single()

        if (error) throw error

        setItems(prev => [...prev, data])
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return

    if (quantity <= 0) {
      await removeFromCart(productId)
      return
    }

    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (error) throw error

      setItems(prev =>
        prev.map(item =>
          item.product_id === productId
            ? { ...item, quantity }
            : item
        )
      )
    } catch (error) {
      console.error('Error updating cart:', error)
      throw error
    }
  }

  const removeFromCart = async (productId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (error) throw error

      setItems(prev => prev.filter(item => item.product_id !== productId))
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw error
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)

      if (error) throw error

      setItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  }

  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}
