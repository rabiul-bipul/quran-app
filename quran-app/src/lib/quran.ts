import type {
  Ayah,
  RawSurah,
  SearchResult,
  Surah,
  SurahMeta,
} from "@/types/quran";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const rawData: RawSurah[] = require("../../data/quran_en.json");

// Module-level cache — built once, reused forever
let cachedSurahs: Surah[] | null = null;

function buildSurahs(): Surah[] {
  if (cachedSurahs) return cachedSurahs;

  cachedSurahs = rawData.map((raw: RawSurah): Surah => {
    const ayahs: Ayah[] = raw.verses.map((verse, index) => ({
      id: verse.id,
      surahId: raw.id,
      numberInSurah: index + 1,
      arabic: verse.text,
      translation: verse.translation,
    }));

    return {
      id: raw.id,
      name: raw.name,
      transliteration: raw.transliteration,
      translation: raw.translation,
      type: raw.type,
      totalAyahs: raw.total_verses,
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
          surahId: surah.id,
          surahName: surah.name,
          surahTransliteration: surah.transliteration,
        });
      }
    }
  }

  // Limit to 50 results to keep UI fast
  return results.slice(0, 50);
}
