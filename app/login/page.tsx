import { LoginForm } from '@/components/forms/login-form';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Login - Neurogene Portal',
  description: 'Login to access your Neurogene account and manage your data.',
};

export default function LoginPage() {
  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}
