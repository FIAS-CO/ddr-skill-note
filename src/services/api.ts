import axios from 'axios';
import { SkillBookSong } from '../components/SkillBookSongRow';
import { RankingSong } from '../components/RankingSongRow';

const API_BASE_URL = 'http://localhost:3001';

export interface Stats {
    totalFlareSkill: number;
    grade: string;
}

export interface PlayStyle {
    CLASSIC: SkillBookSong[];
    WHITE: SkillBookSong[];
    GOLD: SkillBookSong[];
}

export interface PlayerStats {
    SP: Stats;
    DP: Stats;
}

export interface CategorizedSongs {
    SP: PlayStyle;
    DP: PlayStyle;
}

export interface RankingSongs {
    CLASSIC: RankingSong[];
    WHITE: RankingSong[];
    GOLD: RankingSong[];
}

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getSkillBookSongs = async (userId: string): Promise<CategorizedSongs> => {
    const response = await api.get<CategorizedSongs>(`/users/${userId}/skill-book-songs`);
    return response.data;
};

export const getStats = async (userId: string): Promise<PlayerStats> => {
    const response = await api.get<PlayerStats>(`/users/${userId}/skill-book-stats`);
    return response.data;
};

export const getRankingSongs = async (grade: string): Promise<{ SP: RankingSongs; DP: RankingSongs }> => {
    try {
        const response = await api.get<{ [grade: string]: { SP: RankingSongs; DP: RankingSongs } }>(`/ranking-songs`);
        console.log('API Response:', response.data); // デバッグ用ログ
        if (response.data && response.data[grade]) {
            return response.data[grade];
        } else {
            console.error(`No data found for grade: ${grade}`);
            return {
                SP: { CLASSIC: [], WHITE: [], GOLD: [] },
                DP: { CLASSIC: [], WHITE: [], GOLD: [] }
            };
        }
    } catch (error) {
        console.error('Error fetching ranking songs:', error);
        throw error;
    }
};

export default api;