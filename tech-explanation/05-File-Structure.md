# 📁 05 - File Structure

## What We Did

We created a well-organized project structure following Next.js best practices and modern web development standards.

## Complete File Structure

```
ruben_portfolio/                      # Root project directory
├── 📁 src/                          # Source code directory
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📁 admin/
│   │   │   └── 📄 page.tsx          # Admin dashboard
│   │   ├── 📁 api/                  # API routes
│   │   │   ├── 📁 designs/
│   │   │   │   └── 📄 route.ts      # Designs API endpoint
│   │   │   └── 📁 upload/
│   │   │       └── 📄 route.ts      # Upload API endpoint
│   │   ├── 📄 favicon.ico           # Site icon
│   │   ├── 📄 globals.css           # Global styles
│   │   ├── 📄 layout.tsx            # Root layout component
│   │   └── 📄 page.tsx              # Home page
│   ├── 📁 components/               # Reusable components
│   │   ├── 📄 DesignGrid.tsx        # Portfolio grid component
│   │   └── 📄 UploadForm.tsx        # Upload form component
│   └── 📁 generated/                # Auto-generated code
│       └── 📁 prisma/               # Prisma client
├── 📁 prisma/                       # Database configuration
│   ├── 📄 dev.db                    # SQLite database
│   ├── 📄 schema.prisma             # Database schema
│   └── 📁 migrations/               # Database migrations
│       └── 📁 20251014202434_init/
│           └── 📄 migration.sql
├── 📁 public/                       # Static assets
│   ├── 📄 file.svg                  # Static icons
│   ├── 📄 globe.svg
│   ├── 📄 next.svg
│   ├── 📄 vercel.svg
│   ├── 📄 window.svg
│   └── 📁 uploads/                  # User uploads
│       └── 📄 .gitkeep              # Keep directory in git
├── 📁 tech-explanation/             # Documentation
│   ├── 📄 README.md                 # Main documentation
│   ├── 📄 00-Complete-Setup-Summary.md
│   ├── 📄 01-Project-Setup.md       # Setup guide
│   ├── 📄 02-Database-Setup.md      # Database guide
│   ├── 📄 03-Environment-Configuration.md
│   ├── 📄 04-Development-Server.md  # Server guide
│   ├── 📄 05-File-Structure.md      # This file
│   ├── 📄 06-Troubleshooting.md     # Troubleshooting guide
│   └── 📄 PROGRESS-ROADMAP.md       # Progress tracking
├── 📁 design-portfolio/             # Legacy directory (empty)
├── 📁 node_modules/                 # Dependencies
├── 📄 .env                          # Environment variables
├── 📄 .gitignore                    # Git ignore rules
├── 📄 eslint.config.mjs             # ESLint configuration
├── 📄 next-env.d.ts                 # Next.js TypeScript types
├── 📄 next.config.ts                # Next.js configuration
├── 📄 package-lock.json             # Dependency lock file
├── 📄 package.json                  # Project dependencies
├── 📄 postcss.config.mjs            # PostCSS configuration
├── 📄 project_roadmap.txt           # Original project roadmap
├── 📄 README.md                     # Project README
├── 📄 tsconfig.json                 # TypeScript configuration
└── 📄 website.html                  # Legacy placeholder file
```

## Directory Breakdown

### 📁 src/ - Source Code
**Purpose**: Contains all application source code

#### 📁 src/app/ - Next.js App Router
**Purpose**: Defines pages and layouts using the new App Router

**Files**:
- `layout.tsx` - Root layout component (wraps all pages)
- `page.tsx` - Home page component
- `globals.css` - Global CSS styles
- `api/` - API routes (server-side endpoints)

**Key Features**:
- **File-based routing**: Each file becomes a route
- **Nested layouts**: Layouts can be nested
- **Server components**: Components run on server by default

#### 📁 src/components/ - Reusable Components
**Purpose**: Shared React components used across the application

**Future Structure**:
```
src/components/
├── ui/                    # Basic UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── portfolio/             # Portfolio-specific components
│   ├── DesignGrid.tsx
│   ├── DesignCard.tsx
│   └── UploadForm.tsx
└── admin/                 # Admin panel components
    ├── AdminLayout.tsx
    ├── LoginForm.tsx
    └── Dashboard.tsx
```

#### 📁 src/lib/ - Utility Functions
**Purpose**: Shared utility functions and configurations

**Future Structure**:
```
src/lib/
├── auth.ts                # Authentication utilities
├── db.ts                  # Database connection
├── upload.ts              # File upload utilities
├── utils.ts               # General utilities
└── validations.ts         # Form validation schemas
```

### 📁 prisma/ - Database Configuration
**Purpose**: Database schema and migration management

#### 📄 schema.prisma
**Purpose**: Defines database models and relationships

**Key Sections**:
- `generator` - Prisma client configuration
- `datasource` - Database connection settings
- `model` - Database table definitions

#### 📁 migrations/
**Purpose**: Database schema change history

**Structure**:
- Each migration has a timestamp and name
- Contains SQL commands to modify database
- Allows rollback and version control

### 📁 public/ - Static Assets
**Purpose**: Files served directly by the web server

**Contents**:
- `favicon.ico` - Browser tab icon
- `images/` - Static images
- `uploads/` - User-uploaded files
- `robots.txt` - Search engine instructions
- `sitemap.xml` - Site structure for search engines

### 📁 tech-explanation/ - Documentation
**Purpose**: Comprehensive technical documentation

**Files**:
- Detailed explanations of each setup step
- Troubleshooting guides
- Best practices and patterns
- Command references

## Configuration Files

### 📄 package.json
**Purpose**: Project metadata and dependencies

**Key Sections**:
```json
{
  "name": "design-portfolio",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.5.5",
    "react": "^18",
    "typescript": "^5"
  }
}
```

### 📄 tsconfig.json
**Purpose**: TypeScript compiler configuration

**Key Settings**:
- `strict: true` - Enables strict type checking
- `baseUrl: "."` - Sets base directory for imports
- `paths` - Defines import aliases (`@/*`)

### 📄 next.config.ts
**Purpose**: Next.js framework configuration

**Common Settings**:
- Image optimization
- Environment variables
- Custom webpack configuration
- Redirects and rewrites

### 📄 tailwind.config.ts
**Purpose**: Tailwind CSS configuration

**Key Settings**:
- `content` - Files to scan for CSS classes
- `theme` - Custom design tokens
- `plugins` - Additional Tailwind plugins

## File Naming Conventions

### React Components
- **PascalCase**: `DesignGrid.tsx`, `UserProfile.tsx`
- **Descriptive**: Clear, meaningful names
- **Consistent**: Follow established patterns

### Pages and Routes
- **kebab-case**: `user-profile/page.tsx`
- **Nested**: Reflect URL structure
- **Special files**: `layout.tsx`, `page.tsx`, `loading.tsx`

### Utilities and Helpers
- **camelCase**: `formatDate.ts`, `validateEmail.ts`
- **Descriptive**: Clear purpose from name
- **Grouped**: Related functions in same file

## Import/Export Patterns

### Default Exports
```typescript
// Component files
export default function DesignGrid() {
  return <div>...</div>
}

// Page files
export default function HomePage() {
  return <div>...</div>
}
```

### Named Exports
```typescript
// Utility files
export function formatDate(date: Date): string {
  // ...
}

export function validateEmail(email: string): boolean {
  // ...
}
```

### Import Aliases
```typescript
// Using @ alias
import { DesignGrid } from '@/components/portfolio/DesignGrid'
import { formatDate } from '@/lib/utils'
import { prisma } from '@/lib/db'
```

## File Organization Best Practices

### 1. Group by Feature
```
src/
├── features/
│   ├── portfolio/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── admin/
│       ├── components/
│       └── utils/
```

### 2. Separate Concerns
- **Components**: UI logic only
- **Hooks**: State and side effects
- **Utils**: Pure functions
- **Types**: TypeScript definitions

### 3. Consistent Structure
- Same folder structure across features
- Predictable file locations
- Clear naming conventions

## Future File Additions

### API Routes
```
src/app/api/
├── designs/
│   ├── route.ts          # GET /api/designs
│   └── [id]/
│       └── route.ts      # GET /api/designs/[id]
├── upload/
│   └── route.ts          # POST /api/upload
└── auth/
    └── [...nextauth]/
        └── route.ts      # NextAuth configuration
```

### Components
```
src/components/
├── ui/                   # Basic UI components
├── forms/                # Form components
├── layout/               # Layout components
├── portfolio/            # Portfolio-specific
└── admin/                # Admin panel components
```

## File Structure Benefits

### 1. Scalability
- Easy to add new features
- Clear separation of concerns
- Predictable file locations

### 2. Maintainability
- Easy to find and modify code
- Consistent patterns
- Clear dependencies

### 3. Team Collaboration
- Standardized structure
- Clear conventions
- Easy onboarding

## Next Steps

After understanding file structure, we:
1. ✅ Know where to place new files
2. ✅ Understand import patterns
3. ✅ Can organize code effectively
4. 🔄 Ready for troubleshooting guide (see [06-Troubleshooting.md](./06-Troubleshooting.md))

## File Structure Checklist

- [ ] Understand directory purposes
- [ ] Know file naming conventions
- [ ] Understand import/export patterns
- [ ] Can locate files quickly
- [ ] Ready to add new features
- [ ] Follows best practices
