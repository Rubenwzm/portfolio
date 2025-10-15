'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Design {
  id: number
  title: string
  description?: string
  imagePath: string
  createdAt: string
}

interface EnhancedDesignGridProps {
  onDesignUpdate?: () => void
}

export default function EnhancedDesignGrid({ onDesignUpdate }: EnhancedDesignGridProps) {
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest')
  const [filterTitle, setFilterTitle] = useState('')
  const [groupByTitle, setGroupByTitle] = useState(false)

  useEffect(() => {
    fetchDesigns()
  }, [])

  const fetchDesigns = async () => {
    try {
      const response = await fetch('/api/designs')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setDesigns(Array.isArray(data) ? data : [])
    } catch (error) {
      setError('Failed to load designs')
      setDesigns([])
      console.error('Error fetching designs:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortedAndFilteredDesigns = () => {
    let filtered = designs.filter(design => 
      design.title.toLowerCase().includes(filterTitle.toLowerCase())
    )

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    if (groupByTitle) {
      const grouped = filtered.reduce((acc, design) => {
        const title = design.title
        if (!acc[title]) {
          acc[title] = []
        }
        acc[title].push(design)
        return acc
      }, {} as Record<string, Design[]>)

      return grouped
    }

    return filtered
  }

  const openModal = (design: Design) => {
    setSelectedDesign(design)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedDesign(null)
    document.body.style.overflow = 'unset'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading designs...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error}</div>
          <button 
            onClick={fetchDesigns}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const processedData = sortedAndFilteredDesigns()

  return (
    <div id="portfolio" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of my creative work, showcasing design projects and visual storytelling.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-4">
            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <input
                type="text"
                placeholder="Search by title..."
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Group Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={groupByTitle}
                onChange={(e) => setGroupByTitle(e.target.checked)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Group by title</span>
            </label>
          </div>

          <div className="text-sm text-gray-500">
            {Array.isArray(processedData) ? processedData.length : Object.keys(processedData).length} design(s)
          </div>
        </div>

        {/* Designs Grid */}
        {Array.isArray(processedData) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {processedData.map((design) => (
              <div
                key={design.id}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(design)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={design.imagePath}
                    alt={design.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {design.title}
                  </h3>
                  {design.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {design.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(design.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grouped view
          <div className="space-y-12">
            {Object.entries(processedData).map(([title, designs]) => (
              <div key={title}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                  {title} ({designs.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {designs.map((design) => (
                    <div
                      key={design.id}
                      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                      onClick={() => openModal(design)}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={design.imagePath}
                          alt={design.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1 truncate">
                          {design.title}
                        </h4>
                        {design.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {design.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {new Date(design.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {(!Array.isArray(processedData) && Object.keys(processedData).length === 0) || 
         (Array.isArray(processedData) && processedData.length === 0) ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No designs found matching your criteria.</div>
          </div>
        ) : null}
      </div>

      {/* Image Modal */}
      {selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative aspect-video max-h-96">
                <Image
                  src={selectedDesign.imagePath}
                  alt={selectedDesign.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedDesign.title}
                </h3>
                {selectedDesign.description && (
                  <p className="text-gray-600 mb-4">
                    {selectedDesign.description}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Created: {new Date(selectedDesign.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
