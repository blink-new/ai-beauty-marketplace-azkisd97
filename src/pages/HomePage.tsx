import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchSection from '@/components/home/SearchSection'
import ProfessionalCard from '@/components/home/ProfessionalCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Filter, SlidersHorizontal } from 'lucide-react'
import blink from '@/blink/client'
import type { Professional } from '@/types'

// Mock data for demonstration
const mockProfessionals: Professional[] = [
  {
    id: '1',
    userId: 'user1',
    businessName: 'Glamour Studio by Sarah',
    description: 'Specializing in bridal makeup and special occasion styling with 8+ years of experience. I create stunning looks that enhance your natural beauty.',
    location: 'Downtown, NYC',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    specialties: ['Bridal Makeup', 'Special Events', 'Airbrush', 'Contouring'],
    priceRange: '$80-150',
    availability: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: 'user2',
    businessName: 'Elite Hair Salon',
    description: 'Award-winning hair stylist offering cuts, colors, and treatments. Certified in the latest techniques and premium product lines.',
    location: 'Midtown, NYC',
    avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    verified: true,
    specialties: ['Hair Coloring', 'Balayage', 'Keratin Treatment', 'Styling'],
    priceRange: '$120-200',
    availability: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    userId: 'user3',
    businessName: 'Zen Spa & Wellness',
    description: 'Holistic approach to beauty and wellness. Offering facials, massage therapy, and skincare treatments in a peaceful environment.',
    location: 'Upper East Side, NYC',
    avatar: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    specialties: ['Facial Treatment', 'Massage', 'Skincare', 'Anti-aging'],
    priceRange: '$90-180',
    availability: false,
    createdAt: '2024-01-08'
  },
  {
    id: '4',
    userId: 'user4',
    businessName: 'Nail Art Studio',
    description: 'Creative nail designs and premium manicure services. From classic French tips to intricate nail art, we do it all.',
    location: 'Brooklyn, NYC',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    reviewCount: 203,
    verified: false,
    specialties: ['Nail Art', 'Gel Manicure', 'Pedicure', 'Extensions'],
    priceRange: '$45-85',
    availability: true,
    createdAt: '2024-01-05'
  },
  {
    id: '5',
    userId: 'user5',
    businessName: 'Brow & Lash Boutique',
    description: 'Expert eyebrow shaping and eyelash extensions. Enhancing your natural features with precision and artistry.',
    location: 'Queens, NYC',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 94,
    verified: true,
    specialties: ['Eyebrow Threading', 'Lash Extensions', 'Microblading', 'Tinting'],
    priceRange: '$60-120',
    availability: true,
    createdAt: '2024-01-03'
  },
  {
    id: '6',
    userId: 'user6',
    businessName: 'Men\'s Grooming Lounge',
    description: 'Premium grooming services for the modern gentleman. Haircuts, beard styling, and skincare treatments.',
    location: 'Manhattan, NYC',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 67,
    verified: true,
    specialties: ['Men\'s Haircuts', 'Beard Styling', 'Hot Towel Shave', 'Skincare'],
    priceRange: '$50-100',
    availability: true,
    createdAt: '2024-01-01'
  }
]

export default function HomePage() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProfessionals(mockProfessionals)
      setFilteredProfessionals(mockProfessionals)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSearch = (query: string, location: string, category: string) => {
    setSearchQuery(query)
    
    let filtered = professionals
    
    if (query) {
      filtered = filtered.filter(prof => 
        prof.businessName.toLowerCase().includes(query.toLowerCase()) ||
        prof.description.toLowerCase().includes(query.toLowerCase()) ||
        prof.specialties.some(spec => spec.toLowerCase().includes(query.toLowerCase()))
      )
    }
    
    if (location) {
      filtered = filtered.filter(prof => 
        prof.location.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    if (category && category !== 'All Services') {
      filtered = filtered.filter(prof => 
        prof.specialties.some(spec => spec.toLowerCase().includes(category.toLowerCase()))
      )
    }
    
    setFilteredProfessionals(filtered)
  }

  const handleViewProfile = (professionalId: string) => {
    navigate(`/professional/${professionalId}`)
  }

  const handleBookNow = (professionalId: string) => {
    // For demo, we'll use the first service ID
    navigate(`/booking/service_1`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <SearchSection onSearch={handleSearch} />
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Results for "${searchQuery}"` : 'Featured Professionals'}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredProfessionals.length} professionals found
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4 p-6 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProfessionals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  onViewProfile={handleViewProfile}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or browse all professionals
              </p>
              <Button onClick={() => handleSearch('', '', 'All Services')}>
                Show All Professionals
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}