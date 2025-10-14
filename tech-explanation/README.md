# 🚀 Design Portfolio - Technical Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Setup Guide](#setup-guide)
4. [Architecture](#architecture)
5. [Component Documentation](#component-documentation)
6. [Development Workflow](#development-workflow)
7. [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

This is a **minimalistic portfolio website** built with modern web technologies. The goal is to create a responsive design showcase with an admin panel for content management.

### Key Features
- **Frontend**: Responsive grid displaying design work
- **Admin Panel**: Content management system
- **Database**: Local SQLite with easy migration to Supabase
- **Authentication**: Secure admin login system
- **File Upload**: Image management system

## 🛠 Technology Stack

### Core Technologies
- **Next.js 15.5.5** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Database ORM (Object-Relational Mapping)
- **SQLite** - Local database (easily migratable to PostgreSQL)

### Authentication & Security
- **NextAuth.js** - Authentication library
- **bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **npm** - Package manager

## 🏗 Architecture

```
design-portfolio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions
│   └── generated/prisma/    # Auto-generated Prisma client
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migration files
├── public/
│   └── uploads/             # Image storage (to be created)
├── .env                     # Environment variables
└── package.json             # Dependencies and scripts
```

## 📖 Component Documentation

- [01-Project-Setup.md](./01-Project-Setup.md) - Initial project creation
- [02-Database-Setup.md](./02-Database-Setup.md) - Prisma and SQLite configuration
- [03-Environment-Configuration.md](./03-Environment-Configuration.md) - Environment variables
- [04-Development-Server.md](./04-Development-Server.md) - Running the application
- [05-File-Structure.md](./05-File-Structure.md) - Project organization
- [06-Troubleshooting.md](./06-Troubleshooting.md) - Common issues and solutions

## 🔄 Development Workflow

### Daily Development
1. Start development server: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Make changes to code
4. See live updates in browser

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run migration: `npx prisma migrate dev --name description`
3. Regenerate client: `npx prisma generate`

### Adding Dependencies
```bash
npm install package-name
npm install -D package-name  # For dev dependencies
```

## 🚨 Troubleshooting

### Common Issues
- **Node.js not found**: Add to system PATH
- **Database errors**: Check `.env` file
- **Build failures**: Check TypeScript errors

See [06-Troubleshooting.md](./06-Troubleshooting.md) for detailed solutions.

---

**Next Steps**: Read the individual component documentation files to understand each part of the system.
