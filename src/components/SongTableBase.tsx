import React, { useState, useEffect } from 'react';

export interface ColumnConfig<T> {
  header: string | React.ReactNode;
  key: keyof T | null;
  sortable: boolean;
  render: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface SongTableBaseProps<T> {
  items: T[];
  columns: ColumnConfig<T>[];
  initialSortKey?: keyof T;
  initialSortDirection?: 'asc' | 'desc';
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
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
        {sortedItems.map((item, index) => (
          <tr key={index} className={rowClassName}>
            {columns.map((column, cellIndex) => (
              <td
                key={cellIndex}
                className={`py-4 text-sm text-gray-500 dark:text-gray-400 ${column.className || ''}`}
              >
                {column.render(item, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SongTableBase;