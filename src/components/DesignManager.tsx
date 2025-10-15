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

interface DesignManagerProps {
  onDesignUpdate?: () => void
}

export default function DesignManager({ onDesignUpdate }: DesignManagerProps) {
  const [designs, setDesigns] = useState<Design[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingDesign, setEditingDesign] = useState<Design | null>(null)
  const [editForm, setEditForm] = useState({ title: '', description: '' })
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedDesigns, setSelectedDesigns] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchDesigns()
  }, [])

  const fetchDesigns = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/designs')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setDesigns(data)
    } catch (err) {
      setError('Failed to load designs.')
      console.error('Error fetching designs:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (design: Design) => {
    setEditingDesign(design)
    setEditForm({
      title: design.title,
      description: design.description || ''
    })
    setMessage('')
  }

  const handleUpdate = async () => {
    if (!editingDesign) return

    setIsUpdating(true)
    setMessage('')

    try {
      const response = await fetch(`/api/designs/${editingDesign.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'admin-secret-token',
        },
        body: JSON.stringify({
          title: editForm.title,
          description: editForm.description
        })
      })

      const result = await response.json()

      if (result.success) {
        setMessage('✅ Design updated successfully!')
        setEditingDesign(null)
        fetchDesigns()
        if (onDesignUpdate) onDesignUpdate()
      } else {
        setMessage(`❌ Update failed: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Update failed. Please try again.')
      console.error('Update error:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/designs/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': 'admin-secret-token',
        }
      })

      const result = await response.json()

      if (result.success) {
        setMessage('✅ Design deleted successfully!')
        fetchDesigns()
        if (onDesignUpdate) onDesignUpdate()
      } else {
        setMessage(`❌ Delete failed: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Delete failed. Please try again.')
      console.error('Delete error:', error)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedDesigns.size === 0) {
      setMessage('Please select designs to delete')
      return
    }

    if (!confirm(`Are you sure you want to delete ${selectedDesigns.size} design(s)? This action cannot be undone.`)) {
      return
    }

    try {
      const deletePromises = Array.from(selectedDesigns).map(id => 
        fetch(`/api/designs/${id}`, {
          method: 'DELETE',
          headers: {
            'x-admin-token': 'admin-secret-token',
          }
        })
      )

      const results = await Promise.all(deletePromises)
      const successCount = results.filter(r => r.ok).length

      if (successCount === selectedDesigns.size) {
        setMessage(`✅ Successfully deleted ${successCount} design(s)!`)
      } else {
        setMessage(`⚠️ Deleted ${successCount} of ${selectedDesigns.size} design(s)`)
      }

      setSelectedDesigns(new Set())
      fetchDesigns()
      if (onDesignUpdate) onDesignUpdate()
    } catch (error) {
      setMessage('❌ Bulk delete failed. Please try again.')
      console.error('Bulk delete error:', error)
    }
  }

  const toggleSelection = (id: number) => {
    const newSelection = new Set(selectedDesigns)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedDesigns(newSelection)
  }

  const selectAll = () => {
    if (selectedDesigns.size === designs.length) {
      setSelectedDesigns(new Set())
    } else {
      setSelectedDesigns(new Set(designs.map(d => d.id)))
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading designs...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>
  }

  if (designs.length === 0) {
    return <div className="text-center py-8 text-gray-600">No designs uploaded yet.</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Designs</h2>
        <div className="flex gap-2">
          {selectedDesigns.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Selected ({selectedDesigns.size})
            </button>
          )}
          <button
            onClick={selectAll}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {selectedDesigns.size === designs.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 p-3 rounded-md ${
          message.includes('✅') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : message.includes('⚠️')
            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Edit Modal */}
      {editingDesign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Design</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingDesign(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating || !editForm.title.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Designs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {designs.map((design) => (
          <div
            key={design.id}
            className={`relative border rounded-lg overflow-hidden bg-white ${
              selectedDesigns.has(design.id) ? 'ring-2 ring-blue-500' : 'border-gray-200'
            }`}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-2 left-2 z-10">
              <input
                type="checkbox"
                checked={selectedDesigns.has(design.id)}
                onChange={() => toggleSelection(design.id)}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            {/* Image */}
            <div className="aspect-square relative">
              <Image
                src={design.imagePath}
                alt={design.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                {design.title}
              </h3>
              {design.description && (
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {design.description}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {new Date(design.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              <button
                onClick={() => handleEdit(design)}
                className="p-1 text-blue-600 hover:text-blue-800 bg-white rounded shadow-sm"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(design.id)}
                className="p-1 text-red-600 hover:text-red-800 bg-white rounded shadow-sm"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
