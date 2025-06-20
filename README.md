## 🐉 NEXT-AUTH

A modern Next.js authentication and role-based access control starter, featuring Auth0, NextAuth.js, JWT, and best practices for security, SEO, and environment validation.

**🌐 [Live Demo](https://next-auth-ruddy-beta.vercel.app/)**

## 🧱 Built With

This project was built using these technologies:

- **Next.js** (with app folder routing)
- **TypeScript** (for type safe development)
- **Auth0** (for Authentication as a Service)
- **Tailwind** (for custom styling)

## 🛡️ Authentication & Role Claims

This project uses the following technologies for authentication and authorization:

- **NextAuth.js**
- **Auth0 OAuth Provider**
- **JWT**

### How Roles Are Injected

Roles are injected into the user's JWT via a custom Auth0 post-login action. This allows us to securely propagate user roles from Auth0 into our Next.js app.

#### 1. Auth0 Post-Login Action

A custom trigger is set up in Auth0 for the post-login flow. The action adds a custom claim for roles to both the ID token and access token:

```js
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://next-auth-ruddy-beta.vercel.app/claims';

  const roles = event.authorization?.roles || [];

  api.idToken.setCustomClaim(`${namespace}/roles`, roles);
  api.accessToken.setCustomClaim(`${namespace}/roles`, roles);
};
```

> ![Auth0 Post-Login Flow Diagram](https://i.ibb.co/Lhrsh1Hw/xxx.jpg)

#### 2. Consuming Roles in NextAuth.js

In the NextAuth.js `jwt` callback, we extract the roles from the Auth0 profile using the same namespace:

```ts
async jwt({ token, profile }) {
  const roles = profile?.[`${clientEnv.DEPLOYED_URL}/claims/roles`];
  if (profile && roles) {
    token.role = roles?.[0] || "user";
  }
  return token;
},
```
- The `roles` field is then attached to the JWT token and made available throughout the app session.
- This enables all downstream role-based access checks.

---

## 🧑 Ways We Are Checking Role Access

This project implements role-based access control in several ways. Below are the main strategies, with code snippets and explanations for each.

---

### 1. Through Middleware (`middleware.ts`)

We use Next.js middleware to enforce access rules globally, such as redirecting unauthorized users or protecting certain routes.  
**Middleware:**

```ts
// Redirect: non-bot clients to "/" or "/auth", depending on their session.
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

// Protected Routes.
const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });    
if (pathname.startsWith("/dashboard") && (!token || (token.role === "user" || undefined))) {
    // Redirect unauthorized users to home.
    return await protectedRedirect(req, "/");
}
```

- **`authRedirect`** and **`protectedRedirect`** are used to handle redirection based on session and role.
- This ensures only users with the right roles can access protected routes like `/dashboard`.

---

### 2. By Prop Drilling (`page.tsx` and `/dashboard/users/page.tsx`)

We pass the session (which contains the user's role) as a prop from server components to client components, where access checks are performed.

**Example: `/dashboard/users/page.tsx`**
```ts
// Essentials
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";

// Components
import CONTENT from "./content";

// Utils
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
- The `session` is fetched server-side and passed to the `CONTENT` component.
- The `CONTENT` component uses the `hasAccess` utility to conditionally render UI based on role.

---

### 3. Through RSC Layout (`/dashboard/layout.tsx`)

We use a Next.js **server component layout** to fetch the session and prop-drill it to a client-side layout, which then handles role-based UI.

**Example: `/dashboard/layout.tsx`**
```ts
// Essentials
import React, { ReactNode } from "react";
import { getServerSession, Session } from "next-auth";

// Utils
import { authOptions } from "@/lib/auth/nextauth";

// Components
import DashboardLayoutClient from "./clientLayout";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions) as NonNullable<Session>;
    return <DashboardLayoutClient session={session}>
        {children}
    </DashboardLayoutClient>;
};

export default DashboardLayout;
```
- This is a **Next.js server component layout**.
- It prop-drills the session to the client-side layout (`clientLayout.tsx`), which uses the session for role-based navigation and UI.

---

### 4. Blocking a Specific Page (`/dashboard/analytics/page.tsx`)

We block access to certain pages by checking the user's role and redirecting if they lack permission.

**Example: `/dashboard/analytics/page.tsx`**
```ts
// Essentials
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

// Components
import CONTENT from "./content";

// Utils
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
- The `hasAccess` utility checks if the user has the `"read:analytics"` permission.
- If not, the user is redirected away from the page.

---

### Utility: `hasAccess`

The `hasAccess` function is used throughout the project to check if a user's role grants them access to a specific section or action.

```ts
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
- This utility is used in both server and client components to enforce role-based access.

---

## 🚀 SEO

Each server-side page in this project uses Next.js's `generateMetadata` function for SEO. Inside, we use a custom utility called `generateServerSEO` to standardize and enhance SEO metadata across the app.

### `generateServerSEO` Interface

```ts
interface GenerateServerSEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    route?: string;
    disableIndexing?: boolean;
}
```

- **title**: Appended to the site name with a `|` prefix (e.g., `NextAuth | Page Title`).
- **description**: Used as the page meta description.
- **keywords**: Merged with global keywords for the page.
- **route**: Used to set the canonical URL and enable indexing. If not provided, indexing is turned off for the page.
- **disableIndexing**: If true, prevents the page from being indexed by search engines.

This approach ensures consistent, customizable SEO metadata for all server-rendered pages.

**Example: `/dashboard/analytics/page.tsx`**
```ts
export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Analytics",
    description: "All the analytics.",
    route: "/analytics"
  });
}
```
---
## 📁 Folder Structure
By making the best out of what **NextJS App Router** can offer from `Server` and `Client` side rendering I was able to implement **role checks**, **SEO** and any other server side render before rendering client side for each page.


```
.
├── 📁src
.   ├── 📁app
    .   ├── 📁page-name		# Each page has a folder.
        .   ├── page.tsx	# Server side rendered file.
            ├── content.tsx	# Client side rendered file.
            .
```
---
## ✔️ Zod Validation

This project uses [Zod](https://zod.dev/) to validate environment variables at runtime, ensuring that all required configuration is present and correctly formatted before the app runs.

### Why Zod?
- **Fail Fast:** By validating environment variables on startup, we catch configuration errors early—before deployment finalizes or the app goes live.
- **Type Safety:** Zod schemas provide clear, type-safe definitions for what each environment variable should look like.

### Client-Side Validation
- Defined in `src/utils/env/clientEnv.ts`
- Validates variables exposed to the browser (e.g., `NEXT_PUBLIC_*`)

```ts
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
- Defined in `src/utils/env/serverEnv.ts`
- Validates sensitive variables only available on the server

```ts
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

**Summary:**
> Using Zod for environment validation helps prevent runtime errors and misconfigurations, making deployments safer and debugging easier.

---
## 🏗️ 12Factor
This project follows the [12-Factor App](https://12factor.net/) methodology for building scalable, maintainable, and cloud-ready applications:

1. **Codebase**  
   - Single codebase tracked in Git, deployed in multiple environments (dev, prod, etc.).

2. **Dependencies**  
   - All dependencies are explicitly declared in `package.json`.
   - Uses `npm`, `yarn`, or `pnpm` for dependency management.

3. **Config**  
   - Configuration is stored in environment variables (see `.env.local`).
   - No config is hardcoded; all secrets and environment-specific values are externalized.

4. **Backing Services**  
   - Treats Auth0, databases, and other services as attached resources, referenced via environment variables.

5. **Build, Release, Run**  
   - Follows a clear separation:  
     - `npm run build` for build  
     - `npm run start` for run  
     - Environment variables and secrets are injected at runtime.

6. **Processes**  
   - Runs as stateless processes (Next.js serverless functions or Node.js processes).
   - No local state; all state is stored in external services.

7. **Port Binding**  
   - Web server binds to a port defined by the environment (default: 3000 for Next.js).

8. **Concurrency**  
   - Can be scaled horizontally by running multiple instances (supported by Vercel, Node.js, or Docker).

9. **Disposability**  
   - Fast startup and graceful shutdown (Next.js and Node.js best practices).
   - No reliance on local state, so processes can be started or stopped at any time.

10. **Dev/Prod Parity**  
    - Development, staging, and production environments are kept as similar as possible.
    - Uses the same build and run processes in all environments.

11. **Logs**  
    - Logs are written to stdout/stderr (default for Next.js/Node.js).
    - Can be aggregated by the hosting platform (e.g., Vercel, Docker, or cloud provider).

12. **Admin Processes**  
    - One-off admin tasks (like migrations or scripts) can be run using `npm run` or similar commands.

---

## 🖥️ How to run this project on your computer
To get this project up and running on your local machine, follow these steps:

1. **Prerequisites**:
   Ensure you have the following installed on your computer:
   - **Node.js** (version 14.x or later) – [Download Node.js](https://nodejs.org/)
   - **Git** – [Download Git](https://git-scm.com/)
    - **Auth0** – [Visit](https://auth0.com/)

2. **Clone the Repository**:
   Open your terminal or command prompt and run the following command to clone the repository to the folder that you're currently in:
   ```bash
   git clone https://github.com/viserionwick/next-auth.git
   ```
3. **Navigate to the Project Directory:** Change to the project directory using:
   ```bash
   cd next-auth
   ```
4. **Install Dependencies:** Install the required dependencies using your preferred package manager:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
5. **Set Up Environment Variables:** Create a `.env.local` file in the root directory and add the necessary environment variables:
   ```bash
   NEXT_PUBLIC_DEPLOYED_URL= # Website URL

   # NextAuth
   NEXTAUTH_URL= # Website URL
   NEXTAUTH_SECRET= # Create your own secret key

   # Auth0
   NEXT_PUBLIC_AUTH0_CLIENT_ID= # Auth0 Client ID
   NEXT_PUBLIC_AUTH0_ISSUER= # Auth0 Issuer
   AUTH0_CLIENT_SECRET= # Auth0 Client Secret
   ```
   You can find the **auth0** keys in your **auth0 application** settings.
6. **Run the Development Server:** Start the development server with:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
7. **Open the Application:** Once the server is running, open your web browser and go to: [http://localhost:3000](http://localhost:3000)