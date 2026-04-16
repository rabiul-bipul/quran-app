export type ArabicFont = 'amiri' | 'scheherazade';

export interface Settings {
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
}

export const DEFAULT_SETTINGS: Settings = {
  arabicFont: 'amiri',
  arabicFontSize: 32,
  translationFontSize: 16,
};