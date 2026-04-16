import Link from 'next/link';
import { getSurahById, getAllSurahIds } from '@/lib/quran';
import AyahList from '@/components/ayah/AyahList';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllSurahIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const surah = getSurahById(Number(id));
  if (!surah) return { title: 'Not Found' };
  return {
    title: `${surah.transliteration} — Quran App`,
    description: `Read Surah ${surah.transliteration} with Arabic text and English translation`,
  };
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const surah = getSurahById(Number(id));
  if (!surah) notFound();

  return (
    <div>
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-700 transition-colors mb-5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        All Surahs
      </Link>

      {/* Surah Header Card */}
      <div className="rounded-2xl bg-emerald-800 px-6 py-7 text-center mb-6">
        <p
          className="text-4xl text-emerald-200 mb-2"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: 'Amiri, serif' }}
        >
          {surah.name}
        </p>
        <h1 className="text-xl font-bold text-white mb-1">{surah.transliteration}</h1>
        <p className="text-sm text-emerald-300 mb-4">{surah.translation}</p>

        <div className="flex justify-center gap-2 flex-wrap">
          <span className="bg-white/10 text-emerald-200 text-xs font-medium px-3 py-1 rounded-full">
            Surah {surah.id}
          </span>
          <span className="bg-white/10 text-emerald-200 text-xs font-medium px-3 py-1 rounded-full">
            {surah.totalAyahs} Verses
          </span>
          <span className="bg-white/10 text-emerald-200 text-xs font-medium px-3 py-1 rounded-full capitalize">
            {surah.type}
          </span>
        </div>

        {surah.id !== 9 && (
          <p
            className="text-2xl text-emerald-100 mt-5"
            dir="rtl"
            lang="ar"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        )}
      </div>

      {/* Ayahs */}
      <AyahList ayahs={surah.ayahs} />
    </div>
  );
}