import type { SurahMeta } from '@/types/quran';
import SurahCard from './SurahCard';

interface SurahListProps {
  surahs: SurahMeta[];
}

export default function SurahList({ surahs }: SurahListProps) {
  return (
    <div className="flex flex-col gap-3">
      {surahs.map((surah) => (
        <SurahCard key={surah.id} surah={surah} />
      ))}
    </div>
  );
}