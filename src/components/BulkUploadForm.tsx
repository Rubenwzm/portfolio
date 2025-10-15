'use client'

import { useState } from 'react'

interface UploadItem {
  file: File
  title: string
  description: string
  id: string
}

interface BulkUploadFormProps {
  onUploadSuccess?: () => void
}

export default function BulkUploadForm({ onUploadSuccess }: BulkUploadFormProps) {
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    const newItems: UploadItem[] = files.map((file, index) => ({
      file,
      title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
      description: '',
      id: `${Date.now()}-${index}`
    }))

    setUploadItems(prev => [...prev, ...newItems])
    setMessage('')
  }

  const updateItem = (id: string, field: keyof UploadItem, value: string) => {
    setUploadItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setUploadItems(prev => prev.filter(item => item.id !== id))
  }

  const handleBulkUpload = async () => {
    if (uploadItems.length === 0) {
      setMessage('Please select files to upload')
      return
    }

    setIsUploading(true)
    setMessage('')
    setUploadProgress(0)

    try {
      let successCount = 0
      let errorCount = 0

      for (let i = 0; i < uploadItems.length; i++) {
        const item = uploadItems[i]
        
        try {
          const uploadData = new FormData()
          uploadData.append('title', item.title)
          uploadData.append('description', item.description)
          uploadData.append('file', item.file)

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadData,
            headers: {
              'x-admin-token': 'admin-secret-token',
            },
          })

          const result = await response.json()

          if (result.success) {
            successCount++
          } else {
            errorCount++
            console.error(`Upload failed for ${item.title}:`, result.error)
          }
        } catch (error) {
          errorCount++
          console.error(`Upload error for ${item.title}:`, error)
        }

        // Update progress
        setUploadProgress(Math.round(((i + 1) / uploadItems.length) * 100))
      }

      // Show results
      if (successCount > 0 && errorCount === 0) {
        setMessage(`✅ Successfully uploaded ${successCount} design(s)!`)
        setUploadItems([])
        if (onUploadSuccess) onUploadSuccess()
      } else if (successCount > 0 && errorCount > 0) {
        setMessage(`⚠️ Uploaded ${successCount} design(s), ${errorCount} failed`)
      } else {
        setMessage(`❌ All uploads failed. Please try again.`)
      }

    } catch (error) {
      setMessage('Bulk upload failed. Please try again.')
      console.error('Bulk upload error:', error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const clearAll = () => {
    setUploadItems([])
    setMessage('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bulk Upload Designs</h2>
        <div className="flex gap-2">
          <button
            onClick={clearAll}
            disabled={uploadItems.length === 0 || isUploading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* File Selection */}
      <div className="mb-6">
        <label htmlFor="bulk-files" className="block text-sm font-medium text-gray-700 mb-2">
          Select Multiple Images
        </label>
        <input
          type="file"
          id="bulk-files"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelection}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-1 text-xs text-gray-500">
          Select multiple JPEG, PNG, WebP, or GIF files. Max size: 10MB each
        </p>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Upload Items */}
      {uploadItems.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Files to Upload ({uploadItems.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {uploadItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-4">
                  {/* File Preview */}
                  <div className="flex-shrink-0">
                    <img
                      src={URL.createObjectURL(item.file)}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md border border-gray-300"
                    />
                  </div>
                  
                  {/* File Info and Form */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(item.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={isUploading}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional description"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Upload Button */}
      <button
        onClick={handleBulkUpload}
        disabled={uploadItems.length === 0 || isUploading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? `Uploading... ${uploadProgress}%` : `Upload ${uploadItems.length} Design(s)`}
      </button>
    </div>
  )
}
