import { getSurahById, getAllSurahIds } from '@/lib/quran';
import SurahHeader from '@/components/surah/SurahHeader';
import AyahList from '@/components/ayah/AyahList';
import { notFound } from 'next/navigation';

// SSG — pre-render all 114 surah pages at build time
export async function generateStaticParams() {
  return getAllSurahIds().map((id) => ({
    id: String(id),
  }));
}

// Dynamic page title per surah
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = getSurahById(Number(id));
  if (!surah) return { title: 'Surah Not Found' };
  return {
    title: `${surah.transliteration} — Quran App`,
    description: `Read Surah ${surah.transliteration} (${surah.translation}) with Arabic text and English translation`,
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = getSurahById(Number(id));

  if (!surah) notFound();

  const { ayahs, ...meta } = surah;

  return (
    <div>
      <SurahHeader surah={meta} />
      <AyahList ayahs={ayahs} />
    </div>
  );
}