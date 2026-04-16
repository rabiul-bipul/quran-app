import { Surah, SurahMeta, Ayah, SearchResult } from '@/types/quran';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const quranArabic = require('../../data/quran.json') as Record<string, unknown>[];
// eslint-disable-next-line @typescript-eslint/no-require-imports
const quranEnglish = require('../../data/quran_en.json') as Record<string, unknown>[];

// Cache merged data at module level — only built once
let cachedSurahs: Surah[] | null = null;

function buildSurahs(): Surah[] {
  if (cachedSurahs) return cachedSurahs;

  cachedSurahs = quranArabic.map((surahAr, index) => {
    const surahEn = quranEnglish[index] as {
      id: number;
      name: string;
      transliteration: string;
      translation: string;
      type: string;
      total_verses: number;
      verses: { id: number; text: string }[];
    };

    const arabicVerses = (surahAr as { verses: { id: number; text: string }[] }).verses;

    const ayahs: Ayah[] = arabicVerses.map((verse, vIndex) => ({
      id: vIndex + 1,
      surah: surahEn.id,
      numberInSurah: vIndex + 1,
      arabic: verse.text,
      translation: surahEn.verses[vIndex]?.text ?? '',
    }));

    return {
      id: surahEn.id,
      name: surahEn.name,
      transliteration: surahEn.transliteration,
      translation: surahEn.translation,
      type: surahEn.type as 'meccan' | 'medinan',
      totalAyahs: surahEn.total_verses,
      ayahs,
    };
  });

  return cachedSurahs;
}

export function getAllSurahs(): Surah[] {
  return buildSurahs();
}

export function getSurahMetas(): SurahMeta[] {
  return buildSurahs().map(({ ayahs: _, ...meta }) => meta);
}

export function getSurahById(id: number): Surah | undefined {
  return buildSurahs().find((s) => s.id === id);
}

export function getAllSurahIds(): number[] {
  return buildSurahs().map((s) => s.id);
}

export function searchAyahs(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const normalized = query.toLowerCase().trim();

  const results: SearchResult[] = [];

  for (const surah of buildSurahs()) {
    for (const ayah of surah.ayahs) {
      if (ayah.translation.toLowerCase().includes(normalized)) {
        results.push({
          ayah,
          surahName: surah.name,
          surahTransliteration: surah.transliteration,
        });
      }
    }
  }

  return results.slice(0, 50); // limit to 50 results
}