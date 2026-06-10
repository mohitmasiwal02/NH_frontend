'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PackageCard from '@/components/PackageCard';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchPublicPackages } from '@/lib/store/slices/packagesSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, loading, error, total, page, limit } = useAppSelector((s) => s.packages);

  useEffect(() => {
    dispatch(fetchPublicPackages({ page: 1, limit: 9 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100">
        {/* Dummy background video — replace /hero.mp4 with your own travel clip.
            Shows the /hero.svg travel scene as a poster until the video loads. */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero.svg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative mx-auto max-w-6xl px-4 py-28 text-center">
          <span className="mb-4 inline-block rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-teal-800 backdrop-blur">
            Professional Photography
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white drop-shadow sm:text-5xl">
            Capture Every Moment
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/90 drop-shadow">
            Choose a photography package tailored to your story. From intimate sessions to grand
            celebrations, we have something for everyone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#packages">
              <Button size="lg">Book Packages</Button>
            </a>
            <a href="#packages">
              <Button size="lg" variant="secondary">
                View Offer
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-teal-700">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-3 divide-x divide-teal-600 text-center text-white">
            {[
              { label: 'Happy Clients', value: '2,400+' },
              { label: 'Sessions Done', value: '5,800+' },
              { label: 'Awards', value: '12' },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-2">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-teal-200">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Our Packages</h2>
          <p className="text-gray-500">Select a package that fits your vision</p>
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mb-2 h-3 rounded bg-gray-100" />
                <div className="mb-6 h-3 w-5/6 rounded bg-gray-100" />
                <div className="flex gap-4">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="text-red-700">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-red-400 text-red-600 hover:bg-red-50"
              onClick={() => dispatch(fetchPublicPackages({ page: 1, limit: 9 }))}
            >
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p>No packages available at the moment. Check back soon!</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            {total > limit && (
              <div className="mt-10 flex justify-center gap-3">
                <Button
                  variant="secondary"
                  disabled={page <= 1}
                  onClick={() => dispatch(fetchPublicPackages({ page: page - 1, limit }))}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-gray-600">
                  Page {page} of {Math.ceil(total / limit)}
                </span>
                <Button
                  variant="secondary"
                  disabled={page >= Math.ceil(total / limit)}
                  onClick={() => dispatch(fetchPublicPackages({ page: page + 1, limit }))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} North Harrier. All rights reserved.
      </footer>
    </div>
  );
}
