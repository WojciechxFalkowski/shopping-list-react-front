import React, { useState } from 'react';
import DropdownButton from './DropDownButton';
import { ShoppingListEntity } from '../models/ShoppingListEntity';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconBox, IconLock, IconUnlock, IconLink } from './Icons';
interface ShoppingListItemProps {
  shoppingList: ShoppingListEntity;
  handleDeleteList: (shoppingListId: string) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  shoppingList,
  handleDeleteList,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const navigateToShoppingList = () => {
    navigate(`/list/${shoppingList.id}`);
  };

  return (
    // <NavLink
    // to={`/list/${shoppingList.id}`}
    <article
      onClick={navigateToShoppingList}
      className="bg-white px-2 lg:px-4 py-2 mb-2 rounded shadow relative cursor-pointer"
    >
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <h2 className="text-sm font-semibold">{shoppingList.name}</h2>

        <div className="flex items-center justify-between lg:justify-center">
          <div className="flex gap-1">
            <span className="flex items-center justify-center gap-1 bg-orange-200 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
              <IconUser width={12} height={12} />

              <span>{shoppingList.sharedWithUsers.length}</span>
            </span>

            <span className="flex items-center justify-center gap-1 bg-purple-200 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              <IconBox width={12} height={12} />

              <span>{shoppingList.shoppingItems.length}</span>
            </span>

            {shoppingList.isShared ? (
              <span className="flex items-center justify-center bg-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                <IconLink width={12} height={12} />
              </span>
            ) : (
              <span className="flex items-center justify-center bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {shoppingList.sharedWithUsers.length > 0 ? (
                  <IconUnlock width={12} height={12} />
                ) : (
                  <IconLock width={12} height={12} />
                )}
              </span>
            )}
          </div>

          <span onClick={(e) => e.stopPropagation()}>
            <DropdownButton
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
          </span>
        </div>
      </header>

      {isDropdownOpen && (
        <div
          className="absolute z-10 right-0 mt-2 bg-white rounded-lg shadow divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600"
          onClick={(e) => e.stopPropagation()} // Zablokuj propagację kliknięcia dla dropdownu
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteList(shoppingList.id);
                  setIsDropdownOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      )}

      <footer className="text-right">
        <span className="text-xs text-gray-500 ml-2">
          Updated: {new Date(shoppingList.updatedAt).toLocaleString()}
        </span>
      </footer>
    </article>
  );
};

export default ShoppingListItem;
