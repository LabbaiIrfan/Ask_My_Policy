import React from 'react';

export interface ProgressProps {
  value?: number; // 0-100
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value = 0, className = '' }) => {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full bg-gray-100 h-2 rounded ${className}`}>
      <div className="h-2 rounded bg-orange-500" style={{ width: `${pct}%` }} />
    </div>
  );
};

export default Progress;
