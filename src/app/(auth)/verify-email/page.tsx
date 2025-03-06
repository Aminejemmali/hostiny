// src/app/(auth)/verify-email/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const { user, loading, verifyEmail } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If user is verified, redirect to dashboard
    if (user?.emailVerified) {
      router.push('/dashboard');
    }
    
    // If no user and not loading, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleResendVerification = async () => {
    setIsResending(true);
    setError('');
    setMessage('');
    
    try {
      await verifyEmail();
      setMessage('Verification email has been sent. Please check your inbox.');
    } catch (error: any) {
      setError('Failed to send verification email. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  // Show loading state
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification email to <strong>{user.email}</strong>. 
            Please check your inbox and click the link to verify your account.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{message}</div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              onClick={handleResendVerification}
              disabled={isResending}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
            >
              {isResending ? 'Sending...' : 'Resend verification email'}
            </button>

            <Link 
              href="/dashboard" 
              className="flex w-full justify-center rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Continue to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}