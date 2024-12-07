import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="bg-gray-200 p-4 mb-4 rounded shadow animate-pulse">
      <div className="h-8 mb-2 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
    </div>
  );
};

export default Skeleton;