export interface Ayah {
  id: number;
  surah: number;
  numberInSurah: number;
  arabic: string;
  translation: string;
}

export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: 'meccan' | 'medinan';
  totalAyahs: number;
  ayahs: Ayah[];
}

export interface SurahMeta {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: 'meccan' | 'medinan';
  totalAyahs: number;
}

export interface SearchResult {
  ayah: Ayah;
  surahName: string;
  surahTransliteration: string;
}