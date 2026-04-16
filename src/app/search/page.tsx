import { Suspense } from 'react';
import { searchAyahs } from '@/lib/quran';
import SearchBar from '@/components/ui/SearchBar';
import SearchResultCard from '@/components/ui/SearchResultCard';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = {
  title: 'Search Ayahs — Quran App',
  description: 'Search the Holy Quran by translation text',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const results = query.length >= 2 ? searchAyahs(query) : [];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Search Ayahs
        </h1>
        <p className="text-sm text-gray-500">
          Search through all 6,236 verses by translation
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <Suspense fallback={<div className="h-12 bg-gray-100 rounded-xl animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Results */}
      {query.length >= 2 && (
        <div className="mb-4 text-sm text-gray-500">
          {results.length > 0
            ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
            : `No results found for "${query}"`}
        </div>
      )}

      {/* Result Cards */}
      {results.length > 0 && (
        <div className="flex flex-col gap-3">
          {results.map((result) => (
            <SearchResultCard
              key={`${result.surahId}-${result.ayah.numberInSurah}`}
              result={result}
              query={query}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500 text-sm">
            No verses found matching your search.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Try different keywords
          </p>
        </div>
      )}

      {/* Initial State */}
      {query.length < 2 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">📖</p>
          <p className="text-gray-500 text-sm">
            Type at least 2 characters to search
          </p>
        </div>
      )}
    </div>
  );
}