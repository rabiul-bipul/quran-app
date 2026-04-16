import type { SurahMeta } from '@/types/quran';
import Link from 'next/link';

interface SurahHeaderProps {
  surah: SurahMeta;
}

export default function SurahHeader({ surah }: SurahHeaderProps) {
  return (
    <div className="mb-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        All Surahs
      </Link>

      {/* Surah Info Card */}
      <div className="bg-emerald-700 rounded-2xl p-8 text-center text-white">
        {/* Arabic Name */}
        <p
          className="text-4xl mb-3"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: 'Amiri, serif' }}
        >
          {surah.name}
        </p>

        {/* English Name */}
        <h1 className="text-2xl font-bold mb-1">
          {surah.transliteration}
        </h1>
        <p className="text-emerald-200 text-sm mb-4">
          {surah.translation}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="bg-emerald-600 px-3 py-1 rounded-full">
            Surah {surah.id}
          </span>
          <span className="bg-emerald-600 px-3 py-1 rounded-full">
            {surah.totalAyahs} Verses
          </span>
          <span className="bg-emerald-600 px-3 py-1 rounded-full capitalize">
            {surah.type}
          </span>
        </div>

        {/* Bismillah — shown for all surahs except At-Tawbah (9) */}
        {surah.id !== 9 && (
          <p
            className="text-2xl mt-6 text-emerald-100"
            dir="rtl"
            lang="ar"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        )}
      </div>
    </div>
  );
}