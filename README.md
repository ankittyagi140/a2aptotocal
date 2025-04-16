# A2A Protocol Directory

The central hub for discovering, listing, and comparing A2A (Agent-to-Agent) protocols. Find and share protocols that enable AI agents to communicate with each other across enterprise platforms.

## Features

- Protocol submission form
- Protocol browsing with search and filter capabilities
- Responsive design for all devices
- Tag-based filtering
- Supabase database integration

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Supabase account (free tier is sufficient)

### Supabase Setup

1. Create a new project in [Supabase](https://supabase.com/).
2. After creating the project, navigate to the SQL Editor.
3. Copy the contents of the `supabase-setup.sql` file from this project.
4. Paste and run the SQL commands in the Supabase SQL Editor to set up the database schema.
5. Go to Project Settings > API and copy the following:
   - Project URL
   - Project API Key (anon public)

### Local Development Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/a2a-protocol-directory.git
   cd a2a-protocol-directory
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

- `src/app/page.tsx` - Home page with the protocol submission form
- `src/app/browse/page.tsx` - Protocol browsing page
- `src/utils/supabase.ts` - Supabase client configuration
- `src/types/protocol.ts` - TypeScript interfaces for protocol data
- `public/` - Static assets including images and favicon

## Deployment

This project can be easily deployed on Vercel or any other Next.js-compatible hosting platform:

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Add your environment variables (Supabase URL and API Key).
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
