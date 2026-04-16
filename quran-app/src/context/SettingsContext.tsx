'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Settings, DEFAULT_SETTINGS } from '@/types/settings';

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
  mounted: boolean;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  mounted: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { settings, updateSettings, mounted } = useSettings();

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, mounted }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used inside SettingsProvider');
  }
  return context;
}