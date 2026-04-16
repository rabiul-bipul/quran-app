import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { SettingsProvider } from '@/context/SettingsContext';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quran App',
  description: 'Read and search the Holy Quran',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}