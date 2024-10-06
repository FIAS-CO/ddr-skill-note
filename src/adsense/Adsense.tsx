// https://www.sukerou.com/2023/01/react-adsense.html

import { useEffect } from 'react'

const hostname = "flarenote.fia-s.com"  //本番サイトのホスト名

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: any;
  }
}

function Adsense() {
  useEffect(() => {
    if (window.location.hostname == hostname) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div style={{ margin: "1.5rem 0" }}>
      <div style={{ fontSize: "13px" }}>スポンサーリンク</div>
      {window.location.hostname == hostname ?
        (
          <ins className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXX"></ins>
        ) :
        (
          <div style={{ padding: "10px", border: "1px solid #333" }}>
            広告
          </div>
        )}
    </div>
  )
}

export default Adsense