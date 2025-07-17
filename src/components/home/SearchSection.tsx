import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Search, MapPin, Filter, Sparkles } from 'lucide-react'

interface SearchSectionProps {
  onSearch: (query: string, location: string, category: string) => void
}

const categories = [
  'All Services',
  'Hair Styling',
  'Makeup',
  'Skincare',
  'Nails',
  'Massage',
  'Eyebrows',
  'Lashes'
]

const popularSearches = [
  'Bridal makeup',
  'Hair coloring',
  'Facial treatment',
  'Gel manicure',
  'Eyebrow threading'
]

export default function SearchSection({ onSearch }: SearchSectionProps) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Services')

  const handleSearch = () => {
    onSearch(query, location, selectedCategory)
  }

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 gradient-primary opacity-5 rounded-3xl" />
      
      <Card className="relative p-8 border-0 shadow-xl gradient-card">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Find Your Perfect Beauty Professional
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered matching connects you with verified beauty experts in your area
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="What service are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Button 
              onClick={handleSearch}
              className="h-12 text-base font-medium gradient-primary hover:opacity-90 transition-opacity"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-primary/10'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Popular Searches */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.map((search) => (
                <Button
                  key={search}
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => {
                    setQuery(search)
                    onSearch(search, location, selectedCategory)
                  }}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-sm text-gray-600">Verified Professionals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </Card>
    </div>
  )
}