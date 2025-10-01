# Next.js Authentication & Authorization Starter

A production-ready Next.js authentication and role-based access control (RBAC) starter template featuring Auth0 integration, NextAuth.js, JWT-based authorization, and comprehensive security best practices.

**Live Demo:** [https://next-auth-two-jet.vercel.app/](https://next-auth-two-jet.vercel.app/)

---

## Table of Contents

- [Technology Stack](#technology-stack)
- [Authentication & Authorization](#authentication--authorization)
- [Role-Based Access Control Implementation](#role-based-access-control-implementation)
- [SEO Configuration](#seo-configuration)
- [Project Structure](#project-structure)
- [Environment Validation](#environment-validation)
- [12-Factor App Compliance](#12-factor-app-compliance)
- [Installation & Setup](#installation--setup)
- [License](#license)

---

## Technology Stack

This project is built with modern web technologies optimized for security, performance, and developer experience:

- **Next.js** - React framework with App Router architecture
- **TypeScript** - Type-safe development environment
- **Auth0** - Authentication as a Service (AaaS) provider
- **NextAuth.js** - Authentication library for Next.js
- **Tailwind CSS** - Utility-first CSS framework

---

## Authentication & Authorization

### Core Technologies

- **NextAuth.js** - Session management and authentication flows
- **Auth0 OAuth Provider** - Identity provider and user management
- **JWT (JSON Web Tokens)** - Secure token-based authentication

### Role Injection Mechanism

User roles are securely injected into JWT tokens via a custom Auth0 post-login action, enabling seamless role propagation from Auth0 to the Next.js application.

#### Auth0 Post-Login Action

A custom trigger executes after successful authentication to add role claims to both ID and access tokens:

```javascript
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://next-auth-two-jet.vercel.app/claims';
  const roles = event.authorization?.roles || [];

  api.idToken.setCustomClaim(`${namespace}/roles`, roles);
  api.accessToken.setCustomClaim(`${namespace}/roles`, roles);
};
```

#### NextAuth.js JWT Callback

Roles are extracted from the Auth0 profile and attached to the session token:

```typescript
async jwt({ token, profile }) {
  const roles = profile?.[`${clientEnv.DEPLOYED_URL}/claims/roles`];
  if (profile && roles) {
    token.role = roles?.[0] || "user";
  }
  return token;
}
```

This mechanism ensures that role information is consistently available throughout the application session for authorization checks.

---

## Role-Based Access Control Implementation

This application implements RBAC using multiple strategies to ensure comprehensive security coverage across different architectural layers.

### 1. Middleware-Level Protection

Next.js middleware provides global route protection and automatic redirects based on authentication status and user roles.

**Implementation (`middleware.ts`):**

```typescript
// Session-based routing
if (!isBot) {
    if (pathname.startsWith("/auth")) {
        const userToRedirect = await authRedirect(req, "/");
        if (userToRedirect) return userToRedirect;
    }
    if (pathname.startsWith("/") && !pathname.startsWith("/auth")) {
        const userToRedirect = await authRedirect(req, "/auth", false);
        if (userToRedirect) return userToRedirect;
    }
}

// Role-based route protection
const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });    
if (pathname.startsWith("/dashboard") && (!token || (token.role === "user" || undefined))) {
    return await protectedRedirect(req, "/");
}
```

### 2. Server Component Prop Drilling

Session data is fetched server-side and passed to client components for role-based rendering.

**Example (`/dashboard/users/page.tsx`):**

```typescript
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
import CONTENT from "./content";
import { generateServerSEO } from "@/utils/generateServerSEO";
import { authOptions } from "@/lib/auth/nextauth";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Users",
    description: "All the users.",
    route: "/users"
  });
}

const USERS = async () => {
  const session = await getServerSession(authOptions) as NonNullable<Session>;
  return <CONTENT session={session}/>
}

export default USERS;
```

### 3. Layout-Level Authorization

Server component layouts fetch session data and propagate it to client layouts for consistent role-based UI rendering.

**Example (`/dashboard/layout.tsx`):**

```typescript
import React, { ReactNode } from "react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth/nextauth";
import DashboardLayoutClient from "./clientLayout";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions) as NonNullable<Session>;
    return <DashboardLayoutClient session={session}>
        {children}
    </DashboardLayoutClient>;
};

export default DashboardLayout;
```

### 4. Page-Level Access Control

Individual pages implement fine-grained access control with automatic redirects for unauthorized access attempts.

**Example (`/dashboard/analytics/page.tsx`):**

```typescript
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import CONTENT from "./content";
import { generateServerSEO } from "@/utils/generateServerSEO";
import { authOptions } from "@/lib/auth/nextauth";
import { hasAccess } from "@/utils/auth/checkAccess";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Analytics",
    description: "All the analytics.",
    route: "/analytics"
  });
}

const ANALYTICS = async () => {
  const session = await getServerSession(authOptions) as NonNullable<Session>;
  if (hasAccess(session, "read:analytics"))
    return <CONTENT />
  else redirect("/dashboard")
}

export default ANALYTICS;
```

### Access Control Utility

The `hasAccess` function provides centralized permission checking logic used throughout the application.

```typescript
export const hasAccess = (session: Session, section: string): boolean => {
    const role = session?.user?.role;
    if (!role) return false;
    
    const roleMap: Record<string, string[]> = {
        admin: [
            "read:dashboard",
            "read:users",
            "read:analytics",
            "edit:users",
            "edit:blog_posts",
            "read:blog_posts",
            "assign:roles"
        ],
        moderator: [
            "read:dashboard",
            "read:users",
            "read:blog_posts",
            "edit:users",
            "assign:roles"
        ],
        editor: [
            "edit:blog_posts",
            "read:blog_posts",
            "read:dashboard",
            "read:users"
        ],
    };

    return roleMap[role]?.includes(section);
};
```

---

## SEO Configuration

All server-rendered pages implement Next.js's `generateMetadata` function with a custom `generateServerSEO` utility for standardized SEO metadata management.

### SEO Configuration Interface

```typescript
interface GenerateServerSEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    route?: string;
    disableIndexing?: boolean;
}
```

**Parameter Descriptions:**

- **title**: Appended to site name (format: `NextAuth | Page Title`)
- **description**: Page meta description for search engines
- **keywords**: Merged with global keywords
- **route**: Canonical URL path; required for indexing
- **disableIndexing**: Explicitly prevents search engine indexing

**Example Usage:**

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Analytics",
    description: "All the analytics.",
    route: "/analytics"
  });
}
```

---

## Project Structure

The application leverages Next.js App Router architecture with clear separation between server and client rendering:

```
.
├── src
│   ├── app
│   │   ├── [page-name]
│   │   │   ├── page.tsx       # Server-side rendered entry point
│   │   │   ├── content.tsx    # Client-side component
│   │   │   └── ...
```

This structure enables:
- Server-side role verification before client rendering
- Optimized SEO through server-side metadata generation
- Clear separation of server and client concerns

---

## Environment Validation

This project uses [Zod](https://zod.dev/) for runtime validation of environment variables, ensuring configuration correctness before application startup.

### Benefits

- **Fail-Fast Behavior**: Configuration errors are caught immediately during startup
- **Type Safety**: Schema-based validation provides compile-time and runtime type checking
- **Clear Error Messages**: Specific validation errors for missing or malformed variables

### Client-Side Validation

**Location:** `src/utils/env/clientEnv.ts`

Validates browser-exposed environment variables (prefixed with `NEXT_PUBLIC_`):

```typescript
import z from "zod";

const clientEnvSchema = z.object({
    DEPLOYED_URL: z.string().min(1),
    AUTH0_CLIENT_ID: z.string().min(1),
    AUTH0_ISSUER: z.string().min(1),
});

export const clientEnv = clientEnvSchema.parse({
    DEPLOYED_URL: process.env.NEXT_PUBLIC_DEPLOYED_URL,
    AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    AUTH0_ISSUER: process.env.NEXT_PUBLIC_AUTH0_ISSUER,
});
```

### Server-Side Validation

**Location:** `src/utils/env/serverEnv.ts`

Validates sensitive server-only environment variables:

```typescript
import z from "zod";

const serverEnvSchema = z.object({
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    AUTH0_CLIENT_SECRET: z.string().min(1),
});

export const serverEnv = serverEnvSchema.parse({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
});
```

---

## 12-Factor App Compliance

This application adheres to the [12-Factor App](https://12factor.net/) methodology for building scalable, maintainable, cloud-native applications:

### 1. Codebase
Single codebase tracked in version control, deployed across multiple environments.

### 2. Dependencies
All dependencies explicitly declared in `package.json` and managed via npm/yarn/pnpm.

### 3. Config
Environment-specific configuration externalized through environment variables; no hardcoded secrets.

### 4. Backing Services
External services (Auth0, databases) treated as attached resources referenced via environment variables.

### 5. Build, Release, Run
Clear separation between build (`npm run build`), release (environment injection), and run (`npm run start`) stages.

### 6. Processes
Stateless execution model; all state externalized to backing services.

### 7. Port Binding
Self-contained web server binding to environment-defined ports (default: 3000).

### 8. Concurrency
Horizontal scaling supported through process model (compatible with Vercel, Docker, Node.js clusters).

### 9. Disposability
Fast startup and graceful shutdown; stateless processes enable dynamic scaling.

### 10. Dev/Prod Parity
Minimal differences between development, staging, and production environments.

### 11. Logs
Structured logging to stdout/stderr for aggregation by hosting platform.

### 12. Admin Processes
One-off administrative tasks executed via npm scripts or command-line utilities.

---

## Installation & Setup

### Prerequisites

- **Node.js** v14.x or later ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Auth0 Account** ([Sign Up](https://auth0.com/))

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/viserionwick/next-auth.git
   ```

2. **Navigate to project directory:**

   ```bash
   cd next-auth
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Configure environment variables:**

   Create a `.env.local` file in the project root:

   ```bash
   # Application URL
   NEXT_PUBLIC_DEPLOYED_URL=http://localhost:3000

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret-key

   # Auth0 Configuration
   NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
   NEXT_PUBLIC_AUTH0_ISSUER=your-auth0-issuer-url
   AUTH0_CLIENT_SECRET=your-auth0-client-secret
   ```

   **Note:** Auth0 credentials can be found in your Auth0 application settings dashboard.

5. **Start development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Access the application:**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## Additional Resources

### Auth0 Configuration

For detailed Auth0 setup instructions, refer to the [Auth0 Documentation](https://auth0.com/docs).

### Next.js App Router

Learn more about Next.js App Router architecture in the [official Next.js documentation](https://nextjs.org/docs).

### NextAuth.js

For advanced authentication patterns, consult the [NextAuth.js documentation](https://next-auth.js.org/).
