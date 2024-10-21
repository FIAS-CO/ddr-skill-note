import { useEffect } from 'react';
import { useCheckIsMobile } from '../util/UseWindowSize';

// 定数としての広告スロットID
const SkillNoteAdSlot = "9539196325";
const SongRankingAdSlot = "5757430651";

const hostname = "flarenote.fia-s.com";

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

// 引数adSlotでdata-ad-slotを切り替える
function AdsenseBanner({ adSlot }: { adSlot: string }) {
    const isMobile = useCheckIsMobile();

    useEffect(() => {
        if (window.location.hostname === hostname && !isMobile) {
            // AdSenseスクリプトの初期化
            const adsbygoogle = document.createElement('script');
            adsbygoogle.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            adsbygoogle.async = true;
            adsbygoogle.crossOrigin = "anonymous";
            document.head.appendChild(adsbygoogle);

            // DOMが更新された後にAdSenseを再実行
            window.adsbygoogle = window.adsbygoogle || [];
            setTimeout(() => {
                window.adsbygoogle.push({});
            }, 1000);
        }
    }, []);

    return (
        (!isMobile) ? (
            <div style={{ margin: "1.5rem 0" }}>
                <div style={{ fontSize: "13px" }}>スポンサーリンク</div>
                {window.location.hostname === hostname ? (
                    <ins className="adsbygoogle"
                        style={{
                            display: "inline-block",
                            width: "100%",
                            height: "auto",
                            textAlign: "center"                    // 広告を中央寄せ
                        }}
                        data-ad-layout="in-article"
                        data-ad-format="auto"
                        data-ad-client="ca-pub-8151928728657048"
                        data-ad-slot={adSlot} // 動的にadSlotを設定
                        data-full-width-responsive="true"></ins>
                ) : (
                    <div style={{ padding: "10px", border: "1px solid #333" }}>
                        広告
                    </div>
                )}
            </div>
        ) : (
            <div />
        )
    );
}

// SkillNoteAdBannerとSongRankingAdBannerをそれぞれ作成
export function SkillNoteAdBanner() {
    return <AdsenseBanner adSlot={SkillNoteAdSlot} />;
}

export function SongRankingAdBanner() {
    return <AdsenseBanner adSlot={SongRankingAdSlot} />;
}

export default AdsenseBanner;
