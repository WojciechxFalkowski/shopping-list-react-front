import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../routes';

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
  const staticRoutes: {
    label: string;
    path: string;
    onClick?: () => void;
  }[] = Object.values(ROUTES.WITHOUT_PARAMS).map((route) => ({
    label: route.label,
    path: route.path,
  }));

  const sidebarItems = [
    ...staticRoutes,
    {
      label: 'Logout',
      path: null,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 min-h-full bg-white w-full lg:w-64 lg:min-h-[100vh] lg:static transform z-20 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out shadow-lg ${className}`}
    >
      {/* Close Button */}
      {/* {onClose && (
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none lg:hidden"
          onClick={onClose}
        >
          ✕
        </button>
      )} */}

      {/* Sidebar Items */}
      <ul className="mt-16 space-y-4 px-4">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-gray-200 ${
                    isActive ? 'bg-gray-200' : ''
                  }`
                }
                onClick={onClose} // Opcjonalne zamykanie sidebaru
              >
                {item.label}
              </NavLink>
            ) : (
              <button
                onClick={item.onClick}
                className="flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-gray-200 w-full"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
