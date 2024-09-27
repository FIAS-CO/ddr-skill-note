export function getChartTypeBackgroundClass(chartType: string): string {
    const firstChar = chartType.charAt(0).toUpperCase();

    switch (firstChar) {
        case 'B':
            return 'bg-yellow-50 dark:bg-yellow-900';
        case 'D':
            return 'bg-red-50 dark:bg-red-900';
        case 'E':
            return 'bg-green-50 dark:bg-green-900';
        case 'C':
            return 'bg-purple-50 dark:bg-purple-900';
        default:
            return 'bg-gray-50 dark:bg-gray-900';
    }
}

type FlareRankNumeric = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type FlareRankString = '-' | 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'EX';

export function convertToFlareRankString(rank: number | string): FlareRankString {
    const numRank = Number(rank);
    if (!Number.isInteger(numRank) || numRank < 0 || numRank > 10) {
        throw new Error("無効なフレアランクです。0から10の整数を指定してください。");
    }

    const flareRankStrings: FlareRankString[] = [
        '-', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'EX'
    ];

    return flareRankStrings[numRank];
}

export function convertToFlareRankNumber(rank: FlareRankString | string): FlareRankNumeric {
    const flareRankNumbers: { [key in FlareRankString]: FlareRankNumeric } = {
        '-': 0, 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
        'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'EX': 10
    };

    const upperRank = rank.toUpperCase() as FlareRankString;
    if (!(upperRank in flareRankNumbers)) {
        throw new Error("無効なフレアランク文字列です。");
    }

    return flareRankNumbers[upperRank];
}

export function calculateFlareSkill(level: number | string, flareRank: number | string): number {
    // レベルとフレアランクを数値に変換
    const numLevel = Number(level);
    const numFlareRank = Number(flareRank);

    // フレアスキルポイントのテーブル
    const flareSkillTable: number[][] = [
        [145, 153, 162, 171, 179, 188, 197, 205, 214, 223, 232],
        [155, 164, 182, 192, 201, 210, 220, 220, 229, 238, 248],
        [170, 180, 190, 200, 210, 221, 231, 241, 251, 261, 272],
        [185, 196, 207, 218, 229, 240, 251, 262, 273, 284, 296],
        [205, 217, 229, 241, 254, 266, 278, 291, 303, 315, 328],
        [230, 243, 257, 271, 285, 299, 312, 326, 340, 354, 368],
        [255, 270, 285, 300, 316, 331, 346, 362, 377, 392, 408],
        [290, 307, 324, 342, 359, 377, 394, 411, 429, 446, 464],
        [335, 355, 375, 395, 415, 435, 455, 475, 495, 515, 536],
        [400, 424, 448, 472, 496, 520, 544, 568, 592, 616, 640],
        [465, 492, 520, 548, 576, 604, 632, 660, 688, 716, 744],
        [510, 540, 571, 601, 632, 663, 693, 724, 754, 785, 816],
        [545, 577, 610, 643, 675, 708, 741, 773, 806, 839, 872],
        [575, 609, 644, 678, 713, 747, 782, 816, 851, 885, 920],
        [600, 636, 672, 708, 744, 780, 816, 852, 888, 924, 960],
        [620, 657, 694, 731, 768, 806, 843, 880, 917, 954, 992],
        [635, 673, 711, 749, 787, 825, 863, 901, 939, 977, 1016],
        [650, 689, 728, 767, 806, 845, 884, 923, 962, 1001, 1040],
        [665, 704, 744, 784, 824, 864, 904, 944, 984, 1024, 1064]
    ];

    // レベルとフレアランクが有効な範囲内かつ整数であるかチェック
    if (!Number.isInteger(numLevel) || numLevel < 1 || numLevel > 19 ||
        !Number.isInteger(numFlareRank) || numFlareRank < 0 || numFlareRank > 10) {
        return -1;
    }

    // テーブルから対応するフレアスキルポイントを返す
    return flareSkillTable[numLevel - 1][numFlareRank];
}