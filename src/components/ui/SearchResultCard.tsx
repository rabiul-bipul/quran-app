'use client';

import Link from 'next/link';
import { useSettingsContext } from '@/context/SettingsContext';
import type { SearchResult } from '@/types/quran';

interface SearchResultCardProps {
  result: SearchResult;
  query: string;
}

// Highlight matching text in translation
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-emerald-100 text-emerald-800 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

const FONT_FAMILIES = {
  amiri: 'Amiri, serif',
  scheherazade: 'Scheherazade New, serif',
};

export default function SearchResultCard({
  result,
  query,
}: SearchResultCardProps) {
  const { settings } = useSettingsContext();

  return (
    <Link href={`/surah/${result.surahId}`}>
      <article className="bg-white rounded-xl border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3 cursor-pointer">

        {/* Surah Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white bg-emerald-600 px-2.5 py-1 rounded-full">
              {result.surahTransliteration}
            </span>
            <span className="text-xs text-gray-400">
              Verse {result.ayah.numberInSurah}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            Surah {result.surahId}
          </span>
        </div>

        {/* Arabic Text */}
        <p
          className="text-right leading-loose text-gray-800"
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: FONT_FAMILIES[settings.arabicFont],
            fontSize: `${settings.arabicFontSize * 0.75}px`,
          }}
        >
          {result.ayah.arabic}
        </p>

        <hr className="border-gray-100" />

        {/* Translation with highlight */}
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontSize: `${settings.translationFontSize}px` }}
        >
          {highlightText(result.ayah.translation, query)}
        </p>

      </article>
    </Link>
  );
}