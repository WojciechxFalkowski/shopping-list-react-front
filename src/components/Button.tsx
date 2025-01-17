import React from 'react';
import Loader from './Loader';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  title,
  isLoading,
  isDisabled,
  onClick,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        type={type}
        className={`relative ${className} ${isLoading || isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isLoading || isDisabled}
      >
        {title}
      </button>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Button;
