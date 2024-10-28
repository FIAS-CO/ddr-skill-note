import { ChartType, Category, FlareRank } from "./Types";

export interface BaseSong {
  id: number;
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

export interface NominatedRanking {
  grade: string,
  flareRank: FlareRank,
  overallPercentage: number
}

export interface SongMetadata {
  id: number;
  name: string;
  chartType: ChartType;
  level: number;
  version: string;
  category: Category;
  nominatedRanking: NominatedRanking[]
}
