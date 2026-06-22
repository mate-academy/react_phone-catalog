# Nice Gadgets

A modern e-commerce store for phones, tablets, and accessories — built with Next.js and powered by an AI-driven shopping assistant that helps users find the perfect gadget.

## Live Preview

[DEMO Link](https://nice-gadgets-frontend-nextjs.vercel.app)

## Design Reference

[Figma Design](https://www.figma.com/design/WMdJ24eHk4EkSr25mrt7Y2/Phone-catalog--V2--Original-Dark)

## Technologies Used

- **Next.js 15** — App Router, Server Components, API Routes
- **React 19** — UI layer
- **TypeScript** — Type safety across the entire codebase
- **Tailwind CSS** — Utility-first styling
- **Supabase** — Database, authentication, and file storage
- **Google Gemini AI** (`@ai-sdk/google`) — AI-powered chat assistant
- **Vercel AI SDK** — Streaming AI responses
- **Zustand** — Client-side state management (cart, favorites, recently viewed)
- **Base UI** — Accessible UI primitives

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nice-gadgets.git
cd nice-gadgets
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
```

### 4. Run the project locally

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Product catalog** — Browse phones, tablets, and accessories with detailed pages for each item
- **Shopping cart** — Add products and manage quantities, persisted across sessions
- **Favorites** — Save products to a wishlist for later
- **Recently viewed** — Automatically tracks and displays browsed products
- **AI shopping assistant** — Chat widget powered by Google Gemini that answers questions about the product catalog in real time
- **Authentication** — User login and profile via Supabase Auth
- **Admin panel** — Add and manage products with image uploads to Supabase Storage
- **Multi-language support** — UI translations for multiple languages
- **Multi-currency** — Live currency conversion with rates fetched from an external API
- **Dark / Light mode** — Theme toggle with `next-themes`
- **Search** — Search across the product catalog
