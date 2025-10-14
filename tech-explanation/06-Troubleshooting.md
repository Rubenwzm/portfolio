# 🔧 06 - Troubleshooting

## What We Did

We documented common issues and their solutions to help you maintain and debug the portfolio website.

## Common Issues and Solutions

### 🚨 Node.js and npm Issues

#### Issue: `'node' is not recognized`
**Error Message**:
```
'node' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

**Causes**:
- Node.js not installed
- Node.js not added to system PATH
- Terminal not restarted after installation

**Solutions**:

1. **Check if Node.js is installed**:
   ```powershell
   Test-Path "C:\Program Files\nodejs\node.exe"
   ```

2. **Add to PATH temporarily**:
   ```powershell
   $env:PATH += ";C:\Program Files\nodejs"
   ```

3. **Add to PATH permanently**:
   - Press `Win + R`, type `sysdm.cpl`
   - Environment Variables → System Variables → Path → Edit
   - Add: `C:\Program Files\nodejs`
   - Restart terminal

4. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

#### Issue: `'npm' is not recognized`
**Error Message**:
```
'npm' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

**Solutions**:
- Same as Node.js PATH issue
- npm comes with Node.js installation

### 🚨 Development Server Issues

#### Issue: Port 3000 already in use
**Error Message**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions**:

1. **Kill process on port 3000**:
   ```bash
   npx kill-port 3000
   ```

2. **Use different port**:
   ```bash
   npm run dev -- -p 3001
   ```

3. **Find and kill process manually**:
   ```bash
   # Find process
   netstat -ano | findstr :3000
   
   # Kill process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

#### Issue: Development server won't start
**Error Message**:
```
Error: Cannot find module 'next'
```

**Solutions**:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Clear cache and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node.js version**:
   ```bash
   node --version  # Should be 18+ for Next.js 15
   ```

### 🚨 Database Issues

#### Issue: Database connection failed
**Error Message**:
```
Can't reach database server at file:./dev.db
```

**Solutions**:

1. **Check .env file**:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

2. **Verify database file exists**:
   ```bash
   Test-Path dev.db
   ```

3. **Reset database**:
   ```bash
   npx prisma migrate reset
   ```

4. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

#### Issue: Prisma client not found
**Error Message**:
```
Cannot find module '@/generated/prisma'
```

**Solutions**:

1. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

2. **Check schema.prisma**:
   ```prisma
   generator client {
     provider = "prisma-client-js"
     output   = "../src/generated/prisma"
   }
   ```

3. **Run migration**:
   ```bash
   npx prisma migrate dev --name init
   ```

### 🚨 Build Issues

#### Issue: TypeScript compilation errors
**Error Message**:
```
Type error: Property 'title' does not exist on type '{}'
```

**Solutions**:

1. **Check TypeScript configuration**:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true
     }
   }
   ```

2. **Add type definitions**:
   ```typescript
   interface Design {
     id: number
     title: string
     description?: string
     imagePath: string
     createdAt: Date
   }
   ```

3. **Fix type errors**:
   - Add proper type annotations
   - Use type assertions when necessary
   - Check import statements

#### Issue: ESLint errors
**Error Message**:
```
Warning: Expected an assignment or function call
```

**Solutions**:

1. **Fix ESLint errors**:
   - Remove unused variables
   - Add missing dependencies
   - Fix code style issues

2. **Disable specific rules** (if necessary):
   ```typescript
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const unusedVariable = 'value'
   ```

3. **Update ESLint configuration**:
   ```javascript
   // eslint.config.mjs
   export default [
     {
       rules: {
         '@typescript-eslint/no-unused-vars': 'warn'
       }
     }
   ]
   ```

### 🚨 Environment Issues

#### Issue: Environment variables not loading
**Error Message**:
```
process.env.DATABASE_URL is undefined
```

**Solutions**:

1. **Check .env file location**:
   - Must be in project root
   - Must be named exactly `.env`

2. **Verify .env content**:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. **Restart development server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

4. **Check .gitignore**:
   ```gitignore
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

### 🚨 File Upload Issues

#### Issue: Upload directory not found
**Error Message**:
```
ENOENT: no such file or directory, open 'public/uploads/image.jpg'
```

**Solutions**:

1. **Create uploads directory**:
   ```bash
   mkdir public/uploads
   ```

2. **Check file permissions**:
   - Ensure write permissions
   - Check disk space

3. **Verify file path**:
   ```typescript
   const uploadPath = path.join(process.cwd(), 'public', 'uploads')
   ```

### 🚨 Authentication Issues

#### Issue: NextAuth configuration error
**Error Message**:
```
[next-auth][error][CONFIGURATION_ERROR]
```

**Solutions**:

1. **Check environment variables**:
   ```env
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

2. **Verify NextAuth configuration**:
   ```typescript
   // src/app/api/auth/[...nextauth]/route.ts
   export { handlers as GET, handlers as POST }
   ```

3. **Check database connection**:
   - Ensure User model exists
   - Verify database is accessible

## Debugging Techniques

### 1. Check Console Output
- **Terminal**: Look for error messages
- **Browser Console**: Check for runtime errors
- **Network Tab**: Monitor API calls

### 2. Use Debugging Tools
```typescript
// Add console.log statements
console.log('Debug info:', { data, error })

// Use browser dev tools
debugger; // Pauses execution

// Check environment variables
console.log('Environment:', process.env)
```

### 3. Verify File Structure
```bash
# Check if files exist
Test-Path src/app/page.tsx
Test-Path prisma/schema.prisma
Test-Path .env

# List directory contents
Get-ChildItem -Recurse -Name
```

### 4. Test Individual Components
```bash
# Test database connection
npx prisma studio

# Test TypeScript compilation
npx tsc --noEmit

# Test ESLint
npm run lint
```

## Performance Issues

### Issue: Slow development server
**Solutions**:

1. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Optimize imports**:
   ```typescript
   // Use dynamic imports for large components
   const HeavyComponent = dynamic(() => import('./HeavyComponent'))
   ```

3. **Check file watchers**:
   - Exclude unnecessary directories
   - Use .gitignore effectively

### Issue: Large bundle size
**Solutions**:

1. **Analyze bundle**:
   ```bash
   npm install -D @next/bundle-analyzer
   ```

2. **Use dynamic imports**:
   ```typescript
   const AdminPanel = dynamic(() => import('./AdminPanel'), {
     loading: () => <p>Loading...</p>
   })
   ```

3. **Optimize images**:
   ```typescript
   import Image from 'next/image'
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={500}
     height={300}
   />
   ```

## Recovery Procedures

### 1. Complete Reset
```bash
# Remove all generated files
rm -rf .next node_modules package-lock.json

# Reinstall dependencies
npm install

# Reset database
npx prisma migrate reset

# Start fresh
npm run dev
```

### 2. Database Recovery
```bash
# Backup database
cp dev.db dev.db.backup

# Reset to last migration
npx prisma migrate reset

# Or restore from backup
cp dev.db.backup dev.db
```

### 3. Environment Recovery
```bash
# Check environment files
Get-Content .env

# Verify Node.js installation
node --version
npm --version

# Check PATH
echo $env:PATH
```

## Prevention Tips

### 1. Regular Maintenance
- Keep dependencies updated
- Clear cache regularly
- Monitor disk space
- Backup important files

### 2. Development Best Practices
- Use version control (Git)
- Test changes incrementally
- Keep environment files secure
- Document custom configurations

### 3. Monitoring
- Check console for warnings
- Monitor build times
- Watch for memory usage
- Test on different devices

## Getting Help

### 1. Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### 2. Community Resources
- [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)
- [Prisma GitHub Issues](https://github.com/prisma/prisma/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

### 3. Debugging Tools
- Browser Developer Tools
- React Developer Tools
- Prisma Studio
- Next.js built-in debugging

## Troubleshooting Checklist

### Before Asking for Help
- [ ] Checked console output
- [ ] Verified file structure
- [ ] Tested basic commands
- [ ] Checked environment variables
- [ ] Tried common solutions
- [ ] Searched documentation
- [ ] Checked GitHub issues

### Information to Provide
- [ ] Error message (exact text)
- [ ] Steps to reproduce
- [ ] Environment details (OS, Node.js version)
- [ ] Relevant code snippets
- [ ] What you've already tried

## Next Steps

After understanding troubleshooting, you:
1. ✅ Can diagnose common issues
2. ✅ Know how to fix problems
3. ✅ Can prevent future issues
4. ✅ Are ready to continue development

## Emergency Contacts

### Critical Issues
- **Database corruption**: Restore from backup
- **Security breach**: Change all passwords
- **Data loss**: Check backups immediately

### Non-Critical Issues
- **Performance**: Optimize gradually
- **UI bugs**: Fix incrementally
- **Feature requests**: Plan for next iteration
