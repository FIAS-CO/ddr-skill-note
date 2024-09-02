import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import SongTable from './SongTable';
import { SkillBookSong } from './SkillBookSongRow';
import StatsOverview from './StatsOverview';
import { getSkillBookSongs, getStats, CategorizedSongs, Stats } from '../services/api';

const PersonalSkillPage: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ totalFlareSkill: 0, grade: '' });
  const [songs, setSongs] = useState<CategorizedSongs>({ CLASSIC: [], WHITE: [], GOLD: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsData, statsData] = await Promise.all([getSkillBookSongs(), getStats()]);
        setSongs(songsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // エラーハンドリングをここに追加
      }
    };

    fetchData();
  }, []);

  const calculateTotalFlareSkill = (songs: SkillBookSong[]): number => {
    return songs.reduce((total, song) => total + song.flareSkill, 0);
  };

  const renderCategoryTable = (category: keyof CategorizedSongs) => {
    const categorySongs = songs[category];
    const categoryTotalFlareSkill = categorySongs.reduce((total, song) => total + song.flareSkill, 0);

    return (
      <div key={category} className="mb-8">
        <h2 className="text-xl font-bold mb-2">{category} - トータルフレアスキル: {categoryTotalFlareSkill}</h2>
        <SongTable songs={categorySongs} type="skillbook" />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-8">個人のフレアスキル帳 (デモ)</h1>
      <StatsOverview totalFlareSkill={stats.totalFlareSkill} grade={stats.grade} />
      {renderCategoryTable('CLASSIC')}
      {renderCategoryTable('WHITE')}
      {renderCategoryTable('GOLD')}
    </div>
  );
};

export default PersonalSkillPage;
