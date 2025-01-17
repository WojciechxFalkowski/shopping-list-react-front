// MenuItem.tsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarContext } from './SidebarTest';

interface MenuItemProps {
  asLink?: boolean;
  path?: string | null;
  handleClick?: () => void;
  icon?: React.ReactNode;
  text: string;
  alert?: boolean;
}

// Funkcja zwracająca wspólne elementy "wnętrza"
function renderContent(props: MenuItemProps) {
  const { icon, text, alert } = props;
  const { expanded } = useContext(SidebarContext);
  return (
    <>
      <span className="w-5 h-5">{icon}</span>
      <span
        className={`overflow-hidden transition-all text-nowrap ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </>
  );
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { asLink = true, path = '/', handleClick } = props;

  const baseClasses = `
    relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer
    transition-colors group
  `;

  // Wspólna zawartość "wnętrza"
  const content = renderContent(props);

  if (asLink && path) {
    return (
      <NavLink
        to={path}
        onClick={handleClick}
        className={({ isActive }) => `
          ${baseClasses}
          ${
            isActive
              ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
              : 'hover:bg-indigo-50 text-gray-600'
          }
        `}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`
        ${baseClasses}
        hover:bg-indigo-50 text-gray-600 text-left
      `}
    >
      {content}
    </button>
  );
};

export default MenuItem;
