// app/page.tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <main className='min-h-50  flex flex-col items-center justify-start'>
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

        <div className='flex items-center gap-2 mb-2'>
          <Input placeholder='Find a gene ' className='flex-1' />
          <Button className='px-6 text-lg font-semibold'>Search</Button>
        </div>

        <div className='text-sm text-gray-500'>
          Examples:{' '}
          <a href='#' className='text-blue-600 underline'>
            SCN2A
          </a>
          {/* <a href='#' className='text-blue-600 underline ml-1'>
            tp53
          </a>
          ,
          <a href='#' className='text-blue-600 underline ml-1'>
            Sulston…
          </a> */}
        </div>

        {/* <div className='mt-2 text-sm'>
          <a href='#' className='text-purple-600 underline'>
            Advanced search
          </a>
        </div> */}
      </div>
    </main>
  );
}
