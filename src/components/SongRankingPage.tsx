import GradeSelector from "./RankingSelector";
import { useState, useEffect, useMemo } from 'react';
import SongTable from "./SongTable";
import { getRankingSongs, RankingSongs } from '../services/api';
import Tab from './Tab';

interface AllRankingSongs {
  [grade: string]: {
    SP: RankingSongs;
    DP: RankingSongs;
  };
}

const SongRankingPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState('WORLD');
  const [allPopularSongs, setAllPopularSongs] = useState<AllRankingSongs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SP' | 'DP'>('SP');

  useEffect(() => {
    const fetchAllPopularSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getRankingSongs();
        setAllPopularSongs(data);
      } catch (err) {
        setError('Failed to fetch ranking songs. Please try again later.');
        console.error('Error fetching ranking songs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPopularSongs();
  }, []);

  const currentPopularSongs = useMemo(() => {
    if (allPopularSongs && allPopularSongs[selectedGrade]) {
      return allPopularSongs[selectedGrade];
    }
    return { SP: { CLASSIC: [], WHITE: [], GOLD: [] }, DP: { CLASSIC: [], WHITE: [], GOLD: [] } };
  }, [allPopularSongs, selectedGrade]);

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-8">グレード別・カテゴリ別人気曲一覧</h1>
      <GradeSelector selectedGrade={selectedGrade} onGradeChange={handleGradeChange} />
      <Tab
        activeTab={activeTab}
        onTabChange={(tab: 'SP' | 'DP') => setActiveTab(tab)}
      />
      {['CLASSIC', 'WHITE', 'GOLD'].map((category) => {
        const songs = currentPopularSongs[activeTab][category as keyof RankingSongs];
        if (!songs || songs.length === 0) {
          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <p>No songs available for this category.</p>
            </div>
          );
        }
        return (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <SongTable songs={songs} type="ranking" />
          </div>
        );
      })}
    </div>
  );
};

export default SongRankingPage;