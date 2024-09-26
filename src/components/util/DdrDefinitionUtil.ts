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