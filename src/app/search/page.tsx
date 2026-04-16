import { Suspense } from 'react';
import { searchAyahs } from '@/lib/quran';
import SearchBar from '@/components/ui/SearchBar';
import SearchResultCard from '@/components/ui/SearchResultCard';

export const metadata = {
  title: 'Search — Quran App',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const results = query.length >= 2 ? searchAyahs(query) : [];

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-800 mb-1">Search Ayahs</h1>
        <p className="text-sm text-gray-400">Search through 6,236 verses by translation</p>
      </div>

      {/* Search Input */}
      <div className="mb-5">
        <Suspense fallback={<div className="h-12 bg-gray-100 rounded-xl animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Result count */}
      {query.length >= 2 && (
        <p className="text-xs text-gray-400 mb-4">
          {results.length > 0
            ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
            : `No results for "${query}"`}
        </p>
      )}

      {/* Results */}
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

      {/* Empty state */}
      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-3xl mb-3">🔍</p>
          <p className="text-sm">No verses match your search</p>
          <p className="text-xs mt-1">Try different keywords</p>
        </div>
      )}

      {/* Idle state */}
      {query.length < 2 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-3xl mb-3">📖</p>
          <p className="text-sm">Type at least 2 characters to search</p>
        </div>
      )}
    </div>
  );
}