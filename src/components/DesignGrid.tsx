'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Design {
  id: number
  title: string
  description: string | null
  imagePath: string
  createdAt: string
}

export default function DesignGrid() {
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDesigns = async () => {
    try {
      const response = await fetch('/api/designs')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      
      // API now returns the array directly
      setDesigns(Array.isArray(data) ? data : [])
    } catch (error) {
      setError('Failed to load designs')
      setDesigns([])
      console.error('Error fetching designs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDesigns()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading designs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  if (designs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">No designs uploaded yet.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Design Portfolio
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-64 w-full">
              <Image
                src={design.imagePath}
                alt={design.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {design.title}
              </h3>
              
              {design.description && (
                <p className="text-gray-600 mb-3">
                  {design.description}
                </p>
              )}
              
              <p className="text-sm text-gray-500">
                {new Date(design.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
