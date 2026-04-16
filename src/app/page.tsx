import Link from 'next/link';
import { getSurahMetas } from '@/lib/quran';
import type { SurahMeta } from '@/types/quran';

function SurahCard({ surah }: { surah: SurahMeta }) {
  return (
    <Link href={`/surah/${surah.id}`}>
      <div className="group flex items-center justify-between px-4 py-3.5 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all duration-150">

        <div className="flex items-center gap-3">
          {/* Number */}
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
            {surah.id}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-800 transition-colors">
                {surah.transliteration}
              </p>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                surah.type === 'meccan'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-blue-50 text-blue-700'
              }`}>
                {surah.type}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {surah.translation} · {surah.totalAyahs} verses
            </p>
          </div>
        </div>

        {/* Arabic */}
        <p
          className="text-xl text-gray-700 group-hover:text-emerald-800 transition-colors"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: 'Amiri, serif' }}
        >
          {surah.name}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  const surahs = getSurahMetas();

  return (
    <div>
      {/* Hero Banner */}
      <div className="rounded-2xl bg-emerald-800 px-6 py-8 text-center mb-6">
        <p
          className="text-3xl text-emerald-200 mb-2"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: 'Amiri, serif' }}
        >
          القرآن الكريم
        </p>
        <h1 className="text-xl font-bold text-white mb-1">The Holy Quran</h1>
        <p className="text-sm text-emerald-300 mb-4">Read, reflect, and search</p>
        <div className="flex justify-center gap-2">
          <span className="bg-white/10 text-emerald-200 text-xs font-medium px-3 py-1 rounded-full">
            114 Surahs
          </span>
          <span className="bg-white/10 text-emerald-200 text-xs font-medium px-3 py-1 rounded-full">
            6,236 Verses
          </span>
        </div>
      </div>

      {/* Surah List */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        All Surahs
      </p>
      <div className="flex flex-col gap-2">
        {surahs.map((surah) => (
          <SurahCard key={surah.id} surah={surah} />
        ))}
      </div>
    </div>
  );
}