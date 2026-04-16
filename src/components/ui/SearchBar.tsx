'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') ?? '');

  // Debounce — wait 300ms after user stops typing
  const debounce = useCallback((query: string) => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      router.push(`/search?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const cleanup = debounce(value);
    return cleanup;
  }, [value, debounce]);

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by translation text..."
        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-sm"
        aria-label="Search ayahs"
        autoFocus
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => {
            setValue('');
            router.push('/search');
          }}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}