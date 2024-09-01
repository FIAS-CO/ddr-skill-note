import { render, screen } from '@testing-library/react';
import SongTable from '../../src/components/SongTable'
import { RankingSong } from '../../src/components/RankingSongRow';
import { SkillBookSong } from '../../src/components/SkillBookSongRow';

describe('SongTable', () => {
  const rankingSongs: RankingSong[] = [
    { title: 'Ranking Song 1', level: 10, flareRank: 'A', overallPercentage: 95 },
    { title: 'Ranking Song 2', level: 12, flareRank: 'S', overallPercentage: 98 },
  ];

  const skillBookSongs: SkillBookSong[] = [
    { title: 'SkillBook Song 1', level: 11, flareRank: 'B', score: 950000, flareSkill: 1000 },
    { title: 'SkillBook Song 2', level: 13, flareRank: 'A', score: 980000, flareSkill: 1200 },
  ];

  it('renders ranking table correctly', () => {
    render(<SongTable songs={rankingSongs} type="ranking" />);

    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('Overall %')).toBeInTheDocument();
    expect(screen.getByText('Ranking Song 1')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('renders skillbook table correctly', () => {
    render(<SongTable songs={skillBookSongs} type="skillbook" />);

    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Flare Skill')).toBeInTheDocument();
    expect(screen.getByText('SkillBook Song 1')).toBeInTheDocument();
    expect(screen.getByText('950,000')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });
});
