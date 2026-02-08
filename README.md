# Recipe App

A modern recipe browsing application built with Next.js 16, featuring user authentication, recipe search, filtering, and favorites functionality.

## Features

- User authentication system with login/logout
- Browse recipes with infinite scrolling
- Filter recipes by meal type, sort by various criteria
- Search recipes by name
- Mark recipes as favorites (persists locally)
- Responsive design for all device sizes
- Protected routes for authenticated users

## Dependencies

### Production Dependencies
- `next` (v16.1.3) - React framework for production
- `react` (v19.2.3) - JavaScript library for building user interfaces
- `react-dom` (v19.2.3) - React package for working with the DOM
- `axios` (v1.13.5) - Promise based HTTP client
- `zustand` (v5.0.10) - Bear necessities for state management in React
- `react-hook-form` (v7.71.1) - Performant, flexible forms with easy validation
- `zod` (v4.3.6) - TypeScript-first schema declaration and validation library
- `@hookform/resolvers` (v5.2.2) - Resolvers for react-hook-form
- `lucide-react` (v0.562.0) - Beautiful & consistent icon toolkit
- `tailwind-merge` (v3.4.0) - Merge Tailwind CSS classes without conflicts
- `class-variance-authority` (v0.7.1) - Create reusable, composable utility classes
- `clsx` (v2.1.1) - Tiny utility for constructing className strings
- `motion` (v12.33.0) - Motion library for React
- `@radix-ui/react-*` - Accessible UI primitives

### Development Dependencies
- `typescript` (v5) - JavaScript with syntax for types
- `tailwindcss` (v4) - Utility-first CSS framework
- `@tailwindcss/postcss` (v4) - PostCSS plugin for Tailwind CSS
- `eslint` (v9) - JavaScript/TypeScript linter
- `@types/react` (v19) - TypeScript definitions for React
- `@types/node` (v20) - TypeScript definitions for Node.js
- `vitest` (v4.0.18) - Next generation testing framework
- `@testing-library/react` (v16.3.2) - Simple and complete React DOM testing utilities
- `@vitejs/plugin-react` (v5.1.3) - React plugin for Vite

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Running Tests

```bash
# Run all tests once
npm run test
# or
yarn test
# or
pnpm test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch

# Run tests with UI
npm run test:ui
# or
yarn test:ui
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (private)/       # Protected routes (authenticated users)
│   └── (public)/        # Public routes (login page)
├── components/          # Reusable UI components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── shared/             # Shared types and utilities
└── store/              # Zustand stores for state management
```

## Authentication

The application uses a token-based authentication system:
- Login with username/password
- Session persistence using cookies
- Automatic token refresh
- Protected routes that require authentication

Default credentials for testing:
- Username: `emilys`
- Password: `emilyspass`

## API Integration

The application integrates with the [DummyJSON API](https://dummyjson.com/) for recipe data, providing:
- Recipe browsing with pagination
- Recipe search functionality
- Recipe details view
- Meal type filtering