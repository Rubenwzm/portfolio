import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'

const prisma = new PrismaClient()

// Simple authentication check
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const adminToken = request.headers.get('x-admin-token')
  
  return adminToken === 'admin-secret-token' || authHeader === 'Bearer admin-secret-token'
}

// GET /api/designs/[id] - Get a specific design
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid design ID' },
        { status: 400 }
      )
    }

    const design = await prisma.design.findUnique({
      where: { id }
    })

    if (!design) {
      return NextResponse.json(
        { error: 'Design not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(design)
  } catch (error) {
    console.error('Error fetching design:', error)
    return NextResponse.json(
      { error: 'Failed to fetch design' },
      { status: 500 }
    )
  }
}

// PUT /api/designs/[id] - Update a design
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid design ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { title, description } = body

    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Check if design exists
    const existingDesign = await prisma.design.findUnique({
      where: { id }
    })

    if (!existingDesign) {
      return NextResponse.json(
        { error: 'Design not found' },
        { status: 404 }
      )
    }

    // Update the design
    const updatedDesign = await prisma.design.update({
      where: { id },
      data: {
        title: title.trim(),
        description: description?.trim() || null
      }
    })

    return NextResponse.json({
      success: true,
      design: updatedDesign
    })
  } catch (error) {
    console.error('Error updating design:', error)
    return NextResponse.json(
      { error: 'Failed to update design' },
      { status: 500 }
    )
  }
}

// DELETE /api/designs/[id] - Delete a design
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid design ID' },
        { status: 400 }
      )
    }

    // Get the design to find the file path
    const design = await prisma.design.findUnique({
      where: { id }
    })

    if (!design) {
      return NextResponse.json(
        { error: 'Design not found' },
        { status: 404 }
      )
    }

    // Delete the design from database
    await prisma.design.delete({
      where: { id }
    })

    // Delete the file from filesystem
    try {
      const filePath = join(process.cwd(), 'public', design.imagePath)
      await unlink(filePath)
    } catch (fileError) {
      console.error('Error deleting file:', fileError)
      // Don't fail the request if file deletion fails
    }

    return NextResponse.json({
      success: true,
      message: 'Design deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting design:', error)
    return NextResponse.json(
      { error: 'Failed to delete design' },
      { status: 500 }
    )
  }
}
