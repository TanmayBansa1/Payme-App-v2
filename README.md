# PayMe - Digital Wallet Application

A modern digital wallet application built with Next.js, TypeScript, and Prisma, featuring real-time transactions, authentication, and a clean UI.

## Features

### User Features
- 💳 Add Money via Bank Transfer, uses dummy bank api to get the token
  - Support for multiple banks (SBI, HDFC)
  - Real-time transaction status
- 💸 P2P Money Transfer
  - Transfer to phone number or email
  - Instant transfer between users
- 📊 Transaction History
  - View all transactions (deposits and transfers)
  - Real-time status updates
- 🔒 Multi-provider Authentication
  - Phone Number + Password
  - Google OAuth
  - GitHub OAuth
- 💰 Balance Management
  - View current balance
  - Track locked and unlocked funds
  - Real-time balance updates

### Technical Stack
- 🏗️ Monorepo with Turborepo
- ⚛️ Next.js 14 with App Router
- 🔄 Server Actions for API endpoints
- 🗃️ PostgreSQL with Prisma ORM
- 🔑 NextAuth.js for authentication
- 🎨 TailwindCSS for styling
- 📦 Shared UI component library

## Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm (recommended)

### Step 1: Clone and Install
```bash
git clone <repository-url>
cd payme
npm install
```

### Step 2: Environment Setup
Create `.env` in `apps/user-app`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/payme"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Step 3: Database Setup
```bash
cd packages/db
npm prisma generate
npm prisma db push
```

### Step 4: Start Development
```bash
# From root directory
npm dev
```

The app will be available at:
- User App: `http://localhost:3000`
- Merchant App: `http://localhost:3001`
- Bank Webhook Handler: `http://localhost:3002`

## Project Structure
```
├── apps/
│   ├── user-app/          # Main user application
│   ├── merchant-app/      # Merchant dashboard
│   └── bank_webhook_handler/ # Payment webhook processor
├── packages/
│   ├── ui/               # Shared UI components
│   ├── db/               # Database and Prisma schema
│   └── eslint-config/    # Shared ESLint configuration
```

## Key Components
- `AppbarClient`: Navigation and authentication UI
- `P2P`: Peer-to-peer transfer interface
- `Transactions`: Transaction history display
- `ShowBalance`: Balance display component
- `Addmoney`: Bank deposit interface

## Environment Variables
Required variables in `.env`:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Authentication callback URL
- `NEXTAUTH_SECRET`: Session encryption key
- OAuth credentials for Google and GitHub

## Development Commands
```bash
# Start development servers
npm dev

# Build all apps
npm build

# Run type checking
npm check-types

# Run linting
npm lint
```


