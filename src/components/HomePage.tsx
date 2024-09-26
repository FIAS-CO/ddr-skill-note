import { useEffect, useState } from 'react';
import * as React from 'react';
import { getRecentUsers, UserListItem } from '../services/api';
import { Link } from 'react-router-dom';
import useWindowSize from './util/UseWindowSize';

const HomePage: React.FC = () => {
    const [recentUsers, setRecentUsers] = useState<UserListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { width } = useWindowSize();
    const isMobile = width < 768; // md breakpoint in Tailwind

    function convertUTCtoJST(utcDateString: string): string {
        const jstDate = new Date(utcDateString);

        // 日本のローカル形式で文字列に変換し、最後に "JST" を追加
        const formattedDate = jstDate.toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        return `${formattedDate} JST`;
    }

    function convertUTCtoJST_TimeOnly(utcDateString: string): string {
        const jstDate = new Date(utcDateString);

        // 日本のローカル形式で文字列に変換し、最後に "JST" を追加
        const formattedDate = jstDate.toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return `${formattedDate} JST`;
    }

    useEffect(() => {
        const fetchRecentUsers = async () => {
            try {
                const users = await getRecentUsers();
                setRecentUsers(users);
            } catch (err) {
                setError('Failed to fetch recent users. Please try again later.');
                console.error('Error fetching recent users:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentUsers();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className={`container mx-auto py-8 pt-24 sm:pt-16 ${isMobile ? 'm-0 px-0' : 'px-4'}`}>
            <h1 className="text-3xl font-bold mb-8">DDR Flare Skill Note(お試し公開版)</h1>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">このサイトは何？</h2>
                <p>Dance Dance Revolutionのファンサイトです。<br />
                    自身のフレアスキル対象楽曲一覧を他のプレイヤーにシェアしたり、他のユーザーが対象にしている頻度が多い楽曲の情報を集計し公開します。<br />
                    データのアップロードはスマホアプリ"DDR Score Manager A"から行います。<br /></p>
                <div className="flex justify-center items-center space-x-4 my-4">
                    <a href="https://play.google.com/store/apps/details?id=jp.linanfine.dsma" target="_blank" rel="noopener noreferrer" className="inline-block">
                        <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-16" />
                    </a>
                    <a href="https://apps.apple.com/jp/app/ddr-score-manager-a/id1100126073" target="_blank" rel="noopener noreferrer" className="inline-block">
                        <img src="/app-store-badge.svg" alt="Download on the App Store" className="h-16" />
                    </a>
                </div>
                <p className="font-bold text-red-500 mb-2">※こちら、β版サイトです。データアップロード機能はAndroidのみ実装済みです。iOSは少しお待ち下さいm(_ _)m<br /></p>
                <p>ご意見、ご要望、バグの報告はX(<a href="https://x.com/sig_re" target="_blank" rel="noopener noreferrer">@sig_re</a>)までご連絡ください。<br /><br />
                    *Non-Japanese users: please use translation or ask @sig_re how to use. ;)</p>

            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">使い方</h2>
                <p className="font-bold mb-2">※e-amusement ベーシックコース以上への加入が必要です。</p>
                <ol className="list-decimal list-inside">
                    <li>ご利用のスマホでDDR Score Manager Aをインストールします</li>
                    <li>右上のメニューから「Gateから取得(通常)」を実行します</li>
                    <li>ログイン画面が表示されたらご自身のアカウントでログインします</li>
                    <li>処理が完了するまでお待ち下さい</li>
                    <li>右上のメニューから「フレアスキル帳」を選択します</li>
                    <li>ユーザー名を入力し、「ユーザー登録」ボタンを押下します</li>
                    <li>「楽曲データ送信」ボタンを押下します</li>
                    <li>処理が完了しましたら、「スキル帳ページ」ボタンでサイトにアクセスしてください</li>
                </ol>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4 dark:text-white">最近更新したユーザ一覧</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left dark:text-gray-300">ユーザ名</th>
                                <th className="px-4 py-2 text-left dark:text-gray-300">フレアランク(SP)</th>
                                <th className="px-4 py-2 text-left dark:text-gray-300">フレアランク(DP)</th>
                                <th className="px-4 py-2 text-left dark:text-gray-300">最終更新日</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                                    <td className="px-4 py-2">
                                        <Link
                                            to={`/personal-skill/${user.name}`}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                                        >
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 dark:text-gray-300">{user.totalFlareSkillSp}</td>
                                    <td className="px-4 py-2 dark:text-gray-300">{user.totalFlareSkillDp}</td>
                                    <td className="px-4 py-2 dark:text-gray-300">{!isMobile ? convertUTCtoJST(user.updatedAt) : convertUTCtoJST_TimeOnly(user.updatedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default HomePage;