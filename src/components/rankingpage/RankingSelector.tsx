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
  { value: 'WORLD', label: 'WORLD (90,000～)' },
  { value: 'SUN+++', label: 'SUN+++ (86,250～89,999)' },
  { value: 'SUN++', label: 'SUN++ (82,500～86,249)' },
  { value: 'SUN+', label: 'SUN+ (78,750～82,499)' },
  { value: 'SUN', label: 'SUN (75,000～78,749)' },
  { value: 'NEPTUNE+++', label: 'NEPTUNE+++ (71,250～74,999)' },
  { value: 'NEPTUNE++', label: 'NEPTUNE++ (67,500～71,249)' },
  { value: 'NEPTUNE+', label: 'NEPTUNE+ (63,750～67,499)' },
  { value: 'NEPTUNE', label: 'NEPTUNE (60,000～63,749)' },
  { value: 'URANUS+++', label: 'URANUS+++ (56,250～59,999)' },
  { value: 'URANUS++', label: 'URANUS++ (52,500～56,249)' },
  { value: 'URANUS+', label: 'URANUS+ (48,750～52,499)' },
  { value: 'URANUS', label: 'URANUS (45,000～48,749)' },
  { value: '93000', label: '93,000～' },
  { value: '92000', label: '92,000～92,999' },
  { value: '91000', label: '91,000～91,999' },
  { value: '90000', label: '90,000～90,999' },
  { value: '89000', label: '89,000～89,999' },
  { value: '88000', label: '88,000～88,999' },
  { value: '87000', label: '87,000～87,999' },
  { value: '86000', label: '86,000～86,999' },
  { value: '85000', label: '85,000～85,999' },
  { value: '84000', label: '84,000～84,999' },
  { value: '83000', label: '83,000～83,999' },
  { value: '82000', label: '82,000～82,999' },
  { value: '81000', label: '81,000～81,999' },
  { value: '80000', label: '80,000～80,999' },
  { value: '79000', label: '79,000～79,999' },
  { value: '78000', label: '78,000～78,999' },
  { value: '77000', label: '77,000～77,999' },
  { value: '76000', label: '76,000～76,999' },
  { value: '75000', label: '75,000～75,999' },
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