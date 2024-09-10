export interface BaseSong {
  title: string;
  level: number;
  flareRank: string;
}

export interface BaseSongRowProps<T extends BaseSong> {
  song: T;
  renderCells: (song: T) => React.ReactNode[];
  className?: string;
}