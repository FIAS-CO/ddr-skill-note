import { render, screen } from '@testing-library/react';
import { SkillBookSongRow, SkillBookSong } from '../../src/components/SkillBookSongRow';

describe('SkillBookSongRow', () => {
  const mockSong: SkillBookSong = {
    title: 'Test SkillBook Song',
    level: 14,
    flareRank: 'A',
    score: 980000,
    flareSkill: 1100
  };

  it('renders skillbook song row correctly', () => {
    render(
      <table>
        <tbody>
          <SkillBookSongRow song={mockSong} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test SkillBook Song')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('980,000')).toBeInTheDocument();
    expect(screen.getByText('1100')).toBeInTheDocument();
  });
});
