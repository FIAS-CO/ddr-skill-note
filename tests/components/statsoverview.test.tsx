import { render, screen } from '@testing-library/react';
import StatsOverview from '../../src/components/StatsOverview';

describe('StatsOverview', () => {
  const mockProps = {
    totalFlareSkill: 93792,
    grade: 'WORLD'
  };

  it('renders stats overview correctly', () => {
    render(<StatsOverview {...mockProps} />);

    // Check if the title is rendered
    expect(screen.getByText('統計情報')).toBeInTheDocument();

    // Check if total flare skill is rendered correctly
    expect(screen.getByText('トータルフレアスキル:')).toBeInTheDocument();
    expect(screen.getByText('93,792')).toBeInTheDocument();

    // Check if grade is rendered correctly
    expect(screen.getByText('グレード:')).toBeInTheDocument();
    expect(screen.getByText('WORLD')).toBeInTheDocument();
  });

  it('formats total flare skill with commas', () => {
    render(<StatsOverview totalFlareSkill={1000000} grade="SUN+++" />);
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('updates when props change', () => {
    const { rerender } = render(<StatsOverview {...mockProps} />);
    
    // Initial render
    expect(screen.getByText('93,792')).toBeInTheDocument();
    expect(screen.getByText('WORLD')).toBeInTheDocument();

    // Re-render with new props
    rerender(<StatsOverview totalFlareSkill={85000} grade="SUN" />);
    
    expect(screen.getByText('85,000')).toBeInTheDocument();
    expect(screen.getByText('SUN')).toBeInTheDocument();
  });
});