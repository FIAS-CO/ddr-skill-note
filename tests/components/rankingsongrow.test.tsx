import { render, screen } from '@testing-library/react';
import { RankingSongRow, RankingSong } from '../../src/components/RankingSongRow';

describe('RankingSongRow', () => {
  const mockSong: RankingSong = {
    title: 'Test Ranking Song',
    level: 15,
    flareRank: 'S',
    overallPercentage: 99
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
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
  });
});
