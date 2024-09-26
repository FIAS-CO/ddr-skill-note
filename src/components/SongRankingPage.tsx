import * as React from 'react';
import { useState, useEffect } from 'react';
import GradeSelector from "./RankingSelector";
import Tab from './Tab';
import { getRankingSongs, RankingSongsSpDp } from '../services/api';
import RankingSongTable from './SongRankingTable';

const SongRankingPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState('SUN+++');
  const [rankingSongs, setRankingSongs] = useState<RankingSongsSpDp | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SP' | 'DP'>('SP');

  const fetchRankingSongs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRankingSongs(selectedGrade);
      setRankingSongs(data);
    } catch (err) {
      setError('Failed to fetch ranking songs. Please try again later.');
      console.error('Error fetching ranking songs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingSongs();
  }, [selectedGrade]);

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
    fetchRankingSongs();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const currentRankingSongs = rankingSongs ? rankingSongs[activeTab] : { CLASSIC: [], WHITE: [], GOLD: [] };

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-8">グレード別・カテゴリ別人気曲一覧</h1>
      <GradeSelector selectedGrade={selectedGrade} onGradeChange={handleGradeChange} />
      <Tab
        activeTab={activeTab}
        onTabChange={(tab: 'SP' | 'DP') => setActiveTab(tab)}
      />
      {['CLASSIC', 'WHITE', 'GOLD'].map((category) => {
        const songs = currentRankingSongs[category as keyof typeof currentRankingSongs];
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
            <RankingSongTable songs={songs} />
          </div>
        );
      })}
    </div>
  );
};

export default SongRankingPage;
