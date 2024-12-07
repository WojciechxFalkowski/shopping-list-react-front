import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  title?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className,
  children,
  title,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none ${className}`}
      title={title}
    >
      {children}
    </button>
  );
};

export default IconButton;
