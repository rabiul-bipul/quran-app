'use client';

import { useSettingsContext } from '@/context/SettingsContext';
import type { ArabicFont } from '@/types/settings';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARABIC_FONTS: { value: ArabicFont; label: string }[] = [
  { value: 'amiri', label: 'Amiri' },
  { value: 'scheherazade', label: 'Scheherazade' },
];

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings, mounted } = useSettingsContext();

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Settings panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-8">

          {/* Arabic Font Selection */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Arabic Font
            </h3>
            <div className="flex flex-col gap-2">
              {ARABIC_FONTS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => updateSettings({ arabicFont: font.value })}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    settings.arabicFont === font.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{font.label}</span>
                  <p
                    className="text-right mt-1 text-lg"
                    dir="rtl"
                    lang="ar"
                    style={{ fontFamily: font.value === 'amiri' ? 'Amiri, serif' : 'Scheherazade New, serif' }}
                  >
                    بِسْمِ ٱللَّهِ
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Arabic Font Size */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Arabic Font Size
              <span className="ml-2 text-emerald-600 normal-case font-normal">
                {settings.arabicFontSize}px
              </span>
            </h3>
            <input
              type="range"
              min={20}
              max={48}
              step={2}
              value={settings.arabicFontSize}
              onChange={(e) =>
                updateSettings({ arabicFontSize: Number(e.target.value) })
              }
              className="w-full accent-emerald-500"
              aria-label="Arabic font size"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
          </section>

          {/* Translation Font Size */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Translation Font Size
              <span className="ml-2 text-emerald-600 normal-case font-normal">
                {settings.translationFontSize}px
              </span>
            </h3>
            <input
              type="range"
              min={12}
              max={24}
              step={1}
              value={settings.translationFontSize}
              onChange={(e) =>
                updateSettings({ translationFontSize: Number(e.target.value) })
              }
              className="w-full accent-emerald-500"
              aria-label="Translation font size"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
          </section>

        </div>
      </aside>
    </>
  );
}