import GradeSelector from "./RankingSelector";
import { RankingSong } from "./RankingSongRow";
import { useState, useEffect, useMemo } from 'react';
import SongTable from "./SongTable";

const SongRankingPage: React.FC = () => {
    const [selectedGrade, setSelectedGrade] = useState('WORLD');
    const [popularSongs, setPopularSongs] = useState<RankingSong[]>([]);
  
    useEffect(() => {
      // Fetch popular songs based on selected grade
      const fetchPopularSongs = async () => {
        // This is where you'd normally make an API call
        // For now, we'll use mock data
        const mockData: RankingSong[] = [
          { title: 'CLASSIC難曲A', level: 18, flareRank: 'EX', overallPercentage: 20 },
          { title: 'WHITE難曲B', level: 19, flareRank: 'IX', overallPercentage: 22 },
          { title: 'GOLD超難曲C', level: 20, flareRank: 'EX', overallPercentage: 24 },
        ];
        setPopularSongs(mockData);
      };
  
      fetchPopularSongs();
    }, [selectedGrade]);
  
    const handleGradeChange = (grade: string) => {
      setSelectedGrade(grade);
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">グレード別・カテゴリ別人気曲一覧</h1>
        <GradeSelector selectedGrade={selectedGrade} onGradeChange={handleGradeChange} />
        <SongTable songs={popularSongs} type="ranking" />
      </div>
    );
  };
  
  export default SongRankingPage;