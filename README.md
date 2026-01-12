# Form Generator

A simple form builder app that lets you create and share forms. Build forms using drag-and-drop, generate forms with AI, and collect responses.

## Features

- Drag-and-drop form builder
- AI form generation with Google Gemini
- Share public form links
- View form responses
- Track form performance

## Tech Stack

- Next.js, React, TypeScript
- Tailwind CSS, shadcn/ui
- PostgreSQL with Drizzle ORM
- Google Gemini AI
- Kinde Authentication

## Getting Started

### What You Need

- Node.js 18 or higher
- PostgreSQL database
- Google Gemini API key
- Kinde auth account

### Setup

```bash
# Install packages
npm install

# Set up environment variables
cp .env.example .env.local
# Add your database URL, API keys, and auth credentials

# Setup database
npm run db:push

# Start the app
npm run dev
```

## Environment Variables

```
DATABASE_URL=your_postgres_database_url
GEMINI_API_KEY=your_google_gemini_key
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=your_kinde_issuer_url
```
