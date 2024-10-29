import * as React from 'react';
import { useState, useEffect } from 'react';
import { getSkillBookSongs, getStats, CategorizedSongs, PlayerStats } from '../../services/api';
import { useParams } from 'react-router-dom';
import useWindowSize from '../../util/UseWindowSize';
import { SkillNoteAdBanner } from '../../adsense/AdsenseBanner';
import { Category, PlayStyle } from '../../types/Types';
import { SkillDisplayTabPage } from './SkillDisplayTabPage';
import Tab from '../Tab';

// TODO 共通化したい
const PersonalSkillPage: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [songs, setSongs] = useState<CategorizedSongs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<PlayStyle>('SP');
  const [activeCategoryTab, setActiveCategoryTab] = useState<Category>('CLASSIC');

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

  const shareToX = () => {
    const text = `${userName}さんのフレアスキル帳をチェック！\n#DDR_FlareNote\n`;
    const encodedText = encodeURIComponent(text);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`, '_blank');
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
      <div className="flex items-center justify-between mb-8">
        <div className="w-10"> {/* 左側の空白スペース */}</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center flex-grow">
          {userName} さんの
          {isMobile ? <br /> : ''}
          フレアスキル帳
        </h1>
        <button
          onClick={shareToX}
          className={`flex items-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 ${!isMobile ? 'px-2' : 'px-1'} rounded`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
          </svg>
          {!isMobile ? '共有' : ''}
        </button>
      </div>
      <SkillNoteAdBanner />
      <Tab
        activeTab={activeTab}
        onTabChange={(tab: PlayStyle) => setActiveTab(tab)}
      />
      <SkillDisplayTabPage
        activeTab={activeTab as PlayStyle}
        activeCategoryTab={activeCategoryTab}
        stats={stats}
        songs={songs}
        onCategoryTabChange={setActiveCategoryTab}
      />
    </div>
  )
}

export default PersonalSkillPage;