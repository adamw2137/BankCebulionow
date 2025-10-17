# Bank Cebulionów

## Overview

Bank Cebulionów is a Polish-language banking system application built with a modern React frontend and Express backend. The application provides user account management, authentication, and an administrative dashboard for managing user accounts and balances. The name suggests an educational or playful approach to banking functionality, while maintaining professional design standards for financial applications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React with TypeScript, Vite build system, and Wouter for client-side routing.

**UI Framework**: The application uses shadcn/ui component library with Radix UI primitives, providing accessible and customizable components. The design system follows Material Design principles adapted for financial applications, emphasizing trust, clarity, and proper Polish language support.

**Design System**: 
- Custom Tailwind CSS configuration with design tokens for light/dark mode
- Color palette focused on trust (deep blue primary) and financial growth (teal secondary)
- Typography using Inter font family for excellent Polish character support (ą, ć, ę, ł, ń, ó, ś, ź, ż)
- Spacing system based on Tailwind primitives (2, 4, 6, 8, 12, 16, 20, 24)

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration, including credential handling and error management.

**Form Handling**: React Hook Form with Zod schema validation for type-safe form validation.

**Routing Strategy**: Client-side routing with protected routes - separate authentication flows for regular users and administrators.

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**Session Management**: Express-session with configurable session secrets and cookie settings (httpOnly, secure in production, 24-hour expiration).

**Authentication**: Session-based authentication with separate login flows:
- User authentication via `/api/auth/login` and `/api/auth/register`
- Admin authentication via `/api/auth/admin-login` with hardcoded credentials (username: "admin", password: "admingorka")
- Session data stores `userId` and `isAdmin` flag

**Data Storage**: The application uses an in-memory storage implementation (`MemStorage` class) as the current data layer, implementing the `IStorage` interface. This provides methods for user CRUD operations (getUser, getUserByUsername, createUser, getAllUsers, updateUser).

**Schema Validation**: Drizzle-Zod integration for runtime validation of user data with PostgreSQL schema definitions ready for migration from in-memory storage.

**API Structure**:
- `/api/auth/*` - Authentication endpoints (register, login, logout, admin-login, check-admin, me)
- `/api/admin/*` - Administrative endpoints for user management

### Data Storage Solutions

**Current Implementation**: In-memory storage using Map data structure for development/testing purposes.

**Planned Database**: PostgreSQL configured via Drizzle ORM with Neon serverless driver. The database schema is defined and ready for migration:
- `users` table with id (UUID primary key), username (unique text), password (text), and balance (decimal with 10,2 precision)

**Migration Strategy**: Drizzle Kit configured for schema migrations to PostgreSQL when transitioning from in-memory to persistent storage.

### Authentication and Authorization

**User Authentication**: Password-based authentication with username/password credentials. Passwords are currently stored in plain text (security concern for production).

**Session Strategy**: Server-side sessions with Express-session middleware. Session cookies are HTTP-only and secure in production environments.

**Authorization Levels**: Two-tier access control:
1. Regular users - can view their own account dashboard and balance
2. Administrators - can view all users, edit user details, and modify account balances

**Protected Routes**: Client-side route protection using React Query to check authentication status before rendering protected components.

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives for accessible component foundations
- shadcn/ui component system with "new-york" style variant
- Lucide React for iconography

**Database & ORM**:
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connectivity
- Drizzle Kit for schema migrations

**Form & Validation**:
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integrating Zod with React Hook Form

**Development Tools**:
- Vite with React plugin for development and build
- TSX for TypeScript execution in development
- esbuild for production server bundling
- Replit-specific plugins for development experience (cartographer, dev-banner, runtime-error-modal)

**Styling**:
- Tailwind CSS with PostCSS processing
- class-variance-authority for component variant management
- clsx and tailwind-merge for className composition

**Routing & State**:
- Wouter for lightweight client-side routing
- TanStack Query v5 for server state management

**Date Handling**: date-fns for date formatting and manipulation

**Session Storage**: connect-pg-simple for PostgreSQL-backed session storage (when migrating from in-memory)