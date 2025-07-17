export interface User {
  id: string
  email: string
  displayName?: string
  role: 'customer' | 'professional'
  avatar?: string
  createdAt: string
}

export interface Professional {
  id: string
  userId: string
  businessName: string
  description: string
  location: string
  avatar?: string
  rating: number
  reviewCount: number
  verified: boolean
  specialties: string[]
  priceRange: string
  availability: boolean
  createdAt: string
}

export interface Service {
  id: string
  professionalId: string
  name: string
  description: string
  duration: number // in minutes
  price: number
  category: string
  images: string[]
  active: boolean
  createdAt: string
}

export interface Booking {
  id: string
  customerId: string
  professionalId: string
  serviceId: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  totalAmount: number
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentIntentId?: string
  createdAt: string
}

export interface Review {
  id: string
  bookingId: string
  customerId: string
  professionalId: string
  rating: number
  comment: string
  createdAt: string
}

export interface Analytics {
  professionalId: string
  date: string
  revenue: number
  bookings: number
  newCustomers: number
  avgRating: number
}