import { render, screen } from '@testing-library/react';
import BaseSongRow from '../../src/components/BaseSongRow';
import { BaseSong } from '../../src/types/song';

describe('BaseSongRow', () => {
  const mockSong: BaseSong = {
    title: 'Test Song',
    level: 10,
    flareRank: 'A'
  };

  it('renders all cells correctly', () => {
    render(
      <table>
        <tbody>
          <BaseSongRow
            song={mockSong}
            renderCells={(song) => [
              song.title,
              song.level.toString(),
              song.flareRank
            ]}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
