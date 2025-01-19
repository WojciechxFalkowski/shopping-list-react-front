import React from 'react';
import { IconAddReceipt, IconChecklist, IconLogout, IconMagicWand, IconReceipt } from './Icons';

import SidebarTest from './SidebarTest';
import MenuItem from './MenuItem';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  setToken: (token: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  className,
  setToken,
}) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Automatyczne generowanie ścieżek bez parametrów
  // const staticRoutes: {
  //   label: string;
  //   path: string;
  //   onClick?: () => void;
  // }[] = Object.values(ROUTES.WITHOUT_PARAMS).map((route) => ({
  //   label: route.label,
  //   path: route.path,
  // }));

  const sidebarMenuElemenets = [
    {
      label: 'Listy zakupów',
      path: '/',
      icon: <IconChecklist />,
    },
    {
      label: 'Wygeneruj listę',
      path: '/generate-list-by-text',
      icon: <IconMagicWand />,
    },
    {
      label: 'Paragony',
      path: '/get-receipts',
      icon: <IconReceipt />,
    },
    {
      label: 'Dodaj Paragon',
      path: '/add-receipts',
      icon: <IconAddReceipt />,
    },
    {
      label: 'Logout',
      path: null,
      onClick: handleLogout,
      icon: <IconLogout />,
    },
  ];
  // lg:w-64  w-full
  return (
    <div
      className={`fixed top-0 w-full lg:w-auto left-0 min-h-full bg-white lg:min-h-[100vh] lg:static transform z-20 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out shadow-lg ${className}`}
    >
      <SidebarTest>
        {sidebarMenuElemenets.map((sidebarElement, index) => {
          return (
            <MenuItem
              asLink={Boolean(sidebarElement.path)}
              path={sidebarElement.path}
              icon={sidebarElement.icon}
              text={sidebarElement.label}
              alert={false}
              handleClick={() => {
                if (onClose) {
                  onClose();
                }
                if (sidebarElement.onClick) {
                  sidebarElement.onClick();
                }
              }}
              key={index}
            />
          );
        })}
      </SidebarTest>
    </div>
  );
};

export default Sidebar;
