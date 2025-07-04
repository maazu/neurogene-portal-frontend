import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className='max-w-7xl mx-auto py-6 px-4 flex flex-col sm:flex-row justify-center items-center'>
        <p className='text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} NeurogenesAi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
