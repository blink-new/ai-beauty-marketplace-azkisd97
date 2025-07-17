import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import HomePage from '@/pages/HomePage'
import ProfessionalProfilePage from '@/pages/ProfessionalProfilePage'
import BookingFlowPage from '@/pages/BookingFlowPage'
import BusinessDashboardPage from '@/pages/BusinessDashboardPage'
import { Toaster } from '@/components/ui/toaster'
import blink from '@/blink/client'
import type { User } from '@/types'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user as User)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Loading BeautyAI...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppContent user={user} />
        <Toaster />
      </div>
    </Router>
  )
}

function AppContent({ user }: { user: User | null }) {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/professional/:professionalId" element={<ProfessionalProfileWrapper />} />
          <Route path="/booking/:serviceId" element={<BookingFlowWrapper />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/dashboard" element={
            user?.role === 'professional' ? (
              <BusinessDashboardPage professionalId={user.id} />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

function ProfessionalProfileWrapper() {
  const { professionalId } = useParams<{ professionalId: string }>()
  const navigate = useNavigate()

  if (!professionalId) {
    return <Navigate to="/" replace />
  }

  const handleBookService = (serviceId: string) => {
    navigate(`/booking/${serviceId}`)
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <ProfessionalProfilePage
      professionalId={professionalId}
      onBookService={handleBookService}
      onBack={handleBack}
    />
  )
}

function BookingFlowWrapper() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()

  if (!serviceId) {
    return <Navigate to="/" replace />
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleBookingComplete = (bookingId: string) => {
    console.log('Booking completed:', bookingId)
    navigate('/')
  }

  return (
    <BookingFlowPage
      serviceId={serviceId}
      onBack={handleBack}
      onBookingComplete={handleBookingComplete}
    />
  )
}

function BookingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Bookings</h2>
        <p className="text-gray-600">Booking management coming soon...</p>
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h2>
        <p className="text-gray-600">Profile management coming soon...</p>
      </div>
    </div>
  )
}

export default App