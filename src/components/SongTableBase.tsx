import React, { useState, useEffect } from 'react';

export interface ColumnConfig<T> {
  header: string;
  key: keyof T | null;
  sortable: boolean;
  render: (item: T, index: number) => React.ReactNode;
  className?: string; // 列ごとのクラス名
}

interface SongTableBaseProps<T> {
  items: T[];
  columns: ColumnConfig<T>[];
  initialSortKey?: keyof T;
  initialSortDirection?: 'asc' | 'desc';
  tableClassName?: string; // テーブル全体のクラス名
  headerClassName?: string; // ヘッダー行のクラス名
  rowClassName?: string; // データ行のクラス名
}

function SongTableBase<T extends object>({
  items,
  columns,
  initialSortKey,
  initialSortDirection = 'desc',
  tableClassName = '',
  headerClassName = '',
  rowClassName = '',
}: SongTableBaseProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(initialSortKey || null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
  const [sortedItems, setSortedItems] = useState<T[]>(items);

  useEffect(() => {
    if (sortKey) {
      const sorted = [...items].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      setSortedItems(sorted);
    } else {
      setSortedItems(items);
    }
  }, [items, sortKey, sortDirection]);

  const handleSort = (key: keyof T | null) => {
    if (key === null) return;
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (key: keyof T | null) => {
    if (key === null || key !== sortKey) return null;
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-600 ${tableClassName}`}>
              <thead className={`bg-gray-50 dark:bg-gray-700 ${headerClassName}`}>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${column.sortable ? 'cursor-pointer' : ''
                        } ${column.className || ''}`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      {column.header} {column.sortable && getSortIcon(column.key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {sortedItems.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} ${rowClassName}`}>
                    {columns.map((column, cellIndex) => (
                      <td key={cellIndex} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${column.className || ''}`}>
                        {column.render(item, index)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongTableBase;