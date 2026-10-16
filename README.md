# Masari

**From where you are to where you want to be — one meaningful step at a time.**

Masari is an AI-powered career planning full-stack app that helps learners turn their career goals into actionable learning paths. Share your target role, current experience, existing skills, available study time, and preferred learning style. Masari uses this information to generate an ordered learning path with estimated time commitments and links to relevant learning resources.

## Contents

- [Features](#features)
- [How it works](#how-it-works)
- [Live Demo](#live-demo)
- [Technology](#technology)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Data and persistence](#data-and-persistence)
- [Team](#team)

## Features

- **Personalized career profile:** Describe your target role, current level, background, existing skills, relevant experience, motivation, weekly availability, target timeframe, and learning preference.
- **AI-generated learning paths:** Generate a sequence of 3–10 focused steps tailored to your profile.
- **Curated learning resources:** Explore courses, articles, videos, and documentation relevant to each learning step.
- **Learning path details:** Expand each step to view its description, why it matters, estimated time, and suggested resources.
- **Progress tracking:** Mark individual steps as complete or incomplete and view your completion percentage and learning record.
- **Google and GitHub sign-in:** Authenticate to save paths for later access.
- **Responsive interface:** Use Masari on desktop and mobile screens.

## How it works

1. Start from the home page and press **Map my career path**.
2. Complete the four profile sections:
   - **Destination:** your target role and current level.
   - **Starting point:** your background and existing skills.
   - **Your context:** relevant experience and why your career goal matters to you.
   - **Learning mode:** your weekly study hours, desired timeframe, and learning preference.
3. Masari validates the required profile fields and sends your information to the learning-path API.
4. The server asks Google Gemini to produce a structured learning plan, validates the response, and checks resource links.
5. Review your ordered learning steps, explore recommended resources, and mark steps complete as you progress.

## Live Demo

Try Masari: [Open the live application](https://v62-tier2-team-22.vercel.app/)

## Technology

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [NextAuth.js](https://authjs.dev/) for Google and GitHub OAuth
- [Google Gen AI SDK](https://ai.google.dev/gemini-api/docs) for Gemini-powered path generation
- [Prisma](https://www.prisma.io/) 7 with PostgreSQL and the `pg` adapter
- [Zod](https://zod.dev/) for request and response validation
- [Lucide](https://lucide.dev/) icons and [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for the completion celebration

## Getting started

Follow these instructions to run Masari locally.

### Prerequisites

- Node.js **20.9 or later**
- npm
- A PostgreSQL database
- A Gemini API key
- Google and/or GitHub OAuth credentials if you want to test sign-in

### Setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/chingu-voyages/V62-tier2-team-22.git
   cd V62-tier2-team-22
   ```

2. Create your local environment file **before installing dependencies**. Prisma's post-install generation reads the Prisma configuration and environment:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env`.

3. Edit `.env` and provide the values described in [Environment variables](#environment-variables).

4. Install dependencies. The `postinstall` script generates the Prisma client:

   ```bash
   npm install
   ```

5. Create or update the database table from the Prisma schema:

   ```bash
   npx prisma db push
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000).

To run the production build locally after building, use:

```bash
npm run build
npm run start
```

### OAuth callback URLs

When configuring Google or GitHub OAuth for local development, add the callback URL for each provider you enable:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

For a deployed environment, register the equivalent callback URLs for that application's public origin.

## Environment variables

Copy `.env.example` to `.env`, then replace its placeholders with credentials and connection details for your own services.

| Variable             | Required for            | Description                                                                                                  |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| `DATABASE_URL`       | App data access         | PostgreSQL connection string used by the application through the `pg` adapter.                               |
| `DIRECT_URL`         | Prisma schema setup     | Direct/session-mode PostgreSQL connection string used by Prisma commands such as `prisma db push`.           |
| `DATABASE_PASSWORD`  | Connection string setup | The sample file's password placeholder; use your database password when constructing the connection strings. |
| `GEMINI_API_KEY`     | Path generation         | API key for the Google Gemini service.                                                                       |
| `AUTH_SECRET`        | Authentication          | Secret used by Auth.js/NextAuth to protect authentication tokens and sessions.                               |
| `AUTH_GOOGLE_ID`     | Google sign-in          | OAuth client ID from your Google OAuth configuration.                                                        |
| `AUTH_GOOGLE_SECRET` | Google sign-in          | OAuth client secret from your Google OAuth configuration.                                                    |
| `AUTH_GITHUB_ID`     | GitHub sign-in          | OAuth client ID from your GitHub OAuth application.                                                          |
| `AUTH_GITHUB_SECRET` | GitHub sign-in          | OAuth client secret from your GitHub OAuth application.                                                      |

Google and GitHub credentials are only needed for the providers you intend to use. Database access and a Gemini API key are needed for the full path-generation and persistence workflow.

Generate a fresh `AUTH_SECRET` value locally with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Use the PostgreSQL connection strings provided by your database host. The sample `.env.example` distinguishes the application connection (`DATABASE_URL`) from the direct/session connection used for Prisma schema operations (`DIRECT_URL`).

## Available scripts

| Command               | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`         | Start the Next.js development server.                                         |
| `npm run build`       | Create a production build.                                                    |
| `npm run start`       | Serve the production build. Run `npm run build` first.                        |
| `npm run lint`        | Run ESLint using the Next.js Core Web Vitals and TypeScript configurations.   |
| `npm run postinstall` | Generate the Prisma client; this also runs automatically after `npm install`. |
| `npx prisma db push`  | Apply the Prisma schema to the configured PostgreSQL database.                |

## Data and persistence

Masari stores each learning path with its ID, creation date, completion status, original profile, and ordered learning steps. The Prisma model is `LearningPath`; profile and step details are stored as JSON.

- **Guests:** the active path is stored in `sessionStorage` and is available during the current browser tab's session.
- **Signed-in users:** paths are stored in browser `localStorage` and written to PostgreSQL. Completion updates are saved to the browser and, for signed-in users, synchronized to the database.
- **Authentication:** NextAuth uses JWT sessions and Google/GitHub providers.

The database schema is defined in [`prisma/schema.prisma`](./prisma/schema.prisma). The app uses `DATABASE_URL` for its PostgreSQL adapter and Prisma's `DIRECT_URL` for schema commands.

## Team

- **Raghad Sharaf** — Primary Product Owner: [GitHub](https://github.com/Raghad-Sharaf) · [LinkedIn](https://linkedin.com/in/raghad-sharaf)
- **Anas Ahmad** — Web developer: [GitHub](https://github.com/martiNik2)
- **Mayar Waleed Nawas** — Web developer: [GitHub](https://github.com/myarnwas) · [LinkedIn](https://www.linkedin.com/in/mayar-waleed-nawas/)
- **Fouad Adel ALShami** — Web developer: [GitHub](https://github.com/itsfouad1) · [LinkedIn](https://www.linkedin.com/in/fouad-shami04/)
- **Deema Wazwaz** — UI/UX designer: [GitHub](https://github.com/deemawazwaz) · [LinkedIn](https://www.linkedin.com/in/deema-wazwaz-0a7b272b3/)
