import csv
import requests
import time
import logging
from pathlib import Path
from typing import List, Tuple

def setup_logging(log_file: str):
    """ロギングの設定"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file, encoding='utf-8'),  # ファイルへの出力
            logging.StreamHandler()  # コンソールへの出力も維持
        ]
    )

def read_csv_data(file_path: str) -> List[Tuple[int, str, str]]:
    """CSVファイルを読み込み、必要なデータを抽出する"""
    data = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                # ID, パラメータ文字列, 曲名を抽出
                data.append((int(row[0]), row[1], row[2]))
        logging.info(f"CSVファイル '{file_path}' の読み込みに成功しました。{len(data)}件のデータを取得。")
    except Exception as e:
        logging.error(f"CSVファイルの読み込み中にエラーが発生しました: {e}")
        raise
    return data

def download_image(img_param: str, save_path: Path) -> bool:
    """画像をダウンロードして保存する"""
    base_url = "https://p.eagate.573.jp/game/ddr/ddrworld/images/binary_jk.html"
    url = f"{base_url}?img={img_param}&ddrcode=21158028&kind=1"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        # 画像データを保存
        save_path.write_bytes(response.content)
        logging.info(f"画像の保存に成功: {save_path}")
        return True
    
    except requests.exceptions.RequestException as e:
        logging.error(f"画像のダウンロード中にエラーが発生 {url}: {e}")
        return False
    except Exception as e:
        logging.error(f"画像の保存中にエラーが発生 {save_path}: {e}")
        return False

def main():
    # 設定
    csv_path = "song_list.csv"  # CSVファイルのパス
    output_dir = Path("downloaded_images")  # 保存先ディレクトリ
    log_file = "download_log.txt"  # ログファイルのパス
    
    # ロギングの設定
    setup_logging(log_file)
    
    logging.info("画像ダウンロードプログラムを開始します")
    
    try:
        # 出力ディレクトリの作成
        output_dir.mkdir(exist_ok=True)
        logging.info(f"出力ディレクトリを作成/確認: {output_dir}")
        
        # CSVデータの読み込み
        songs = read_csv_data(csv_path)
        
        # 各曲の画像をダウンロード
        for song_id, img_param, song_name in songs:
            save_path = output_dir / f"img_{song_id}.jpg"
            
            logging.info(f"ダウンロード開始: {song_name} (ID: {song_id})")
            
            if download_image(img_param, save_path):
                logging.info(f"ダウンロード成功: {song_name}")
            else:
                logging.error(f"ダウンロード失敗: {song_name}")
            
            # サーバーに負荷をかけないよう少し待機
            time.sleep(1)
            
    except Exception as e:
        logging.error(f"プログラム実行中に予期せぬエラーが発生しました: {e}")
        raise
    finally:
        logging.info("画像ダウンロードプログラムを終了します")

if __name__ == "__main__":
    main()