'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { logout } from '@/lib/store/slices/authSlice';
import Link from 'next/link';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Welcome banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow">
          <p className="mb-1 text-sm text-blue-200">Logged in as</p>
          <h1 className="mb-1 text-2xl font-bold">{user?.email}</h1>
          <span className="inline-block rounded-full bg-blue-500 bg-opacity-40 px-3 py-0.5 text-xs font-medium uppercase tracking-wide">
            {user?.role}
          </span>
        </div>

        {/* Quick actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Manage Packages', desc: 'Create, edit, or toggle package status', href: '#', icon: '📦' },
              { label: 'View Bookings', desc: 'See incoming booking requests', href: '#', icon: '📅' },
              { label: 'Site Preview', desc: 'View the public homepage', href: '/', icon: '🌐' },
            ].map(({ label, desc, href, icon }) => (
              <Link key={label} href={href} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </main>
    </div>
  );
}
