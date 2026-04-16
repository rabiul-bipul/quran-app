import type { Ayah } from '@/types/quran';
import AyahBlock from './AyahBlock';

interface AyahListProps {
  ayahs: Ayah[];
}

export default function AyahList({ ayahs }: AyahListProps) {
  return (
    <div className="flex flex-col gap-4">
      {ayahs.map((ayah) => (
        <AyahBlock key={ayah.id} ayah={ayah} />
      ))}
    </div>
  );
}