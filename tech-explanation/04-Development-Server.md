# 🚀 04 - Development Server

## What We Did

We set up and tested the Next.js development server to run our portfolio website locally.

## Understanding the Development Server

### What Is a Development Server?
A development server is a local web server that:
- **Serves your website** at `http://localhost:3000`
- **Hot reloads** changes automatically
- **Provides debugging** tools and error messages
- **Compiles** TypeScript and processes CSS
- **Handles routing** for your Next.js application

## Starting the Development Server

### Command
```bash
npm run dev
```

### What Happens When You Run This
1. **Compiles** TypeScript to JavaScript
2. **Processes** Tailwind CSS
3. **Starts** the Next.js server
4. **Opens** the application at `http://localhost:3000`
5. **Watches** for file changes
6. **Hot reloads** when you save files

### Expected Output
```
> design-portfolio@0.1.0 dev
> next dev

  ▲ Next.js 15.5.5
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.100:3000

 ✓ Ready in 2.3s
 ✓ Compiled successfully
```

## Testing the Website

### 1. Open Your Browser
Navigate to: `http://localhost:3000`

### 2. What You Should See
- **Next.js Welcome Page** with:
  - "Get started by editing src/app/page.tsx"
  - Next.js logo and documentation links
  - Example components and styling

### 3. Test Hot Reloading
1. Open `src/app/page.tsx`
2. Change some text
3. Save the file
4. Watch the browser update automatically

## Development Server Features

### Hot Module Replacement (HMR)
- **Instant Updates**: Changes appear immediately
- **State Preservation**: React state is maintained
- **Fast Refresh**: Only updates changed components

### Error Overlay
- **Compile Errors**: Shows TypeScript/JavaScript errors
- **Runtime Errors**: Displays React error boundaries
- **Stack Traces**: Detailed error information

### Network Information
- **Local URL**: `http://localhost:3000`
- **Network URL**: Accessible from other devices on your network
- **Port**: Default 3000 (can be changed)

## File Structure in Browser

### Default Routes
- `/` - Home page (`src/app/page.tsx`)
- `/about` - About page (`src/app/about/page.tsx`)
- `/api/*` - API routes (`src/app/api/*`)

### Static Assets
- `/favicon.ico` - Site icon
- `/images/*` - Images from `public/images/`
- `/uploads/*` - Uploaded files from `public/uploads/`

## Development vs Production

### Development Server (`npm run dev`)
- **Fast compilation** with source maps
- **Hot reloading** for instant updates
- **Detailed error messages**
- **Development optimizations**

### Production Build (`npm run build`)
- **Optimized code** with minification
- **Tree shaking** removes unused code
- **Image optimization**
- **Performance optimizations**

## Common Development Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Port Configuration

### Default Port
- **Port**: 3000
- **URL**: `http://localhost:3000`

### Change Port
```bash
# Method 1: Environment variable
PORT=4000 npm run dev

# Method 2: Command line
npm run dev -- -p 4000
```

### Port Already in Use
If port 3000 is busy, Next.js will automatically try:
- 3001, 3002, 3003, etc.

## Development Server Troubleshooting

### Common Issues

#### 1. Port Already in Use
**Error**: `Port 3000 is already in use`
**Solutions**:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

#### 2. Node.js Not Found
**Error**: `'node' is not recognized`
**Solution**: Add Node.js to system PATH (see [01-Project-Setup.md](./01-Project-Setup.md))

#### 3. Dependencies Not Installed
**Error**: `Cannot find module`
**Solution**:
```bash
npm install
```

#### 4. TypeScript Errors
**Error**: Compilation errors in terminal
**Solution**: Fix TypeScript errors or check `tsconfig.json`

### Debugging Tips

#### 1. Check Console Output
- Look for error messages in terminal
- Check browser console for runtime errors

#### 2. Verify File Structure
- Ensure files are in correct locations
- Check import paths

#### 3. Clear Cache
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

### 1. Start Development
```bash
npm run dev
```

### 2. Open Browser
Navigate to `http://localhost:3000`

### 3. Make Changes
- Edit files in `src/`
- Save changes
- See updates in browser

### 4. Debug Issues
- Check terminal for errors
- Use browser dev tools
- Add console.log statements

### 5. Test Features
- Test all functionality
- Check responsive design
- Verify database operations

## Browser Developer Tools

### Chrome DevTools
- **Elements**: Inspect HTML/CSS
- **Console**: View logs and errors
- **Network**: Monitor API calls
- **Sources**: Debug JavaScript
- **Application**: View storage and cookies

### React Developer Tools
Install browser extension for:
- Component tree inspection
- Props and state viewing
- Performance profiling

## Performance Monitoring

### Development Metrics
- **Compilation time**: How fast code compiles
- **Hot reload speed**: How fast changes appear
- **Bundle size**: Size of JavaScript bundles

### Optimization Tips
- Use dynamic imports for large components
- Optimize images with Next.js Image component
- Minimize bundle size with tree shaking

## Next Steps

After development server setup, we:
1. ✅ Can run the website locally
2. ✅ Can see changes in real-time
3. ✅ Have debugging tools available
4. 🔄 Ready for file structure exploration (see [05-File-Structure.md](./05-File-Structure.md))

## Development Server Checklist

- [ ] Server starts without errors
- [ ] Website loads at `http://localhost:3000`
- [ ] Hot reloading works
- [ ] TypeScript compilation successful
- [ ] Tailwind CSS styles applied
- [ ] No console errors
- [ ] Ready for development
