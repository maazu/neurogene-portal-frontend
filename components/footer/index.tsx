import React from 'react';

import { buttonVariants } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className='max-w-7xl mx-auto py-6 px-4 flex flex-col sm:flex-row justify-center items-center'>
        <p className='text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} NeurogenesAi. All rights reserved.
        </p>
        {/* <nav className='flex space-x-4 mt-4 sm:mt-0'>
          <Link href='/about' className={buttonVariants({ variant: 'link' })}>
            About
          </Link>
          <Link href='/contact' className={buttonVariants({ variant: 'link' })}>
            Contact
          </Link>
          <Link href='/privacy' className={buttonVariants({ variant: 'link' })}>
            Privacy Policy
          </Link>
        </nav> */}
      </div>
    </footer>
  );
};

export default Footer;
