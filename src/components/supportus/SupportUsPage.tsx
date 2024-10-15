import React from 'react';

const SupportUsPage: React.FC = () => {
    return (
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">サポートのお願い</h1>
                <p className="mb-4 dark:text-gray-300">いつもDDR Score ManagerおよびFlareNoteをご利用いただきありがとうございます！より皆様がゲームをお楽しみいただけるよう、アプリ開発・運営に努めています。</p>
                <p className="mb-4 dark:text-gray-300">しかし、サービス開発にあたりどうしても下記のようなコストが発生してしまいます。</p>
                <ul className="list-disc list-inside mb-4 space-y-2 pl-4 dark:text-gray-300">
                    <li>App Storeの年間登録料</li>
                    <li>サーバー管理費</li>
                    <li>ドメイン維持費</li>
                    <li>開発にかかる時間</li>
                </ul>
                <p className="mb-4 dark:text-gray-300">そうした背景から現在、下記を通じたご支援をお願いしております。</p>
                <p className="mb-4 dark:text-gray-300">もちろん、無理のない範囲でご支援をいただけますと幸いです。</p>
                <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-4 dark:text-white">サポート方法</h2>
                    <ol className="list-decimal list-outside space-y-4 pl-5 dark:text-gray-300">
                        <li>
                            <strong className="dark:text-white">サービスの紹介：</strong> 色んな方に使っていただけるのが一番のモチベーションになります。ぜひご友人との話題のネタにしていただけると嬉しいです。
                        </li>
                        <li>
                            <strong className="dark:text-white">新機能、改善の提案：</strong> 皆様の声をもとによりよいサービスにしていきたいと考えております。すべて実現できるかは分かりませんが、お気軽にX(@sig_re)までお声がけください。
                        </li>
                        <li>
                            <strong className="dark:text-white">Amazonの欲しいものリスト：</strong> DDRのときの飲み物やサプリメント、日用品をリストアップしてます。<br />ご支援いただける方は、
                            <a href="https://www.amazon.co.jp/hz/wishlist/ls/177WYFGR2KE04?ref_=wl_share"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer">こちらのリンク</a>からご覧ください。
                        </li>
                        <li>
                            <strong className="dark:text-white">投げ銭：</strong> 開発の励みになります。温かいご支援をいただけますと幸いです。
                            <ul className="list-disc list-outside space-y-2 pl-5 mt-2">
                                <li><a href="https://ofuse.me/40c38ab9"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer">OFUSE</a>：単発の投げ銭サービスです。月額支援もあります</li>
                                <li><a href="https://fantia.jp/fanclubs/522386"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer">Fantia</a>：月額で継続して支援してくださる方向けのサービスです</li>
                                <li><a href="https://patreon.com/sig_re?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer">Patreon</a>：月額で継続して支援してくださる方向けのサービスです</li>
                            </ul>
                        </li>
                    </ol>
                </div>
                <p className="mt-6 dark:text-gray-300">長期的なサービス運営や機能強化など、皆様がお楽しみいただけるよう改善に努めてまいりますので、ご検討いただけますと幸いです。</p>
                <p className="mt-4 dark:text-gray-300">今後とも当サービスをよろしくお願いいたします。</p>
                <p className="mt-4 dark:text-gray-300">(こういう投げ銭サービスを使うのは初めてなので様子がおかしかったら教えて下さいm(_ _)m)</p>
            </div>
        </div>
    );
};

export default SupportUsPage;