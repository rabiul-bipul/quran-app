'use client';

import { useSettingsContext } from '@/context/SettingsContext';
import type { Ayah } from '@/types/quran';

interface AyahBlockProps {
  ayah: Ayah;
}

const FONT_FAMILIES = {
  amiri: 'Amiri, serif',
  scheherazade: 'Scheherazade New, serif',
};

export default function AyahBlock({ ayah }: AyahBlockProps) {
  const { settings } = useSettingsContext();

  return (
    <article className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">

      {/* Verse Number Badge */}
      <div className="flex justify-between items-center">
        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
          <span className="text-xs font-semibold text-emerald-700">
            {ayah.numberInSurah}
          </span>
        </div>
      </div>

      {/* Arabic Text */}
      <p
        className="text-right leading-loose text-gray-800"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: FONT_FAMILIES[settings.arabicFont],
          fontSize: `${settings.arabicFontSize}px`,
        }}
      >
        {ayah.arabic}
      </p>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Translation */}
      <p
        className="text-gray-600 leading-relaxed"
        style={{ fontSize: `${settings.translationFontSize}px` }}
      >
        {ayah.translation}
      </p>

    </article>
  );
}