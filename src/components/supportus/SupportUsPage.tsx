const SupportUsPage = () => {
    return (
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-0">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">サポートのお願い</h1>
                <p className="mb-4">日頃より当サービスをご利用いただき、誠にありがとうございます。私たちは、より良いサービスを提供し続けるために日々努力しております。</p>
                <p className="mb-4">現在、本サービスおよびDDR Score Managerの運営のため、以下のコストを自腹で支払っています。</p>
                <ul className="list-disc list-inside mb-4 space-y-2 pl-4">
                    <li>App Storeの年間登録料：年間約15,000円</li>
                    <li>サーバー管理費：年間7,500円</li>
                    <li>ドメイン維持費：年間1,000円</li>
                    <li>開発にかかる時間：たくさん</li>
                </ul>
                <p className="mb-4">サービスの継続的な改善と維持のため、皆様からのサポートを心よりお願いいたします。</p>
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-4">サポート方法</h2>
                    <ol className="list-decimal list-outside space-y-4 pl-5">
                        <li>
                            <strong>サービスの紹介：</strong> 最も簡単で、私たちにとって非常にありがたいサポートです。ぜひ、友人や知人にこのサービスを紹介してください。新しいユーザーが増えることで、サービスの成長と改善につながります。
                        </li>
                        <li>
                            <strong>Amazonの欲しいものリスト：</strong> DDRのときの飲み物やサプリメント、日用品をリストアップしてます。<br />ご支援いただける方は、
                            <a href="https://www.amazon.co.jp/hz/wishlist/ls/177WYFGR2KE04?ref_=wl_share"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer">こちらのリンク</a>からご覧ください。
                        </li>
                        <li>
                            <strong>投げ銭：</strong> 開発の励みになります。温かいご支援をいただけますと幸いです。
                            <ul className="list-disc list-outside space-y-2 pl-5 mt-2">
                                <li><a href="https://ofuse.me/40c38ab9"
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer">OFUSE</a>：単発の投げ銭サービスです。月額支援もあります</li>
                                <li><a href="https://fantia.jp/fanclubs/522386"
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer">Fantia</a>：月額で継続して支援してくださる方向けのサービスです</li>
                                <li><a href="https://patreon.com/sig_re?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer">Patreon</a>：月額で継続して支援してくださる方向けのサービスです</li>
                            </ul>
                        </li>
                    </ol>
                </div>
                <p className="mt-6">皆様からのどのようなサポートも、サービスの継続と改善に大きな力となります。なによりモチベーションが上がります。心より感謝申し上げます。</p>
                <p className="mt-4">今後とも当サービスをよろしくお願いいたします。</p>
                <p className="mt-4">(こういう投げ銭サービスを使うのは初めてなので設定がおかしかったら教えて下さいm(_ _)m)</p>
            </div>
        </div>
    );
};

export default SupportUsPage;