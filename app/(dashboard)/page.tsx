'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import debounce from 'lodash.debounce';

interface Gene {
  id: string;
  symbol: string;
  name: string;
}

interface ApiResponse {
  results: Gene[];
  total: number;
}

const fetchGeneSuggestions = async (q: string): Promise<Gene[]> => {
  if (q.length < 0) return [];
  const res = await fetch(
    `http://localhost:8000/api/gene-engine/gene/?symbol__istartswith=${encodeURIComponent(
      q
    )}`
  );
  if (!res.ok) throw new Error('Failed to fetch gene suggestions');
  const json: ApiResponse = await res.json();
  return Array.isArray(json.results) ? json.results : [];
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  interface Gene {
    id: string;
    symbol: string;
    name: string;
  }

  // Debounce updating debouncedQuery
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    handler();
    return () => {
      handler.cancel();
    };
  }, [query]);

  // Fetch suggestions via React Query
  const {
    data: suggestions = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ['geneSuggestions', debouncedQuery],
    queryFn: () => fetchGeneSuggestions(debouncedQuery),
    enabled: debouncedQuery.length > 1,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  // Hide dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSuggestionClick = (symbol: string) => {
    setQuery(symbol);
    setIsDropdownVisible(false);
    router.push(`/gene/${symbol}`);
  };

  return (
    <main className='min-h-screen bg-gradient-to-r flex flex-col items-center justify-start p-4'>
      {/* Header / Breadcrumb */}
      <nav className='w-full max-w-2xl text-white text-sm mb-6'>
        <a href='#' className='underline'>
          Neurogene Search
        </a>{' '}
        &gt; <span className='font-semibold'>Advanced search</span>
      </nav>

      {/* Search Card */}
      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl text-center'>
        <h2 className='text-sm text-gray-600 mb-1'>
          Oxford Paediametrics and Genomics
        </h2>
        <h1 className='text-3xl font-bold mb-4'>Neurogene Search</h1>

        <div className='relative' ref={containerRef}>
          <div className='flex gap-2'>
            <Input
              placeholder='Find a gene'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDropdownVisible(true);
              }}
              onFocus={() =>
                debouncedQuery.length > 1 && setIsDropdownVisible(true)
              }
              className='flex-1'
            />
            <Button
              className='px-6 text-lg font-semibold'
              onClick={() => router.push(`/gene/${query.trim()}`)}
            >
              Search
            </Button>
          </div>

          {/* Dropdown */}
          {isDropdownVisible && debouncedQuery.length > 1 && (
            <ul className='absolute top-full mt-1 left-0 w-full bg-white border rounded-md shadow-lg z-20 text-left max-h-60 overflow-auto'>
              {isFetching && (
                <li className='px-4 py-2 text-gray-500'>Loading…</li>
              )}
              {!isFetching && error && (
                <li className='px-4 py-2 text-red-500'>
                  Error fetching suggestions
                </li>
              )}
              {!isFetching && !error && suggestions.length === 0 && (
                <li className='px-4 py-2 text-gray-500'>No results</li>
              )}
              {!isFetching &&
                suggestions.map((gene) => (
                  <li
                    key={gene.id}
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => handleSuggestionClick(gene.symbol)}
                  >
                    {gene.symbol} – {gene.name}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className='text-sm text-gray-500 mt-4'>
          Examples:{' '}
          <a href='/search/SCN2A' className='text-blue-600 underline'>
            SCN2A
          </a>
        </div>
      </div>
    </main>
  );
}
