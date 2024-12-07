import React from 'react';

interface BurgerIconProps {
  isOpen: boolean;
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ isOpen }) => {
  return (
    <svg className={`vbp-header-menu-button__svg ${isOpen ? 'menu-open' : ''}`}>
      <line x1="0" y1="50%" x2="100%" y2="50%" className="top" />
      <line x1="0" y1="50%" x2="100%" y2="50%" className="middle" />
      <line x1="0" y1="50%" x2="100%" y2="50%" className="bottom" />
    </svg>
  );
};

export default BurgerIcon;
