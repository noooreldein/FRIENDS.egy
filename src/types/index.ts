HEAD
export interface User {
  id: string
  email: string
  full_name?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image_url?: string
  category?: string
  stock_quantity: number
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'paid' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: 'whatsapp' | 'cash_on_delivery'
  whatsapp_number?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image_url?: string
  category?: string
  stock_quantity: number
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'paid' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: 'whatsapp' | 'cash_on_delivery'
  whatsapp_number?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}
b242b1431e2f7889bf4859690fb3516cb5900093
