import axios from 'axios';
import { SkillBookSong } from '../components/SkillBookSongRow';
import { RankingSong } from '../components/RankingSongRow';

const API_BASE_URL = 'http://localhost:3001';

export interface Stats {
    totalFlareSkill: number;
    grade: string;
}

export interface CategorizedSongs {
    CLASSIC: SkillBookSong[];
    WHITE: SkillBookSong[];
    GOLD: SkillBookSong[];
}

export interface RankingSongs {
    CLASSIC: RankingSong[];
    WHITE: RankingSong[];
    GOLD: RankingSong[];
}

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getSkillBookSongs = async (): Promise<CategorizedSongs> => {
    const response = await api.get<CategorizedSongs>('/skill-book-songs');
    return response.data;
};

export const getStats = async (): Promise<Stats> => {
    const response = await api.get<Stats>('/skill-book-stats');
    return response.data;
};

export const getRankingSongs = async (grade: string): Promise<RankingSongs> => {
    try {
        const response = await api.get<{ [grade: string]: RankingSongs }>(`/ranking-songs`);
        console.log('API Response:', response.data); // デバッグ用ログ
        if (response.data[grade]) {
            return response.data[grade];
        } else {
            console.error(`No data found for grade: ${grade}`);
            return { CLASSIC: [], WHITE: [], GOLD: [] };
        }
    } catch (error) {
        console.error('Error fetching ranking songs:', error);
        throw error;
    }
};


export default api;