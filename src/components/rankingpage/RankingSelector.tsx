import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface GradeSelectorProps {
  selectedGrade: string;
}

interface GradeOption {
  value: string;
  label: string;
}

const grades: GradeOption[] = [
  { value: 'WORLD', label: 'WORLD (90,000~)' },
  { value: '93000', label: '93,000~' },
  { value: '92000', label: '92,000~' },
  { value: '91000', label: '91,000~' },
  { value: '90000', label: '90,000~' },
  { value: 'SUN+++', label: 'SUN+++ (86,250~)' },
  { value: '89000', label: '89,000~' },
  { value: '88000', label: '88,000~' },
  { value: '87000', label: '87,000~' },
  { value: 'SUN++', label: 'SUN++ (82,500~)' },
  { value: '86000', label: '86,000~' },
  { value: '85000', label: '85,000~' },
  { value: '84000', label: '84,000~' },
  { value: '83000', label: '83,000~' },
  { value: 'SUN+', label: 'SUN+ (78,750~)' },
  { value: '82000', label: '82,000~' },
  { value: '81000', label: '81,000~' },
  { value: '80000', label: '80,000~' },
  { value: '79000', label: '79,000~' },
  { value: 'SUN', label: 'SUN (75,000~)' },
  { value: '78000', label: '78,000~' },
  { value: '77000', label: '77,000~' },
  { value: '76000', label: '76,000~' },
  { value: '75000', label: '75,000~' },
  { value: 'NEPTUNE+++', label: 'NEPTUNE+++ (71,250~)' },
  { value: 'NEPTUNE++', label: 'NEPTUNE++ (67,500~)' },
  { value: 'NEPTUNE+', label: 'NEPTUNE+ (63,750~)' },
  { value: 'NEPTUNE', label: 'NEPTUNE (60,000~)' },
  { value: 'URANUS+++', label: 'URANUS+++ (56,250~)' },
  { value: 'URANUS++', label: 'URANUS++ (52,500~)' },
  { value: 'URANUS+', label: 'URANUS+ (48,750~)' },
  { value: 'URANUS', label: 'URANUS (45,000~)' },
];

const GradeSelector: React.FC<GradeSelectorProps> = ({ selectedGrade }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Grade
      </label>
      <select
        id="grade-select"
        value={selectedGrade}
        onChange={(e) => navigate(`/song-ranking/${e.target.value}`)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {grades.map((grade) => (
          <option key={grade.value} value={grade.value}>
            {grade.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelector;