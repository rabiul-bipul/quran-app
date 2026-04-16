import Link from 'next/link';
import type { SurahMeta } from '@/types/quran';

interface SurahCardProps {
  surah: SurahMeta;
}

export default function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.id}`}>
      <div className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer">

        {/* Left — Number + Info */}
        <div className="flex items-center gap-4">
          {/* Surah Number Badge */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold shrink-0">
            {surah.id}
          </div>

          {/* Surah Info */}
          <div>
            <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
              {surah.transliteration}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {surah.translation} · {surah.totalAyahs} verses · {surah.type}
            </p>
          </div>
        </div>

        {/* Right — Arabic Name */}
        <div
          className="text-xl text-gray-700 font-medium"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: 'Amiri, serif' }}
        >
          {surah.name}
        </div>

      </div>
    </Link>
  );
}