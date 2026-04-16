'use client';

import { useState, useEffect } from 'react';
import { Settings, DEFAULT_SETTINGS } from '@/types/settings';

const STORAGE_KEY = 'quran-app-settings';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  // SSR safety — only read localStorage after mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      }
    } catch {
      // localStorage unavailable, use defaults
    }
  }, []);

  function updateSettings(partial: Partial<Settings>) {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }

  return { settings, updateSettings, mounted };
}