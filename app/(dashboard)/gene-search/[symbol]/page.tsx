import { notFound } from 'next/navigation';

interface GenePageProps {
  params: {
    symbol: string;
  };
}

export default function GenePage({ params }: GenePageProps) {
  const symbol = decodeURIComponent(params.symbol).toUpperCase();

  // Optional: Validate the symbol format
  const isValidSymbol = /^[A-Z0-9\-]+$/.test(symbol);
  if (!isValidSymbol) {
    return notFound(); // returns 404 page if invalid
  }

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Gene Search Result</h1>
      <p className='text-lg'>
        You searched for: <strong>{symbol}</strong>
      </p>
    </main>
  );
}
