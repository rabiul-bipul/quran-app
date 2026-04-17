import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { SettingsProvider } from '@/context/SettingsContext';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quran App — Read & Search',
  description: 'Read and search the Holy Quran with Arabic text and English translation',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☪</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={geist.className}>
        <SettingsProvider>
          <Navbar />
          <main className="max-w-3xl mx-auto px-4 py-8">
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}