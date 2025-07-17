import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Clock, CreditCard, Calendar as CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Professional, Service } from '@/types'

interface BookingFlowPageProps {
  serviceId: string
  onBack: () => void
  onBookingComplete: (bookingId: string) => void
}

type BookingStep = 'service' | 'datetime' | 'details' | 'payment' | 'confirmation'

// Mock data
const mockService: Service = {
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
}

const mockProfessional: Professional = {
  id: 'prof_1',
  userId: 'user1',
  businessName: 'Glamour Studio by Sarah',
  description: 'Specializing in bridal makeup and special occasion styling',
  location: 'Downtown, NYC',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face',
  rating: 4.9,
  reviewCount: 127,
  verified: true,
  specialties: ['Bridal Makeup', 'Special Events'],
  priceRange: '$80-150',
  availability: true,
  createdAt: '2024-01-15'
}

const availableTimeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function BookingFlowPage({ 
  serviceId, 
  onBack, 
  onBookingComplete 
}: BookingFlowPageProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('service')
  const [service, setService] = useState<Service | null>(null)
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setService(mockService)
      setProfessional(mockProfessional)
      setLoading(false)
    }, 1000)
  }, [serviceId])

  const steps: { key: BookingStep; title: string; description: string }[] = [
    { key: 'service', title: 'Service', description: 'Review service details' },
    { key: 'datetime', title: 'Date & Time', description: 'Choose your appointment' },
    { key: 'details', title: 'Details', description: 'Add special requests' },
    { key: 'payment', title: 'Payment', description: 'Complete your booking' },
    { key: 'confirmation', title: 'Confirmation', description: 'Booking confirmed' }
  ]

  const currentStepIndex = steps.findIndex(step => step.key === currentStep)

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].key)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].key)
    }
  }

  const handlePayment = async () => {
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setCurrentStep('confirmation')
      onBookingComplete('booking_' + Date.now())
    }, 2000)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'service':
        return true
      case 'datetime':
        return selectedDate && selectedTime
      case 'details':
        return true
      case 'payment':
        return true
      default:
        return false
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Loading booking...</p>
        </div>
      </div>
    )
  }

  if (!service || !professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">Complete your booking in a few simple steps</p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStepIndex 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {index < currentStepIndex ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Review Step */}
            {currentStep === 'service' && (
              <Card>
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={service.images[0]} 
                      alt={service.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-3">{service.description}</p>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">{service.category}</Badge>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration} minutes
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${service.price}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={professional.avatar} alt={professional.businessName} />
                      <AvatarFallback>{professional.businessName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{professional.businessName}</h4>
                      <p className="text-sm text-gray-500">{professional.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Date & Time Step */}
            {currentStep === 'datetime' && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Choose Date</h4>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md border"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Available Times</h4>
                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-2">
                          {availableTimeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="justify-center"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Please select a date first</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Details Step */}
            {currentStep === 'details' && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Special requests or notes (optional)
                    </label>
                    <Textarea
                      placeholder="Any specific requirements, allergies, or preferences..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <input 
                          type="text" 
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">ZIP Code</label>
                        <input 
                          type="text" 
                          placeholder="12345"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Confirmation Step */}
            {currentStep === 'confirmation' && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Your appointment has been successfully booked. You'll receive a confirmation email shortly.
                  </p>
                  <div className="space-y-2">
                    <Button className="gradient-primary">View Booking Details</Button>
                    <Button variant="outline" onClick={onBack}>Book Another Service</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={professional.avatar} alt={professional.businessName} />
                    <AvatarFallback>{professional.businessName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{professional.businessName}</div>
                    <div className="text-sm text-gray-500">{professional.location}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium mb-1">{service.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{service.category}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Duration:</span>
                    <span className="text-sm">{service.duration} min</span>
                  </div>
                </div>
                
                {selectedDate && selectedTime && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-500">Date:</span>
                        <span className="text-sm">{selectedDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Time:</span>
                        <span className="text-sm">{selectedTime}</span>
                      </div>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Service</span>
                    <span>${service.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Tax</span>
                    <span>${(service.price * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${(service.price * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                
                {currentStep !== 'confirmation' && (
                  <div className="pt-4 space-y-2">
                    {currentStep !== 'service' && (
                      <Button variant="outline" onClick={handlePrevious} className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    )}
                    
                    {currentStep === 'payment' ? (
                      <Button 
                        onClick={handlePayment} 
                        disabled={processing}
                        className="w-full gradient-primary"
                      >
                        {processing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Complete Payment
                          </>
                        )}
                      </Button>
                    ) : currentStep !== 'confirmation' && (
                      <Button 
                        onClick={handleNext} 
                        disabled={!canProceed()}
                        className="w-full gradient-primary"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}