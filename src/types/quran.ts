// Matches exact structure of quran_en.json
export interface RawVerse {
  id: number;
  text: string;
  translation: string;
}

export interface RawSurah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
  verses: RawVerse[];
}

// Our app's clean interfaces
export interface Ayah {
  id: number;
  surahId: number;
  numberInSurah: number;
  arabic: string;
  translation: string;
}

export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  totalAyahs: number;
  ayahs: Ayah[];
}

// Surah without ayahs — used for the surah list page (lighter)
export type SurahMeta = Omit<Surah, "ayahs">;

export interface SearchResult {
  ayah: Ayah;
  surahId: number;
  surahName: string;
  surahTransliteration: string;
}
