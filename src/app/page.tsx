import { getSurahMetas } from '@/lib/quran';
import SurahList from '@/components/surah/SurahList';

export default function Home() {
  const surahs = getSurahMetas();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          The Holy Quran
        </h1>
        <p className="text-gray-500 text-sm">
          114 Surahs · 6,236 Verses
        </p>
      </div>

      {/* Surah List */}
      <SurahList surahs={surahs} />
    </div>
  );
}