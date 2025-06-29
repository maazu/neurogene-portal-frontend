# Neurogene Portal Frontend

Neurogene is a web-based frontend interface built with Next.js and styled using shadcn/ui. It allows users to explore how gene expression changes throughout human brain development, powered by data from the BrainVar project.

This frontend is designed to interact with a Django-based backend API, which generates LOESS-smoothed gene expression plots as downloadable PDFs.

🚀 Features
🔎 Gene Search Interface
Enter a gene symbol (e.g., SCN2A, SYNGAP1) to explore expression trends.

📉 Smooth PDF Plot Download
Visualizations are served as downloadable PDF files via the API.

🎨 Modern UI
Built with shadcn/ui, offering a responsive, clean, and accessible interface.

🌐 Fast & SEO-Friendly
Leveraging the power of Next.js for fast, server-rendered React apps.

## 🧰 Tech Stack

| Tool       | Description                         |
|------------|-------------------------------------|
| [Next.js](https://nextjs.org/) | React framework for SSR and routing |
| [shadcn/ui](https://ui.shadcn.com/) | Modern, themeable UI components |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS styling |
| [TypeScript](https://www.typescriptlang.org/) | Static typing for JavaScript |
| [Axios](https://axios-http.com/) | Promise-based HTTP client for API calls |



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
