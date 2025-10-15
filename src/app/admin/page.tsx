'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UploadForm from '@/components/UploadForm'
import BulkUploadForm from '@/components/BulkUploadForm'
import DesignManager from '@/components/DesignManager'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'single' | 'bulk' | 'manage'>('single')
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // For now, using simple hardcoded credentials
      // In production, this would be a proper API call with hashed passwords
      if (email === 'test@test.com' && password === 'admin123') {
        localStorage.setItem('admin_authenticated', 'true')
        setIsAuthenticated(true)
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  const handleUploadSuccess = () => {
    // Optionally redirect to portfolio or show success message
    router.push('/')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to manage your portfolio
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Contact administrator for login credentials
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                View Portfolio
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('single')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'single'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Single Upload
                </button>
                <button
                  onClick={() => setActiveTab('bulk')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'bulk'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Bulk Upload
                </button>
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'manage'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Manage Designs
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'single' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Upload Single Design
                </h2>
                <p className="text-gray-600">
                  Upload one design at a time with detailed information.
                </p>
              </div>
              <UploadForm onUploadSuccess={handleUploadSuccess} />
            </div>
          )}

          {activeTab === 'bulk' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Bulk Upload Designs
                </h2>
                <p className="text-gray-600">
                  Upload multiple designs at once. Perfect for adding many designs quickly.
                </p>
              </div>
              <BulkUploadForm onUploadSuccess={handleUploadSuccess} />
            </div>
          )}

          {activeTab === 'manage' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Manage Existing Designs
                </h2>
                <p className="text-gray-600">
                  Edit, delete, or organize your uploaded designs.
                </p>
              </div>
              <DesignManager onDesignUpdate={handleUploadSuccess} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
