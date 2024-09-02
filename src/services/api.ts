import axios from 'axios';
import { SkillBookSong } from '../components/SkillBookSongRow';

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

export default api;