import { notFound } from 'next/navigation';
import React from 'react';

export default function GenePage({ params }) {
  const { symbol } = React.use(params);
  // const symbol = decodeURIComponent(sym).toUpperCase();

  // Optional: Validate the symbol format
  const isValidSymbol = /^[A-Z0-9\-]+$/.test(symbol);
  if (!isValidSymbol) {
    return notFound(); // returns 404 page if invalid
  }

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Gene Search Result</h1>
      <p className='text-lg'>
        Search results for <strong>{symbol}</strong>
      </p>
      <p className='font-medium mt-2'>
        We couldn't find any results matching the search criteria
      </p>
    </main>
  );
}
