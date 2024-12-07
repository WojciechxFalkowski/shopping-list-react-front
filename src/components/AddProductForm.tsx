import React from 'react';
import Button from './Button';

interface AddProductFormProps {
  newItemName: string;
  newItemQuantity: number;
  setNewItemName: (value: string) => void;
  setNewItemQuantity: (value: number) => void;
  handleAddItem: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  isEditMode: boolean;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  newItemName,
  newItemQuantity,
  setNewItemName,
  setNewItemQuantity,
  handleAddItem,
  isLoading = false,
  isEditMode,
}) => {
  return (
    <form
      onSubmit={handleAddItem}
      className="flex gap-4 bg-white p-2 lg:px-4 flex-col lg:flex-row"
    >
      <div className="flex gap-2 grow">
        <div className="relative grow">
          <input
            type="text"
            id="item-name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="peer block w-full rounded border border-gray-300 bg-transparent px-2.5 pb-2 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nazwa produktu"
          />
          <label
            htmlFor="item-name"
            className="absolute left-2.5 top-2.5 text-sm text-gray-500 duration-300 transform scale-100 -translate-y-4 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-500"
          >
            Nazwa produktu
          </label>
        </div>

        <div className="relative">
          <input
            type="number"
            id="item-quantity"
            min="1"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(Number(e.target.value))}
            className="peer block w-16 rounded border border-gray-300 bg-transparent px-2.5 pb-2 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Ilość"
          />
          <label
            htmlFor="item-quantity"
            className="absolute left-2.5 top-2.5 text-sm text-gray-500 duration-300 transform scale-100 -translate-y-4 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-500"
          >
            Ilość
          </label>
        </div>

        <Button
          type="submit"
          className={` text-white px-2 h-full rounded w-full lg:w-auto ${isEditMode ? 'bg-blue-500' : 'bg-green-500'}`}
          title={isEditMode ? 'Edytuj' : 'Dodaj'}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default AddProductForm;
