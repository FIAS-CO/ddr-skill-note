export interface BaseSong {
  title: string;
  level: number;
  chartType: string;
  flareRank: number;
}

export interface BaseSongRowProps<T extends BaseSong> {
  song: T;
  renderCells: (song: T) => React.ReactNode[];
  className?: string;
}