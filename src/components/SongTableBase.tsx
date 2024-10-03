import React, { useState, useEffect } from 'react';

export type SortType = 'string' | 'number';
export interface ColumnConfig<T> {
  header: string | React.ReactNode;
  key: keyof T | null;
  sortable: boolean;
  sortType?: SortType;
  render: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface SongTableBaseProps<T extends { chartType: string }> {
  items: T[];
  columns: ColumnConfig<T>[];
  initialSortKey?: keyof T;
  initialSortDirection?: 'asc' | 'desc';
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string | ((item: T) => string);
  getBackgroundClass?: (chartType: string) => string;
}

function SongTableBase<T extends { chartType: string }>({
  items,
  columns,
  initialSortKey,
  initialSortDirection = 'desc',
  tableClassName = '',
  headerClassName = '',
  rowClassName = '',
  getBackgroundClass = (_) => ""
}: SongTableBaseProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(initialSortKey || null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
  const [sortedItems, setSortedItems] = useState<T[]>(items);

  useEffect(() => {
    if (sortKey) {
      const sorted = [...items].sort((a, b) => {
        const column = columns.find(col => col.key === sortKey);
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        // sortType が設定されていない場合は 'string' として扱う
        const effectiveSortType = column?.sortType ?? 'string';

        if (effectiveSortType === 'number') {
          return sortDirection === 'asc'
            ? (Number(aValue) - Number(bValue))
            : (Number(bValue) - Number(aValue));
        } else {
          // 'string' 型の場合（デフォルト）
          return sortDirection === 'asc'
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }
      });
      setSortedItems(sorted);
    } else {
      setSortedItems(items);
    }
  }, [items, sortKey, sortDirection, columns]);

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
    <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-600 ${tableClassName}`}>
      <thead className={headerClassName}>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className={`py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${column.sortable ? 'cursor-pointer' : ''
                } ${column.className || ''}`}
              onClick={() => column.sortable && handleSort(column.key)}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  {column.header}
                  {column.sortable && (
                    <span className="inline-block w-3 ml-1">
                      {getSortIcon(column.key)}
                    </span>
                  )}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
        {sortedItems.map((item, index) => {
          const dynamicRowClassName = typeof rowClassName === 'function' ? rowClassName(item) : rowClassName;
          const backgroundClass = getBackgroundClass(item.chartType);
          return (
            <tr key={index} className={`${dynamicRowClassName} ${backgroundClass}`}>
              {columns.map((column, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`py-4 text-sm text-gray-500 dark:text-gray-400 ${column.className || ''}`}
                >
                  {column.render(item, index)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SongTableBase;