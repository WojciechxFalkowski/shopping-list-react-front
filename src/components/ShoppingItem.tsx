import React, { useState } from 'react';
import Checkbox from './Checkbox';
import DropdownButton from './DropDownButton';
import IconButton from './IconButton';
import IconCheckSquare from './CheckSquareIcon';

interface ShoppingItemProps {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
  onTogglePurchased: (id: string, purchased: boolean) => void;
  isEditMode: boolean;
  disableEditMode: () => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  id,
  name,
  quantity,
  purchased,
  isEditMode,
  onDelete,
  onEdit,
  onTogglePurchased,
  disableEditMode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <li className="flex items-center justify-between bg-white p-2 lg:px-4 rounded shadow relative">
      <div className="flex w-full gap-4">
        <Checkbox
          checked={purchased}
          onChange={(newState) => onTogglePurchased(id, newState)}
        />
        <div className="flex items-center w-full justify-between">
          <p className="font-medium">{name}</p>
          <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {quantity}
          </span>
        </div>
      </div>

      {isEditMode ? (
        <IconButton
          onClick={disableEditMode}
          className="inline-flex items-center w-[26px] h-[26px] ms-1 p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          title="title"
        >
          <IconCheckSquare />
        </IconButton>
      ) : (
        <span onClick={(e) => e.stopPropagation()}>
          <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
        </span>
      )}

      {isDropdownOpen && (
        <div
          className="absolute z-10 right-0 mt-2 bg-white rounded-lg shadow divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {onEdit && (
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(id);
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
            )}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(id);
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
    </li>
  );
};

export default ShoppingItem;
