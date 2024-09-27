import * as React from 'react';
import { useState, useEffect } from 'react';
import StatsOverview from './StatsOverview';
import { getSkillBookSongs, getStats, CategorizedSongs, PlayerStats, PlayStyle } from '../services/api';
import { useParams } from 'react-router-dom';
import Tab from './Tab';
import SkillBookSongTable from './SkillBookSongTable';
import useWindowSize from '../util/UseWindowSize';

const PersonalSkillPage: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [songs, setSongs] = useState<CategorizedSongs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SP' | 'DP'>('SP');

  const { width } = useWindowSize();
  const isMobile = width < 768; // md breakpoint in Tailwind

  useEffect(() => {
    const fetchData = async () => {
      if (!userName) {
        setError('ユーザーIDが提供されていません');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const [songsData, statsData] = await Promise.all([getSkillBookSongs(userName), getStats(userName)]);
        console.log('Fetched songs data:', songsData);
        console.log('Fetched stats data:', statsData);

        setSongs(songsData);
        setStats(statsData);
      } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
        setError('ユーザーデータの読み込みに失敗しました。後でもう一度お試しください。');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userName]);

  const renderCategoryTable = (category: keyof PlayStyle, playStyle: 'SP' | 'DP') => {
    if (!songs || !songs[playStyle] || !songs[playStyle][category]) {
      return <div>この{category}カテゴリーにはデータがありません。</div>;
    }
    const categorySongs = songs[playStyle][category];

    const categoryTotalFlareSkill = categorySongs
      .sort((a, b) => b.flareSkill - a.flareSkill) // flareSkillの降順でソート
      .slice(0, 30) // 上位30曲を選択
      .reduce((total, song) => total + song.flareSkill, 0); // 選択された曲のflareSkillを合計

    return (
      <div key={`${playStyle}-${category}`} className="mb-8">
        <h2 className="text-xl font-bold mb-2">{category} - トータルフレアスキル: {categoryTotalFlareSkill}</h2>
        <SkillBookSongTable songs={categorySongs} />
      </div>
    );
  };

  if (isLoading) {
    return <div>データを読み込んでいます...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!stats || !songs) {
    return <div>データが利用できません。</div>;
  }

  return (
    <div className={`container mx-auto py-8 pt-24 sm:pt-16 ${isMobile ? 'm-0 px-0' : 'px-4'}`}>
      <h1 className="text-3xl font-bold mb-8">{userName} さんのフレアスキル帳</h1>
      <Tab
        activeTab={activeTab}
        onTabChange={(tab: 'SP' | 'DP') => setActiveTab(tab)}
      />
      {stats[activeTab] && (
        <StatsOverview
          totalFlareSkill={stats[activeTab].totalFlareSkill}
          grade={stats[activeTab].grade}
          playStyle={activeTab}
        />
      )}
      {renderCategoryTable('CLASSIC', activeTab)}
      {renderCategoryTable('WHITE', activeTab)}
      {renderCategoryTable('GOLD', activeTab)}
    </div>
  );
};

export default PersonalSkillPage;