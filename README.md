# 🎨 Ruben Portfolio

A modern, responsive design portfolio built with Next.js, featuring a beautiful grid layout, secure admin panel, and file upload functionality.

## 🚀 Features

- **Responsive Design Grid**: Beautiful portfolio display with hover effects
- **Secure Admin Panel**: Protected upload functionality with authentication
- **File Upload System**: Upload and manage design images
- **Database Integration**: SQLite database with Prisma ORM
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom admin authentication
- **File Handling**: Formidable for file uploads

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ruben_portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ruben_portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   └── page.tsx        # Home page
│   └── components/         # React components
├── prisma/                 # Database schema
├── public/uploads/         # Uploaded images
└── tech-explanation/       # Documentation
```

## 🔐 Admin Access

- **URL**: `/admin`
- **Credentials**: Contact administrator for login details
- **Features**: Upload designs, manage portfolio content

## 📚 Documentation

Comprehensive documentation is available in the `tech-explanation/` directory:

- [Complete Setup Summary](./tech-explanation/00-Complete-Setup-Summary.md)
- [Project Setup Guide](./tech-explanation/01-Project-Setup.md)
- [Database Configuration](./tech-explanation/02-Database-Setup.md)
- [Environment Setup](./tech-explanation/03-Environment-Configuration.md)
- [Development Server](./tech-explanation/04-Development-Server.md)
- [File Structure](./tech-explanation/05-File-Structure.md)
- [Troubleshooting](./tech-explanation/06-Troubleshooting.md)
- [Progress Roadmap](./tech-explanation/PROGRESS-ROADMAP.md)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
