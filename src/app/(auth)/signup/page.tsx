// src/app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import SignupForm from '@/components/auth/SignupForm';
import AuthButtons from '@/components/auth/AuthButtons';
import Link from 'next/link';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <SignupForm setIsLoading={setIsLoading} />
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <AuthButtons setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
}