import { useEffect, useState } from 'react';
import * as React from 'react';
import { getRecentUsers, UserListItem } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [recentUsers, setRecentUsers] = useState<UserListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    function convertUTCtoJST(utcDateString: string): string {
        const utcDate = new Date(utcDateString);
        const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000)); // UTCに9時間を加算

        return jstDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
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
        <div className="container mx-auto px-4 py-8 pt-16">
            <h1 className="text-3xl font-bold mb-8">DDR Flare Skill Note</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">このサイトは何？</h2>
                <p>Dance Dance Revolutionのファンサイトです。<br />
                    自身のフレアスキル対象楽曲一覧を他のプレイヤーにシェアしたり、他のユーザーが対象にしている頻度が多い楽曲の情報を集計し公開します。<br />
                    データのアップロードはスマホアプリ"DDR Score Manager A"から行います。(まだ未実装なのでちょっとまってね)<br /></p>
                <div className="flex justify-around my-4">
                    <a href="#" className="bg-black text-white px-4 py-2 rounded">Android版ダウンロード</a>
                    <a href="#" className="bg-black text-white px-4 py-2 rounded">iOS版ダウンロード</a>
                </div>
                <p className="font-bold text-red-500 mb-2">※こちら、β版サイトです。バグがあったり、データが消えたりする可能性があります。大目に見てください。<br /></p>
                <p>ご意見、ご要望、バグの報告はX(<a href="https://x.com/sig_re">@sig_re</a>)までご連絡ください。<br /><br />
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
                                    <td className="px-4 py-2">{convertUTCtoJST(user.updatedAt)}</td>
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