'use client';

import React, { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useGene } from '@/hooks/useGene';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import GeneExpressionPlot from '@/components/plot/gene-expression-plot';

interface GenePageProps {
  params: Promise<{ symbol: string }>;
}

export default function GenePage({ params }: GenePageProps) {
  // Unwrap params promise using React.use()
  const { symbol: rawSymbol } = React.use(params);

  //   Decode and normalize symbol
  const symbol = decodeURIComponent(rawSymbol).toUpperCase();

  // Validate symbol format (uppercase letters, numbers, hyphens)
  if (!/^[A-Z0-9-]+$/.test(symbol)) {
    return notFound();
  }

  const {
    data: gene,
    isLoading,
    isError,
    error,
  } = useGene(symbol, {
    retry: false,
    staleTime: 1000 * 60 * 10,
    queryKey: [],
  });

  // If API returns 404 or not found, show 404 page
  useEffect(() => {
    if (isError && (error as Error).message.includes('404')) {
      notFound();
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <main className='p-6 flex items-center justify-center min-h-screen'>
        {/* <Spinner size='lg' /> */}
      </main>
    );
  }

  if (isError || !gene) {
    return (
      <main className='p-6'>
        <p className='text-red-600'>
          Error loading gene details:{' '}
          {(error as Error)?.message || 'Unknown error'}
        </p>
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
          {gene.description && (
            <p className='text-gray-700'>{gene.description}</p>
          )}

          <dl className='grid grid-cols-3 gap-x-6 gap-y-4'>
            {/* <div>
              <dt className='font-semibold'>Gene ID</dt>
              <dd>{gene.id}</dd>
            </div> */}
            <div>
              <dt className='font-semibold'>HGNC ID</dt>
              <dd>{gene.hgnc_id ?? 'N/A'}</dd>
            </div>
            <div>
              <dt className='font-semibold'>Ensembl ID</dt>
              <dd>{gene.ensembl_id.length == 0 ? 'N/A' : gene.ensembl_id}</dd>
            </div>
            <div>
              <dt className='font-semibold'>Entrez ID</dt>
              <dd>{gene.entrez_id.length == 0 ? 'N/A' : gene.entrez_id}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <GeneExpressionPlot symbol={symbol} />
    </main>
  );
}
