# 🗄️ 02 - Database Setup

## What We Did

We set up a local SQLite database using Prisma ORM with a schema for our portfolio website.

## Step-by-Step Breakdown

### 1. Prisma Initialization

**Command Used**:
```bash
npx prisma init --datasource-provider sqlite
```

**What This Created**:
- `prisma/schema.prisma` - Database schema file
- `.env` - Environment variables file
- Basic Prisma configuration

### 2. Environment Configuration

**File**: `.env`
```env
DATABASE_URL="file:./dev.db"
```

**What This Does**:
- Tells Prisma where to store the SQLite database
- `dev.db` will be created in the project root
- Easy to change for production (PostgreSQL, MySQL, etc.)

### 3. Database Schema Creation

**File**: `prisma/schema.prisma`

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Design {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  imagePath   String
  createdAt   DateTime @default(now())
}

model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String
}
```

### 4. Database Migration

**Command Used**:
```bash
npx prisma migrate dev --name init
```

**What This Did**:
1. Created `prisma/migrations/` folder
2. Generated SQL migration files
3. Created the actual SQLite database (`dev.db`)
4. Generated Prisma client in `src/generated/prisma/`

## Understanding the Schema

### Design Model
```prisma
model Design {
  id          Int      @id @default(autoincrement())  # Primary key, auto-increment
  title       String                                  # Required field
  description String?                                 # Optional field (nullable)
  imagePath   String                                  # Path to uploaded image
  createdAt   DateTime @default(now())               # Auto-set creation timestamp
}
```

**Purpose**: Stores portfolio design entries
- `id` - Unique identifier
- `title` - Design name/title
- `description` - Optional description
- `imagePath` - File path to the image
- `createdAt` - When the design was added

### User Model
```prisma
model User {
  id       Int    @id @default(autoincrement())  # Primary key
  email    String @unique                        # Unique email address
  password String                                # Hashed password
}
```

**Purpose**: Stores admin user accounts
- `id` - Unique identifier
- `email` - Login email (must be unique)
- `password` - Hashed password for security

## Prisma Client Generation

**Location**: `src/generated/prisma/`

**What It Contains**:
- TypeScript types for our models
- Database query functions
- Type-safe database operations

**Usage Example** (we'll use this later):
```typescript
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// Get all designs
const designs = await prisma.design.findMany()

// Create a new design
const newDesign = await prisma.design.create({
  data: {
    title: "My Design",
    description: "A beautiful design",
    imagePath: "/uploads/design.jpg"
  }
})
```

## Database Files Created

```
design-portfolio/
├── prisma/
│   ├── schema.prisma           # Schema definition
│   └── migrations/
│       └── 20251014202434_init/
│           └── migration.sql   # SQL migration file
├── src/
│   └── generated/
│       └── prisma/             # Generated Prisma client
└── dev.db                      # SQLite database file
```

## Why SQLite?

### Advantages
- **Zero Configuration**: No server setup required
- **File-Based**: Database is just a file
- **Fast**: Excellent performance for small to medium apps
- **Portable**: Easy to backup and move
- **Development Friendly**: Perfect for local development

### Migration Path
- **Local Development**: SQLite
- **Production**: Easy migration to PostgreSQL/MySQL
- **Same Code**: Prisma handles the differences

## Database Commands Reference

```bash
# Create a new migration
npx prisma migrate dev --name description

# Reset database (deletes all data)
npx prisma migrate reset

# Generate Prisma client
npx prisma generate

# Open database in browser
npx prisma studio

# View database schema
npx prisma db pull
```

## Prisma Studio

**Command**: `npx prisma studio`

**What It Does**:
- Opens a web interface at `http://localhost:5555`
- View and edit database data
- Useful for development and debugging

## Next Steps

After database setup, we:
1. ✅ Created database schema
2. ✅ Set up SQLite database
3. ✅ Generated Prisma client
4. 🔄 Ready for file upload system (see [03-File-Upload-System.md](./03-File-Upload-System.md))

## Common Database Operations

### Reading Data
```typescript
// Get all designs
const designs = await prisma.design.findMany()

// Get design by ID
const design = await prisma.design.findUnique({
  where: { id: 1 }
})

// Get designs with conditions
const recentDesigns = await prisma.design.findMany({
  where: {
    createdAt: {
      gte: new Date('2024-01-01')
    }
  }
})
```

### Creating Data
```typescript
// Create a new design
const design = await prisma.design.create({
  data: {
    title: "New Design",
    description: "Description here",
    imagePath: "/uploads/image.jpg"
  }
})
```

### Updating Data
```typescript
// Update a design
const updatedDesign = await prisma.design.update({
  where: { id: 1 },
  data: {
    title: "Updated Title"
  }
})
```

### Deleting Data
```typescript
// Delete a design
await prisma.design.delete({
  where: { id: 1 }
})
```
