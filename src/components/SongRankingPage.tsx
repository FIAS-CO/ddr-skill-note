import * as React from 'react';
import { useState, useEffect } from 'react';
import GradeSelector from "./RankingSelector";
import Tab from './Tab';
import { getRankingSongs, RankingSongsSpDp } from '../services/api';
import RankingSongTable from './SongRankingTable';
import useWindowSize from '../util/UseWindowSize';
import { useParams } from 'react-router-dom';

const SongRankingPage: React.FC = () => {
  const { grade } = useParams<{ grade?: string }>();
  const [selectedGrade, setSelectedGrade] = useState(grade || 'WORLD');
  const [rankingSongs, setRankingSongs] = useState<RankingSongsSpDp | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SP' | 'DP'>('SP');
  const { width } = useWindowSize();
  const isMobile = width < 768; // md breakpoint in Tailwind

  const fetchRankingSongs = async (grade: string) => {
    const actualGrade = getActualGrade(grade);

    console.log('fetchRankingSongs ' + actualGrade)
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRankingSongs(actualGrade);
      setRankingSongs(data);
    } catch (err) {
      setError('Failed to fetch ranking songs. Please try again later.');
      console.error('Error fetching ranking songs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getActualGrade = (grade: string): string => {
    console.log('getGradeFromPath before ' + grade)

    const grades = new Set([
      'WORLD',
      'SUN+++', 'SUN++', 'SUN+', 'SUN',
      'NEPTUNE+++', 'NEPTUNE++', 'NEPTUNE+', 'NEPTUNE',
      'URANUS+++', 'URANUS++', 'URANUS+', 'URANUS'
    ]);

    if (grades.has(grade)) {
      return grade;
    }
    return 'WORLD';
  };

  useEffect(() => {
    fetchRankingSongs(selectedGrade);
  }, [selectedGrade]);

  const handleGradeChange = (grade: string) => {
    console.log('handleGradeChange ' + grade)
    setSelectedGrade(grade);
  };

  const shareToX = () => {
    const text = `${selectedGrade}帯対象曲ランキングをチェック！\n#DDR_FlareNote\n`;
    const encodedText = encodeURIComponent(text);
    const url = encodeURIComponent(window.location.href + '/' + selectedGrade);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`, '_blank');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const currentRankingSongs = rankingSongs ? rankingSongs[activeTab] : { CLASSIC: [], WHITE: [], GOLD: [] };

  return (
    <div className={`container mx-auto py-8 pt-24 sm:pt-16 ${isMobile ? 'm-0 px-0' : 'px-4'}`}>
      <div className="flex items-center justify-between mb-8">

        <div className="w-10"> {/* 左側の空白スペース */}</div>
        <h1 className="text-3xl font-bold text-center mb-8">グレード別・カテゴリ別人気曲一覧</h1>

        <button
          onClick={shareToX}
          className="flex items-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
          </svg>
          {!isMobile ? '共有' : ''}
        </button>
      </div>

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
