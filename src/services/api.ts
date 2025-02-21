import axios from 'axios';
import { SkillBookSong } from '../components/personalskillpage/SkillBookSongRow';
import { RankingSong } from '../components/rankingpage/RankingSongRow';
import { calculateFlareSkill } from '../util/DdrDefinitionUtil';
import { ChartType } from '../types/Types';
import { SongMetadata } from '../types/song';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
console.log('API_BASE_URL:', API_BASE_URL); // デバッグ用

const api = axios.create({
    baseURL: API_BASE_URL,
});

export interface CategorizedSongs {
    SP: CategorizedSkillBookSongs;
    DP: CategorizedSkillBookSongs;
}
export interface CategorizedSkillBookSongs {
    CLASSIC: SkillBookSong[];
    WHITE: SkillBookSong[];
    GOLD: SkillBookSong[];
}

export const getSkillBookSongs = async (userId: string): Promise<CategorizedSongs> => {
    const response = await api.get<CategorizedSongs>(`/api/get-player-scores/${userId}`);
    return response.data;
};

export interface Stats {
    totalFlareSkill: number;
    grade: string;
}

export interface PlayerStats {
    createdAt: string;
    updatedAt: string;
    SP: Stats;
    DP: Stats;
    skillHistory: SkillHistoryPoint[]
}

export interface SkillHistoryPoint {
    date: string; //グリニッジ標準時
    spSkillPoint: number;
    dpSkillPoint: number;
}

export const getStats = async (userId: string): Promise<PlayerStats> => {
    const response = await api.get<PlayerStats>(`/api/get-player-stat/${userId}`);
    if (Object.keys(response.data).length === 0) {
        throw new Error('Player stats are empty');
    }
    return response.data;
};


export interface RankingSongsSpDp {
    SP: RankingSongs;
    DP: RankingSongs;
}

export interface RankingSongs {
    CLASSIC: CategoryData;
    WHITE: CategoryData;
    GOLD: CategoryData;
}

interface CategoryData {
    songs: RankingSong[];
    totalCount: number;
}

export const getRankingSongs = async (grade: string, page: number = 1): Promise<RankingSongsSpDp> => {
    try {
        const response = await api.get<RankingSongsSpDp>(`/api/ranking-songs/${grade}?page=${page}`);
        const data = response.data;

        // Process each category and add flareSkill
        const processCategory = (category: CategoryData): CategoryData => {
            const processedSongs = category.songs
                .map(song => ({
                    ...song,
                    flareSkill: calculateFlareSkill(song.level, song.flareRank)
                }));

            return {
                ...category,
                songs: processedSongs
            };
        };

        // Process all categories for both SP and DP
        return {
            SP: {
                CLASSIC: processCategory(data.SP.CLASSIC),
                WHITE: processCategory(data.SP.WHITE),
                GOLD: processCategory(data.SP.GOLD)
            },
            DP: {
                CLASSIC: processCategory(data.DP.CLASSIC),
                WHITE: processCategory(data.DP.WHITE),
                GOLD: processCategory(data.DP.GOLD)
            }
        };
    } catch (error) {
        console.error('Error fetching ranking songs:', error);
        throw error;
    }
};

export const getSongMetadata = async (songId: string, chartType: ChartType): Promise<SongMetadata> => {
    const response = await api.get<SongMetadata>(`/api/songs/${songId}/metadata/${chartType}`);
    return response.data;
};

interface ScoreDistribution {
    minScore: number;
    maxScore: number;
    distribution: Array<{ scoreLowerBound: number; count: number }>;
}

interface ScoreDistributionResult {
    songId: number;
    chartType: string;
    songName: string;
    songLevel: number;
    scoreDistributions: {
        EX: ScoreDistribution;
        IX: ScoreDistribution;
    };
}

export const getScoreDistoribution = async (songId: string, chartType: string): Promise<ScoreDistributionResult> => {
    try {
        const response = await api.get<ScoreDistributionResult>(`/api/songs/${songId}/score-distribution/${chartType}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching ranking songs:', error);
        throw error;
    }
}

export interface UserListItem {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    totalFlareSkillSp: number;
    totalFlareSkillDp: number;
}

export const getRecentUsers = async (): Promise<UserListItem[]> => {
    const response = await api.get<UserListItem[]>('/api/recent_users');
    return response.data;
};

export interface GimmickAndNotes {
    hasSoflan: boolean;
    hasStop: boolean;
    hasShockArrow: boolean;
    notes: number;
    freeze: number;
    shockArrow: number;
}

export const getGimmicksAndNotes = async (songId: string, chartType: string): Promise<GimmickAndNotes> => {
    try {
        const response = await api.get<GimmickAndNotes>(`/api/songs/${songId}/gimmicks/${chartType}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching ranking songs:', error);
        throw error;
    }
}

export default api;