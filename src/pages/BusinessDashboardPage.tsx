import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users, 
  Star, 
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import type { Analytics, Booking, Service, Review } from '@/types'

interface BusinessDashboardPageProps {
  professionalId: string
}

// Mock data
const mockAnalytics: Analytics[] = [
  { professionalId: 'prof_1', date: '2024-01-15', revenue: 450, bookings: 3, newCustomers: 2, avgRating: 4.8 },
  { professionalId: 'prof_1', date: '2024-01-14', revenue: 320, bookings: 2, newCustomers: 1, avgRating: 4.9 },
  { professionalId: 'prof_1', date: '2024-01-13', revenue: 680, bookings: 4, newCustomers: 3, avgRating: 4.7 },
  { professionalId: 'prof_1', date: '2024-01-12', revenue: 230, bookings: 1, newCustomers: 1, avgRating: 5.0 },
  { professionalId: 'prof_1', date: '2024-01-11', revenue: 560, bookings: 3, newCustomers: 2, avgRating: 4.8 },
  { professionalId: 'prof_1', date: '2024-01-10', revenue: 380, bookings: 2, newCustomers: 1, avgRating: 4.9 },
  { professionalId: 'prof_1', date: '2024-01-09', revenue: 720, bookings: 4, newCustomers: 4, avgRating: 4.6 }
]

const mockBookings: Booking[] = [
  {
    id: 'booking_1',
    customerId: 'customer_1',
    professionalId: 'prof_1',
    serviceId: 'service_1',
    date: '2024-01-20',
    time: '10:00 AM',
    status: 'confirmed',
    notes: 'Bridal trial for wedding next month',
    totalAmount: 150,
    createdAt: '2024-01-15'
  },
  {
    id: 'booking_2',
    customerId: 'customer_2',
    professionalId: 'prof_1',
    serviceId: 'service_2',
    date: '2024-01-18',
    time: '2:00 PM',
    status: 'pending',
    notes: 'Special event makeup for gala',
    totalAmount: 80,
    createdAt: '2024-01-15'
  },
  {
    id: 'booking_3',
    customerId: 'customer_3',
    professionalId: 'prof_1',
    serviceId: 'service_1',
    date: '2024-01-16',
    time: '11:00 AM',
    status: 'completed',
    notes: '',
    totalAmount: 150,
    createdAt: '2024-01-14'
  }
]

const mockServices: Service[] = [
  {
    id: 'service_1',
    professionalId: 'prof_1',
    name: 'Bridal Makeup Package',
    description: 'Complete bridal makeup including consultation, trial session, wedding day application, and touch-up kit.',
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
    description: 'Professional makeup for parties, photoshoots, and special occasions.',
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
    description: 'Long-lasting airbrush makeup perfect for photography and special events.',
    duration: 75,
    price: 100,
    category: 'Makeup',
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'],
    active: false,
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
    comment: 'Amazing work! Sarah made me look absolutely stunning for my wedding.',
    createdAt: '2024-01-10'
  },
  {
    id: 'review_2',
    bookingId: 'booking_2',
    customerId: 'customer_2',
    professionalId: 'prof_1',
    rating: 5,
    comment: 'Professional service and beautiful results. Will definitely book again.',
    createdAt: '2024-01-08'
  }
]

export default function BusinessDashboardPage({ professionalId }: BusinessDashboardPageProps) {
  const [analytics, setAnalytics] = useState<Analytics[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setAnalytics(mockAnalytics)
      setBookings(mockBookings)
      setServices(mockServices)
      setReviews(mockReviews)
      setLoading(false)
    }, 1000)
  }, [professionalId])

  // Calculate summary stats
  const totalRevenue = analytics.reduce((sum, day) => sum + day.revenue, 0)
  const totalBookings = analytics.reduce((sum, day) => sum + day.bookings, 0)
  const totalCustomers = analytics.reduce((sum, day) => sum + day.newCustomers, 0)
  const avgRating = analytics.length > 0 
    ? analytics.reduce((sum, day) => sum + day.avgRating, 0) / analytics.length 
    : 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
          <p className="text-gray-600">Manage your beauty business and track performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last week
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    +8% from last week
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15% from last week
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Based on {reviews.length} reviews
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Revenue Trend
                  </CardTitle>
                  <div className="flex space-x-2">
                    {(['week', 'month', 'year'] as const).map((range) => (
                      <Button
                        key={range}
                        variant={timeRange === range ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTimeRange(range)}
                      >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {analytics.slice(-7).map((day, index) => (
                      <div key={day.date} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-primary rounded-t-sm"
                          style={{ height: `${(day.revenue / Math.max(...analytics.map(d => d.revenue))) * 200}px` }}
                        />
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-xs font-medium">${day.revenue}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Service Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.filter(s => s.active).map((service) => {
                      const serviceBookings = bookings.filter(b => b.serviceId === service.id).length
                      const percentage = totalBookings > 0 ? (serviceBookings / totalBookings) * 100 : 0
                      
                      return (
                        <div key={service.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{service.name}</span>
                            <span>{serviceBookings} bookings</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const service = services.find(s => s.id === booking.serviceId)
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {booking.customerId.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Customer #{booking.customerId.slice(-4)}</div>
                            <div className="text-sm text-gray-500">{service?.name}</div>
                            <div className="text-sm text-gray-500">
                              {booking.date} at {booking.time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <div className="text-right">
                            <div className="font-medium">${booking.totalAmount}</div>
                            <div className="text-sm text-gray-500">
                              {service?.duration} min
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Manage Services</h3>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={service.images[0]} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={service.active ? 'default' : 'secondary'}>
                        {service.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{service.name}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-primary">
                        ${service.price}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration} min
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.customerId.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">Customer #{review.customerId.slice(-4)}</span>
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}