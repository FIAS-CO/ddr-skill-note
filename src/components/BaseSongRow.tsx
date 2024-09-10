import { BaseSong, BaseSongRowProps } from '../types/song';

const BaseSongRow = <T extends BaseSong>({ song, renderCells, className = '' }: BaseSongRowProps<T>) => (
  <tr className={`hover:bg-gray-50 ${className}`}>
    {renderCells(song).map((cell, index) => (
      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm">
        {cell}
      </td>
    ))}
  </tr>
);

export default BaseSongRow;