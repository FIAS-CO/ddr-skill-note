import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import SongTable from './SongTable';
import { SkillBookSong } from './SkillBookSongRow';
import StatsOverview from './StatsOverview';

const PersonalSkillPage: React.FC = () => {
  const [stats, setStats] = useState({ grade: '' });
  const [classicSongs, setClassicSongs] = useState<SkillBookSong[]>([]);
  const [whiteSongs, setWhiteSongs] = useState<SkillBookSong[]>([]);
  const [goldSongs, setGoldSongs] = useState<SkillBookSong[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchData = async () => {
      // Simulating API call
      const mockStats = { grade: 'WORLD' };
      const mockClassicSongs: SkillBookSong[] = [
        { title: 'CLASSIC曲1', level: 18, flareRank: 'IX', score: 990000, flareSkill: 962 },
        { title: 'CLASSIC曲2', level: 19, flareRank: 'EX', score: 995000, flareSkill: 1064 },
      ];
      const mockWhiteSongs: SkillBookSong[] = [
        { title: 'WHITE曲1', level: 17, flareRank: 'VIII', score: 985000, flareSkill: 939 },
        { title: 'WHITE曲2', level: 18, flareRank: 'IX', score: 992000, flareSkill: 962 },
      ];
      const mockGoldSongs: SkillBookSong[] = [
        { title: 'GOLD曲1', level: 19, flareRank: 'EX', score: 998000, flareSkill: 1064 },
        { title: 'GOLD曲2', level: 18, flareRank: 'IX', score: 991000, flareSkill: 962 },
      ];

      setStats(mockStats);
      setClassicSongs(mockClassicSongs);
      setWhiteSongs(mockWhiteSongs);
      setGoldSongs(mockGoldSongs);
    };

    fetchData();
  }, []);

  const calculateTotalFlareSkill = (songs: SkillBookSong[]): number => {
    return songs.reduce((total, song) => total + song.flareSkill, 0);
  };

  const totalFlareSkill = useMemo(() => {
    return calculateTotalFlareSkill(classicSongs) + 
           calculateTotalFlareSkill(whiteSongs) + 
           calculateTotalFlareSkill(goldSongs);
  }, [classicSongs, whiteSongs, goldSongs]);

  const renderCategoryTable = (category: string, songs: SkillBookSong[]) => {
    const categoryTotalFlareSkill = calculateTotalFlareSkill(songs);

    return (
      <div key={category} className="mb-8">
        <h2 className="text-xl font-bold mb-2">{category} - トータルフレアスキル: {categoryTotalFlareSkill}</h2>
        <SongTable songs={songs} type="skillbook" />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">個人のフレアスキル帳 (デモ)</h1>
      <StatsOverview totalFlareSkill={totalFlareSkill} grade={stats.grade} />
      {renderCategoryTable('CLASSIC', classicSongs)}
      {renderCategoryTable('WHITE', whiteSongs)}
      {renderCategoryTable('GOLD', goldSongs)}
      <a href="#" className="text-blue-600 hover:underline">ランキングページへ戻る</a>
    </div>
  );
};

export default PersonalSkillPage;
