# ResumeBuilder Pro

## Overview

ResumeBuilder Pro is a full-featured web application for creating professional resumes and CVs. The application provides a modern, intuitive interface where users can choose from multiple templates, fill out their information through a step-by-step wizard, and export their resume as a PDF. The platform supports user authentication, real-time preview, template customization, and resume management features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: React hooks and React Query for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with structured error handling and logging middleware

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle migrations with schema definitions in TypeScript
- **Session Storage**: PostgreSQL-backed session store for user authentication
- **Data Models**: Users, templates, resumes, and resume sharing with proper relationships

### Authentication and Authorization
- **Provider**: Replit Auth with OAuth2/OpenID Connect flow
- **Session Handling**: Server-side sessions with secure HTTP-only cookies
- **User Management**: Automatic user creation/update on successful authentication
- **Route Protection**: Middleware-based authentication checks for protected endpoints

### Key Features Architecture
- **Resume Builder**: Multi-step wizard with real-time preview and form validation
- **Template System**: Flexible template rendering with customizable themes and layouts
- **PDF Generation**: Browser-based PDF export using print media queries
- **File Organization**: Monorepo structure with shared types and schemas
- **Development Experience**: Hot reload, error overlays, and TypeScript checking

## External Dependencies

### Database Services
- **Neon**: Serverless PostgreSQL database with connection pooling
- **Connection Management**: @neondatabase/serverless with WebSocket support

### Authentication Services
- **Replit Auth**: Integrated authentication system with OpenID Connect
- **Session Storage**: connect-pg-simple for PostgreSQL session persistence

### UI and Styling Libraries
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts integration (Inter, DM Sans, Fira Code, Geist Mono)

### Development and Build Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: ESBuild for production bundling
- **Development Utilities**: Replit-specific plugins for enhanced development experience
- **Process Management**: tsx for TypeScript execution in development

### Form and Data Management
- **Form Validation**: React Hook Form with Zod resolvers for schema validation
- **API Client**: TanStack React Query for server state management and caching
- **Date Handling**: date-fns for date manipulation and formatting
- **Utilities**: clsx and tailwind-merge for conditional styling