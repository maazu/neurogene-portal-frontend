'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const geneSuggestions = ['SCN2A', 'SCN1A', 'TP53', 'MECP2', 'KCNQ2', 'GRIN2B'];

export default function Home() {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      const filtered = geneSuggestions.filter((gene) =>
        gene.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (gene: string) => {
    setQuery(gene);
    setFilteredSuggestions([]);
    router.push(`/gene/${gene}`); // Redirect to dynamic route
  };

  return (
    <main className='min-h-screen bg-gradient-to-r flex flex-col items-center justify-start'>
      <div className='w-full p-6 text-sm'>
        <nav className='text-white'>
          <a href='#' className='underline'>
            Neurogene Search
          </a>
          &gt; <span className='font-semibold'>Advanced search</span>
        </nav>
      </div>

      <div className='mt-10 bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-2xl text-center'>
        <h2 className='text-sm text-gray-600 mb-2'>
          Oxford Paediametrics and Genomics
        </h2>
        <h1 className='text-3xl font-bold mb-2'>Neurogene Search</h1>

        <div className='flex items-center gap-2 mb-2 relative'>
          <Input
            placeholder='Find a gene'
            className='flex-1'
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <Button className='px-6 text-lg font-semibold'>Search</Button>

          {filteredSuggestions.length > 0 && (
            <ul className='absolute top-12 left-0 w-full bg-white border rounded-md shadow z-10 text-left'>
              {filteredSuggestions.map((item) => (
                <li
                  key={item}
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='text-sm text-gray-500'>
          Examples:
          <a href='/search/SCN2A' className='text-blue-600 underline'>
            SCN2A
          </a>
        </div>
      </div>
    </main>
  );
}
