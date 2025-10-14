# ⚙️ 03 - Environment Configuration

## What We Did

We configured environment variables to securely manage database connections and other sensitive settings.

## Understanding Environment Variables

### What Are Environment Variables?
Environment variables are key-value pairs that store configuration data outside of your code. They're essential for:
- **Security**: Keep sensitive data out of code
- **Flexibility**: Different settings for development/production
- **Portability**: Easy to change without code modifications

## Files Created/Modified

### 1. `.env` File

**Location**: `design-portfolio/.env`

**Content**:
```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

### 2. `.gitignore` File

**Location**: `design-portfolio/.gitignore`

**Important Addition**:
```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## Environment Variable Breakdown

### DATABASE_URL
```env
DATABASE_URL="file:./dev.db"
```

**What It Does**:
- Tells Prisma where to find the database
- `file:` prefix indicates SQLite database
- `./dev.db` is the relative path to the database file

**Other Database Examples**:
```env
# PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"

# MySQL
DATABASE_URL="mysql://username:password@localhost:3306/portfolio"

# SQLite (current)
DATABASE_URL="file:./dev.db"
```

## Environment File Types

### Development Environment
- **File**: `.env`
- **Purpose**: Local development settings
- **Git**: Should be ignored (contains sensitive data)

### Production Environment
- **File**: `.env.production`
- **Purpose**: Production server settings
- **Git**: Should be ignored

### Local Override
- **File**: `.env.local`
- **Purpose**: Personal local settings
- **Git**: Always ignored

## How Next.js Uses Environment Variables

### Automatic Loading
Next.js automatically loads environment variables from:
1. `.env.local` (highest priority)
2. `.env.development` (development only)
3. `.env.production` (production only)
4. `.env` (lowest priority)

### Access in Code
```typescript
// Access environment variables
const databaseUrl = process.env.DATABASE_URL

// With fallback
const port = process.env.PORT || 3000
```

### Client-Side Access
```typescript
// Only variables prefixed with NEXT_PUBLIC_ are available in browser
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

## Security Best Practices

### ✅ Do
- Keep `.env` files in `.gitignore`
- Use different values for development/production
- Use strong, unique passwords
- Rotate secrets regularly

### ❌ Don't
- Commit `.env` files to Git
- Use production secrets in development
- Hardcode sensitive data in code
- Share environment files

## Environment Variables We'll Add Later

### Authentication
```env
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### File Upload
```env
MAX_FILE_SIZE="10485760"  # 10MB in bytes
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp"
```

### Production Database
```env
DATABASE_URL="postgresql://user:password@host:5432/portfolio"
```

## Environment Setup for Different Stages

### Development
```env
# .env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Production
```env
# .env.production
DATABASE_URL="postgresql://user:pass@host:5432/portfolio"
NEXTAUTH_SECRET="super-secure-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
```

## Commands Reference

### View Environment Variables
```bash
# In PowerShell
Get-Content .env

# In Bash
cat .env
```

### Set Environment Variable (Temporary)
```bash
# PowerShell
$env:DATABASE_URL="file:./test.db"

# Bash
export DATABASE_URL="file:./test.db"
```

### Validate Environment Variables
```bash
# Check if Prisma can connect
npx prisma db pull
```

## Troubleshooting Environment Issues

### Common Problems

#### 1. Database Connection Failed
**Error**: `Can't reach database server`
**Solution**: Check `DATABASE_URL` format and database server status

#### 2. Environment Variable Not Found
**Error**: `process.env.VARIABLE is undefined`
**Solution**: 
- Check variable name spelling
- Ensure `.env` file exists
- Restart development server

#### 3. Git Tracking Environment Files
**Error**: `.env` file shows up in `git status`
**Solution**: Add `.env` to `.gitignore` and remove from tracking

## Environment Variable Validation

### TypeScript Interface
```typescript
// lib/env.ts
interface Environment {
  DATABASE_URL: string
  NEXTAUTH_SECRET: string
  NEXTAUTH_URL: string
}

const env: Environment = {
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
}

export default env
```

### Runtime Validation
```typescript
// lib/validate-env.ts
function validateEnv() {
  const required = ['DATABASE_URL', 'NEXTAUTH_SECRET']
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }
}

validateEnv()
```

## Next Steps

After environment configuration, we:
1. ✅ Set up database connection
2. ✅ Configured security settings
3. ✅ Prepared for different environments
4. 🔄 Ready for development server setup (see [04-Development-Server.md](./04-Development-Server.md))

## Environment Checklist

- [ ] `.env` file created with `DATABASE_URL`
- [ ] `.env` added to `.gitignore`
- [ ] Environment variables properly formatted
- [ ] Database connection tested
- [ ] Development server can start
- [ ] Ready for production environment setup
