'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

// Dummy gene list for demo; replace with real fetch if needed
const GENE_SYMBOLS = ['SCN2A', 'BRCA1', 'TP53', 'EGFR', 'MYC', 'APOE'];

export function GeneSearchInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const trimmed = query.trim().toUpperCase();
    if (trimmed.length >= 1) {
      const filtered = GENE_SYMBOLS.filter((gene) => gene.startsWith(trimmed));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) return;

    router.push(`/gene-search/${trimmed}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (symbol: string) => {
    setQuery(symbol);
    setShowSuggestions(false);
    router.push(`/gene/${symbol}`);
  };

  return (
    <div className='relative w-full max-w-sm'>
      <form onSubmit={handleSubmit}>
        <Input
          type='search'
          placeholder='Search gene symbol (e.g., SCN2A)'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full'
        />
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className='absolute z-10 mt-1 w-full rounded-md border bg-white shadow'>
          {suggestions.map((symbol) => (
            <li
              key={symbol}
              onClick={() => handleSuggestionClick(symbol)}
              className='cursor-pointer px-4 py-2 hover:bg-gray-100'
            >
              {symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
