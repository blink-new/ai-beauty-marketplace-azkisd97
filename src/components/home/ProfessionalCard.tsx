import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { Star, MapPin, Clock, Verified, Heart, Share2 } from 'lucide-react'
import type { Professional } from '@/types'

interface ProfessionalCardProps {
  professional: Professional
  onViewProfile: (id: string) => void
  onBookNow: (id: string) => void
}

export default function ProfessionalCard({ 
  professional, 
  onViewProfile, 
  onBookNow 
}: ProfessionalCardProps) {
  const { toast } = useToast()

  const handleShareProfile = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    const profileUrl = `${window.location.origin}/professional/${professional.id}`
    
    try {
      // Try to use the Web Share API if available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: `${professional.businessName} - BeautyAI`,
          text: `Check out ${professional.businessName} on BeautyAI - ${professional.description}`,
          url: profileUrl
        })
        return
      }
      
      // Fallback to clipboard
      await navigator.clipboard.writeText(profileUrl)
      toast({
        title: "Link copied!",
        description: `${professional.businessName}'s profile link copied to clipboard.`,
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
        description: `${professional.businessName}'s profile link copied to clipboard.`,
      })
    }
  }
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden">
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-primary opacity-5" />
        
        <CardContent className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                <AvatarImage src={professional.avatar} alt={professional.businessName} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {professional.businessName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {professional.businessName}
                  </h3>
                  {professional.verified && (
                    <Verified className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{professional.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleShareProfile}
                title="Share profile"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{professional.rating}</span>
              <span className="text-sm text-gray-500">({professional.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Available today</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {professional.description}
          </p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-1 mb-4">
            {professional.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {professional.specialties.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{professional.specialties.length - 3} more
              </Badge>
            )}
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-500">Starting from</span>
              <div className="font-semibold text-lg text-primary">{professional.priceRange}</div>
            </div>
            <Badge 
              variant={professional.availability ? 'default' : 'secondary'}
              className={professional.availability ? 'bg-green-100 text-green-800' : ''}
            >
              {professional.availability ? 'Available' : 'Busy'}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onViewProfile(professional.id)}
            >
              View Profile
            </Button>
            <Button 
              className="flex-1 gradient-primary hover:opacity-90"
              onClick={() => onBookNow(professional.id)}
              disabled={!professional.availability}
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}