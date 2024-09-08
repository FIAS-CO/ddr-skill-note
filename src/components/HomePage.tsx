import { useEffect, useState } from 'react';
import * as React from 'react';
import { getRecentUsers, UserListItem } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [recentUsers, setRecentUsers] = useState<UserListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <div className="container mx-auto px-4 py-8 pt-16">
            <h1 className="text-3xl font-bold mb-8">DDR フレアスキル一覧サイト</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">このサイトは何？</h2>
                <p>Dance Dance Revolutionのフレアスキルの一覧を他のプレイヤーにシェアしたり、他のユーザーが対象にしている頻度が多い楽曲の情報を公開します。<br />データのアップロードはスマホアプリ"DDR Score Manager A"から行います。</p>

                <div className="flex justify-around my-4">
                    <a href="#" className="bg-black text-white px-4 py-2 rounded">Android版ダウンロード</a>
                    <a href="#" className="bg-black text-white px-4 py-2 rounded">iOS版ダウンロード</a>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">使い方</h2>
                <p className="font-bold mb-2">※e-amusement ベーシックコース以上への加入が必要です。</p>
                <ol className="list-decimal list-inside">
                    <li>ご利用のスマホでDDR Score Manager Aをインストールします</li>
                    <li>「Gateから取得(通常)」を実行します</li>
                    <li>ログイン画面が表示されたらご自身のアカウントでログインします</li>
                    <li>処理が完了するまでお待ち下さい</li>
                    <li>「スキル帳へアップロード」を選択します</li>
                    <li>ユーザー名を入力し、「アップロード」ボタンを押下します</li>
                    <li>処理が完了するまでお待ち下さい</li>
                    <li>画面に表示されるリンクからスキル帳にアクセスします</li>
                </ol>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">最近更新したユーザ一覧</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">ユーザ名</th>
                                <th className="px-4 py-2 text-left">フレアランク(SP)</th>
                                <th className="px-4 py-2 text-left">フレアランク(DP)</th>
                                <th className="px-4 py-2 text-left">最終更新日</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-4 py-2">
                                        <Link
                                            to={`/personal-skill/${user.name}`}
                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">{user.totalFlareSkillSp}</td>
                                    <td className="px-4 py-2">{user.totalFlareSkillDp}</td>
                                    <td className="px-4 py-2">{user.updatedAt}</td>
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