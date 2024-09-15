import axios from 'axios';
import { SkillBookSong } from '../components/SkillBookSongRow';
import { RankingSong } from '../components/RankingSongRow';

// TODO 本番URLと分岐させられるようにする
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
console.log('API_BASE_URL:', API_BASE_URL); // デバッグ用

const api = axios.create({
    baseURL: API_BASE_URL,
});


export interface CategorizedSongs {
    SP: PlayStyle;
    DP: PlayStyle;
}
export interface PlayStyle {
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
    SP: Stats;
    DP: Stats;
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
    CLASSIC: RankingSong[];
    WHITE: RankingSong[];
    GOLD: RankingSong[];
}


export const getRankingSongs = async (grade: string): Promise<RankingSongsSpDp> => {
    try {
        const response = await api.get<RankingSongsSpDp>(`/api/ranking-songs/${grade}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ranking songs:', error);
        throw error;
    }
};

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

export default api;