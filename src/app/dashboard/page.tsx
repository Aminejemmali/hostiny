// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // If we have a user, show the dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          {user && (
            <div className="space-y-3">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
              <p><strong>User ID:</strong> {user.uid}</p>
              {!user.emailVerified && (
                <div className="mt-4">
                  <p className="text-yellow-600">
                    Your email is not verified. Please check your inbox or spam folder for the verification email.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}