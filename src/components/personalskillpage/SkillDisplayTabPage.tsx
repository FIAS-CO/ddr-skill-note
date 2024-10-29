import { useState } from "react";
import { PlayerStats, CategorizedSongs, CategorizedSkillBookSongs } from "../../services/api";
import { Category, PlayStyle } from "../../types/Types";
import CategoryTab from "../CategoryTab";
import SkillBookSongTable from "./SkillBookSongTable";
import { SkillHistoryGraph } from "./SkillHistoryGraph";
import StatsOverview from "./StatsOverview";

// スキル情報表示用コンポーネント
interface SkillDisplayProps {
    activeTab: PlayStyle;
    activeCategoryTab: Category;
    stats: PlayerStats;
    songs: CategorizedSongs;
    onCategoryTabChange: (tab: Category) => void;
}

export const SkillDisplayTabPage: React.FC<SkillDisplayProps> = ({
    activeTab,
    activeCategoryTab,
    stats,
    songs,
    onCategoryTabChange,
}) => {

    const [isGraphVisible, setIsGraphVisible] = useState(false);

    const renderCategoryTable = (category: keyof CategorizedSkillBookSongs, playStyle: PlayStyle) => {
        if (!songs || !songs[playStyle] || !songs[playStyle][category]) {
            return <div>この{category}カテゴリーにはデータがありません。</div>;
        }
        const categorySongs = songs[playStyle][category];

        const categoryTotalFlareSkill = categorySongs
            .sort((a, b) => b.flareSkill - a.flareSkill) // flareSkillの降順でソート
            .slice(0, 30) // 上位30曲を選択
            .reduce((total, song) => total + song.flareSkill, 0); // 選択された曲のflareSkillを合計
        console.log(`display player skill - ${playStyle}/${category}`)
        return (
            <div key={`${playStyle}-${category}`} className="mb-8">
                <h2 className="text-xl font-bold mb-2">{category} - トータルフレアスキル: {categoryTotalFlareSkill}</h2>
                <SkillBookSongTable songs={categorySongs} />
            </div>
        );
    };

    return (
        <div>
            <StatsOverview
                totalFlareSkill={stats[activeTab].totalFlareSkill}
                grade={stats[activeTab].grade}
                playStyle={activeTab}
            />

            <div className="mb-6">
                <button
                    onClick={() => setIsGraphVisible(!isGraphVisible)}
                    className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    <span className="text-xl font-bold dark:text-white flex items-center gap-2">
                        {isGraphVisible ? '▼' : '▶'}
                        Flare Skill History
                    </span>
                </button>

                {/* グラフ本体 - アニメーション付きの展開/収納 */}
                <div
                    className={`transform transition-all duration-300 ease-in-out overflow-hidden ${isGraphVisible ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                >
                    <SkillHistoryGraph
                        playStyle={activeTab}
                        skillHistory={stats.skillHistory}
                    />
                </div>
            </div>

            <CategoryTab
                activeTab={activeCategoryTab}
                onTabChange={onCategoryTabChange}
            />
            {renderCategoryTable(activeCategoryTab, activeTab)}
        </div>
    );
};
