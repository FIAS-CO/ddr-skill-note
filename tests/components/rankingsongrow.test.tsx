import { render, screen } from '@testing-library/react';
import { RankingSongRow, RankingSong } from '../../src/components/rankingpage/RankingSongRow';

describe('RankingSongRow', () => {
  const mockSong: RankingSong = {
    title: 'Test Ranking Song',
    level: 15,
    flareRank: 10,
    overallPercentage: 99,
    flareSkill: 0,
    id: 0,
    chartType: ''
  };

  it('renders ranking song row correctly', () => {
    render(
      <table>
        <tbody>
          <RankingSongRow song={mockSong} rank={1} />
        </tbody>
      </table>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Test Ranking Song')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText(10)).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
  });
});
