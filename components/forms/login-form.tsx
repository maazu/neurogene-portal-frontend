'use client';

import { useState } from 'react';
import { GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      console.log(`OTP sent to ${email}`);
      setStep('verify');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return;
    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise((res) => setTimeout(res, 1000));
      if (otp === '123456') {
        alert('OTP Verified!');
      } else {
        alert('Invalid OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <a
              href='#'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex size-8 items-center justify-center rounded-md'>
                <GalleryVerticalEnd className='size-6' />
              </div>
              <span className='sr-only'>Neurogene.</span>
            </a>
            <h1 className='text-xl font-bold'>Neurogene</h1>
            <p className='text-muted-foreground text-sm text-center'>
              Visualise, collaborate, discover, and share your data with
            </p>
          </div>

          {step === 'input' ? (
            <div className='grid gap-3'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='username@aediatrics.ox.ac.uk'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type='button'
                className='w-full'
                onClick={sendOtp}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </div>
          ) : (
            <div className='grid gap-3'>
              <Label htmlFor='otp'>Enter OTP</Label>
              <Input
                id='otp'
                type='text'
                placeholder='123456'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                type='button'
                className='w-full'
                onClick={verifyOtp}
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button
                variant='link'
                type='button'
                className='text-sm px-0'
                onClick={() => setStep('input')}
              >
                Change email
              </Button>
            </div>
          )}
        </div>
      </form>

      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
