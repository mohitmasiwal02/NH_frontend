'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { loginAsync, clearError } from '@/lib/store/slices/authSlice';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error, accessToken } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (accessToken) router.replace(redirect);
    return () => { dispatch(clearError()); };
  }, [accessToken, redirect, router, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginAsync({ email, password }));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {/* Full-screen Uttarakhand mountain background */}
      <Image
        src="/uttarakhand.svg"
        alt="Uttarakhand mountains"
        fill
        priority
        className="object-cover"
      />
      {/* subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Centered light card */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-md">
        <div className="mb-6 flex justify-center">
          <Link href="/">
            <Image src="/logo.svg" alt="North Harrier" width={200} height={40} priority />
          </Link>
        </div>

        <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mb-6 text-center text-sm text-gray-600">Sign in to your account</p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/" className="text-teal-700 hover:underline">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
