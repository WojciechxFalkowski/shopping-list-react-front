// src/components/Receipt/atoms/Heading.tsx
import React from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseClasses = 'font-bold text-gray-800';
  const sizeClasses = {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
    5: 'text-sm',
    6: 'text-xs',
  };

  return (
    <Tag className={`${baseClasses} ${sizeClasses[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
