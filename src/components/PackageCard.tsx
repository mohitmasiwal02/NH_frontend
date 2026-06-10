'use client';

import { useState } from 'react';
import type { Package } from '@/lib/store/slices/packagesSlice';
import Button from './ui/Button';

interface Props {
  pkg: Package;
}

export default function PackageCard({ pkg }: Props) {
  const [booked, setBooked] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{pkg.title}</h3>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          Popular
        </span>
      </div>

      {/* Description */}
      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{pkg.description}</p>

      {/* Meta */}
      <div className="mb-5 flex gap-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{pkg.person} person{pkg.person > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{pkg.allowedPhotos} photos</span>
        </div>
      </div>

      <Button
        fullWidth
        variant={booked ? 'secondary' : 'primary'}
        onClick={() => setBooked(true)}
        disabled={booked}
      >
        {booked ? 'Booked!' : 'Book Now'}
      </Button>
    </div>
  );
}
