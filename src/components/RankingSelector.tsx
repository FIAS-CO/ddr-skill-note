import * as React from 'react';

interface GradeSelectorProps {
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
}

interface GradeOption {
  value: string;
  label: string;
}

const grades: GradeOption[] = [
  { value: 'WORLD', label: 'WORLD (90,000~)' },
  { value: 'SUN+++', label: 'SUN+++ (86,250~)' },
  { value: 'SUN++', label: 'SUN++ (82,500~)' },
  { value: 'SUN+', label: 'SUN+ (78,750~)' },
  { value: 'SUN', label: 'SUN (75,000~)' },
  { value: 'NEPTUNE+++', label: 'NEPTUNE+++ (71,250~)' },
  { value: 'NEPTUNE++', label: 'NEPTUNE++ (67,500~)' },
  { value: 'NEPTUNE+', label: 'NEPTUNE+ (63,750~)' },
  { value: 'NEPTUNE', label: 'NEPTUNE (60,000~)' },
  { value: 'URANUS+++', label: 'URANUS+++ (56,250~)' },
  { value: 'URANUS++', label: 'URANUS++ (52,500~)' },
  { value: 'URANUS+', label: 'URANUS+ (48,750~)' },
  { value: 'URANUS', label: 'URANUS (45,000~)' },
];

const GradeSelector: React.FC<GradeSelectorProps> = ({ selectedGrade, onGradeChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Grade
      </label>
      <select
        id="grade-select"
        value={selectedGrade}
        onChange={(e) => onGradeChange(e.target.value)}
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