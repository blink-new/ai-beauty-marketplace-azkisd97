import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Star, MapPin, Clock, Verified, Heart, Share2, Calendar, Phone, Mail, Copy, Link } from 'lucide-react'
import type { Professional, Service, Review } from '@/types'

interface ProfessionalProfilePageProps {
  professionalId: string
  onBookService: (serviceId: string) => void
  onBack: () => void
}

// Mock data
const mockProfessional: Professional = {
  id: 'prof_1',
  userId: 'user1',
  businessName: 'Glamour Studio by Sarah',
  description: 'Specializing in bridal makeup and special occasion styling with 8+ years of experience. I create stunning looks that enhance your natural beauty. My passion is helping women feel confident and beautiful on their most important days.',
  location: 'Downtown, NYC',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face',
  rating: 4.9,
  reviewCount: 127,
  verified: true,
  specialties: ['Bridal Makeup', 'Special Events', 'Airbrush', 'Contouring', 'Color Matching', 'Lash Application'],
  priceRange: '$80-150',
  availability: true,
  createdAt: '2024-01-15'
}

const mockServices: Service[] = [
  {
    id: 'service_1',
    professionalId: 'prof_1',
    name: 'Bridal Makeup Package',
    description: 'Complete bridal makeup including consultation, trial session, wedding day application, and touch-up kit. Perfect for your special day.',
    duration: 180,
    price: 150,
    category: 'Makeup',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'],
    active: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'service_2',
    professionalId: 'prof_1',
    name: 'Special Event Makeup',
    description: 'Professional makeup for parties, photoshoots, and special occasions. Includes consultation and application.',
    duration: 90,
    price: 80,
    category: 'Makeup',
    images: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop'],
    active: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'service_3',
    professionalId: 'prof_1',
    name: 'Airbrush Makeup',
    description: 'Long-lasting airbrush makeup perfect for photography and special events. Flawless finish guaranteed.',
    duration: 75,
    price: 100,
    category: 'Makeup',
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'],
    active: true,
    createdAt: '2024-01-15'
  }
]

const mockReviews: Review[] = [
  {
    id: 'review_1',
    bookingId: 'booking_1',
    customerId: 'customer_1',
    professionalId: 'prof_1',
    rating: 5,
    comment: 'Amazing work! Sarah made me look absolutely stunning for my wedding. She was professional, punctual, and the makeup lasted all day. Highly recommend!',
    createdAt: '2024-01-10'
  },
  {
    id: 'review_2',
    bookingId: 'booking_2',
    customerId: 'customer_2',
    professionalId: 'prof_1',
    rating: 5,
    comment: 'Professional service and beautiful results. Sarah listened to exactly what I wanted and delivered perfectly. Will definitely book again.',
    createdAt: '2024-01-08'
  },
  {
    id: 'review_3',
    bookingId: 'booking_3',
    customerId: 'customer_3',
    professionalId: 'prof_1',
    rating: 4,
    comment: 'Great experience overall. The makeup looked fantastic and lasted through the entire event. Very happy with the service.',
    createdAt: '2024-01-05'
  }
]

export default function ProfessionalProfilePage({ 
  professionalId, 
  onBookService, 
  onBack 
}: ProfessionalProfilePageProps) {
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProfessional(mockProfessional)
      setServices(mockServices)
      setReviews(mockReviews)
      setLoading(false)
    }, 1000)
  }, [professionalId])

  const handleShareProfile = async () => {
    const profileUrl = `${window.location.origin}/professional/${professionalId}`
    
    try {
      // Try to use the Web Share API if available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: `${professional?.businessName} - BeautyAI`,
          text: `Check out ${professional?.businessName} on BeautyAI - ${professional?.description}`,
          url: profileUrl
        })
        return
      }
      
      // Fallback to clipboard
      await navigator.clipboard.writeText(profileUrl)
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to your clipboard.",
      })
    } catch (error) {
      // Final fallback - create a temporary input element
      const textArea = document.createElement('textarea')
      textArea.value = profileUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to your clipboard.",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          ← Back to Search
        </Button>

        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-48 gradient-primary">
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          <CardContent className="relative -mt-16 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              <Avatar className="w-32 h-32 ring-4 ring-white mx-auto md:mx-0 mb-4 md:mb-0">
                <AvatarImage src={professional.avatar} alt={professional.businessName} />
                <AvatarFallback className="text-2xl font-bold">
                  {professional.businessName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{professional.businessName}</h1>
                  {professional.verified && (
                    <Verified className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{professional.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{professional.rating}</span>
                    <span>({professional.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 max-w-2xl">{professional.description}</p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {professional.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 md:items-end">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShareProfile}
                    title="Share profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <Badge 
                  variant={professional.availability ? 'default' : 'secondary'}
                  className={professional.availability ? 'bg-green-100 text-green-800' : ''}
                >
                  {professional.availability ? 'Available Today' : 'Busy'}
                </Badge>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500">Starting from</div>
                  <div className="text-xl font-bold text-primary">{professional.priceRange}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={service.images[0]} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/90 text-gray-900">
                        {service.duration} min
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-primary">
                        ${service.price}
                      </div>
                      <Badge variant="secondary">{service.category}</Badge>
                    </div>
                    
                    <Button 
                      className="w-full gradient-primary"
                      onClick={() => onBookService(service.id)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Rating Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {professional.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${
                              i < Math.floor(professional.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <div className="text-gray-600">
                        Based on {professional.reviewCount} reviews
                      </div>
                    </div>
                    
                    {/* Rating breakdown */}
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <span className="text-sm w-3">{rating}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.customerId.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">Customer</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {professional.businessName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{professional.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {professional.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <p className="text-primary font-semibold">{professional.priceRange}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{professional.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Available today</span>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleShareProfile}
                    >
                      <Link className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Share This Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Share this professional's profile with friends and family
                  </p>
                  
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 text-sm text-gray-700 font-mono truncate">
                      {window.location.origin}/professional/{professionalId}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleShareProfile}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Anyone with this link can view {professional.businessName}'s profile and book services
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}