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

export const getRankingSongs = async (): Promise<{ [grade: string]: { SP: RankingSongs; DP: RankingSongs } }> => {
    try {
        const response = await api.get<{ [grade: string]: { SP: RankingSongs; DP: RankingSongs } }>(`/ranking-songs`);
        console.log('API Response:', response.data); // デバッグ用ログ
        return response.data;
    } catch (error) {
        console.error('Error fetching ranking songs:', error);
        throw error;
    }
};

export interface UserListItem {
    username: string;
    flareSkillSP: string;
    flareSkillDP: string;
    lastUpdated: string;
}

export const getRecentUsers = async (): Promise<UserListItem[]> => {
    const response = await api.get<UserListItem[]>('/recent-users');
    return response.data;
};

export default api;