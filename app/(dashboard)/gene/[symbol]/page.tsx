'use client';

import React, { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useGene } from '@/hooks/useGene';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import GeneExpressionPlot from '@/components/plot/gene-expression-plot';
import { Button } from '@/components/ui/button';

interface GenePageProps {
  params: Promise<{ symbol: string }>;
}

export default function GenePage({ params }: GenePageProps) {
  const { symbol: rawSymbol } = React.use(params);
  const router = useRouter();
  const symbol = decodeURIComponent(rawSymbol).toUpperCase();

  const { data: gene, isLoading, isError, error } = useGene(symbol);

  useEffect(() => {
    // Redirect if error includes 404
    if (isError && (error as Error).message.includes('404')) {
      notFound();
    }
  }, [isError, error]);

  // Validate symbol after hooks are called
  if (!/^[A-Z0-9-]+$/.test(symbol)) {
    return notFound();
  }

  if (isLoading) {
    return (
      <main className='p-6 flex items-center justify-center min-h-screen'>
        <p className='text-lg text-gray-500'>Loading gene data...</p>
      </main>
    );
  }

  if (isError || !gene) {
    return (
      <main className='p-6 flex items-center justify-center min-h-screen'>
        <div>
          <p className='text-red-600'>
            Search Results: {(error as Error)?.message || 'Unknown error'}
          </p>

          <Button
            className='mt-4 px-4 py-1 cursor-pointer text-white rounded '
            onClick={() => router.push('/')}
          >
            Go Back
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className='p-6 w-full mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {gene.symbol} — {gene.name}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <dl className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4'>
            <div>
              <dt className='font-semibold'>HGNC ID</dt>
              <dd>{gene.hgnc_id ?? 'N/A'}</dd>
            </div>
            <div>
              <dt className='font-semibold'>Ensembl ID</dt>
              <dd>{gene?.ensembl_id.length === 0 ? 'N/A' : gene.ensembl_id}</dd>
            </div>
            <div>
              <dt className='font-semibold'>Entrez ID</dt>
              <dd>{gene.entrez_id.length === 0 ? 'N/A' : gene.entrez_id}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <GeneExpressionPlot symbol={symbol} />
    </main>
  );
}
