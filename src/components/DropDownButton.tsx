import React, { useState } from 'react';
import DotsMenuIcon from './DotsMenuIcon';

interface DropdownButtonProps {
  onClick?: () => void;
  isOpen?: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ onClick, isOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen || false);

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center ms-1 p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <DotsMenuIcon />
    </button>
  );
};

export default DropdownButton;