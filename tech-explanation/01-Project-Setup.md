# 🏗️ 01 - Project Setup

## What We Did

We created a new Next.js project with modern tooling and best practices.

## Step-by-Step Breakdown

### 1. Node.js PATH Issue Resolution

**Problem**: `npx` and `npm` commands weren't recognized
**Solution**: Added Node.js to system PATH

```powershell
# Temporary fix (for current session)
$env:PATH += ";C:\Program Files\nodejs"

# Permanent fix (recommended)
# 1. Press Win + R, type sysdm.cpl
# 2. Environment Variables → System Variables → Path → Edit
# 3. Add: C:\Program Files\nodejs
# 4. Restart terminal
```

### 2. Next.js Project Creation

**Command Used**:
```bash
npx create-next-app@latest design-portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**What Each Flag Does**:
- `--typescript` - Adds TypeScript support
- `--tailwind` - Includes Tailwind CSS for styling
- `--eslint` - Adds code linting
- `--app` - Uses Next.js App Router (newer, recommended)
- `--src-dir` - Puts source code in `src/` folder
- `--import-alias "@/*"` - Allows `@/` imports from src folder

### 3. Dependencies Installation

**Core Dependencies**:
```bash
npm install @prisma/client prisma next-auth bcrypt
```

**What Each Package Does**:
- `@prisma/client` - Database client for TypeScript
- `prisma` - Database ORM and migration tools
- `next-auth` - Authentication library for Next.js
- `bcrypt` - Password hashing for security

## File Structure Created

```
design-portfolio/
├── src/
│   └── app/                 # Next.js App Router
│       ├── globals.css      # Global styles
│       ├── layout.tsx       # Root layout component
│       └── page.tsx         # Home page
├── public/                  # Static assets
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
└── eslint.config.mjs       # ESLint configuration
```

## Key Configuration Files

### package.json
Contains all project dependencies and scripts:
- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint

### tsconfig.json
TypeScript configuration with:
- Strict type checking
- Path mapping (`@/*` → `src/*`)
- Next.js optimizations

### tailwind.config.ts
Tailwind CSS configuration with:
- Content paths for purging unused styles
- Custom theme extensions

## Why This Setup?

### Next.js App Router
- **Modern**: Latest Next.js architecture
- **Performance**: Better optimization
- **Developer Experience**: Improved routing and layouts

### TypeScript
- **Type Safety**: Catches errors at compile time
- **Better IDE Support**: Autocomplete and refactoring
- **Maintainability**: Easier to understand and modify

### Tailwind CSS
- **Rapid Development**: Utility-first approach
- **Consistency**: Design system built-in
- **Performance**: Only includes used styles

### Prisma
- **Type Safety**: Database queries are type-safe
- **Migration Management**: Easy database schema changes
- **Multi-Database**: Easy to switch from SQLite to PostgreSQL

## Next Steps

After setup, we:
1. ✅ Created the project structure
2. ✅ Installed all dependencies
3. ✅ Configured TypeScript and Tailwind
4. 🔄 Ready for database setup (see [02-Database-Setup.md](./02-Database-Setup.md))

## Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Add new dependency
npm install package-name

# Add development dependency
npm install -D package-name
```
