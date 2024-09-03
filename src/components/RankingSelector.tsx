import * as React from 'react';

interface GradeSelectorProps {
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
}

const grades = [
  'WORLD',
  'SUN+++',
  'SUN++',
  'SUN+',
  'SUN',
  'NEPTUNE+++',
  'NEPTUNE++',
  'NEPTUNE+',
  'NEPTUNE',
  'URANUS+++',
  'URANUS++',
  'URANUS+',
  'URANUS',
  // Add more grades as needed
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
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelector;