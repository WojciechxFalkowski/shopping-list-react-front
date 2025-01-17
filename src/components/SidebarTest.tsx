import { createContext, useEffect, useState } from 'react';
import { IconArrowLeft, IconArrowRight } from './Icons';
import DropdownButton from './DropDownButton';
import api from '../services/api';

export const SidebarContext = createContext({ expanded: false });

const SidebarTest: React.FC<any> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [user, setUser] = useState<{
    username: string;
    email: string;
    id: string;
  } | null>();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    api.getUser().then((userData) => {
      setUser(userData);
    });
  };

  return (
    <aside className="h-screen sticky top-0 left-0">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center h-16">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="hidden lg:block p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <IconArrowLeft width={20} height={20} />
            ) : (
              <IconArrowRight width={20} height={20} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          {user && user.username ? (
            <img
              src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${user.username}`}
              alt=""
              className="w-10 h-10 rounded-md"
            />
          ) : (
            <span></span>
          )}
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
          >
            {user ? (
              <div className="leading-4">
                <h4 className="font-semibold">{user.username}</h4>
                <span className="text-xs text-gray-600">{user.email}</span>
              </div>
            ) : (
              <span></span>
            )}
            {/* <MoreVertical size={20} /> */}
            <DropdownButton
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
          </div>
        </div>
      </nav>
    </aside>
  );
};
export default SidebarTest;
