import React, { useState } from 'react';
import api from '../services/api';
import { ShoppingListEntity } from '../models/ShoppingListEntity';
import Button from './Button';

interface ShoppingListFormProps {
  onAdd: (newList: ShoppingListEntity) => void;
}

const ShoppingListForm: React.FC<ShoppingListFormProps> = ({ onAdd }) => {
  const [name, setName] = useState<string>('');
  const [isCreatingShoppingList, setIsCreatingShoppingList] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsCreatingShoppingList(true);
      const newList = await api.createShoppingList({ name });
      onAdd(newList);
      setName('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingShoppingList(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 lg:px-4 bg-white shadow-md rounded flex gap-4"
    >
      <div className="relative grow">
        <input
          type="text"
          id="list-name"
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="peer block w-full rounded border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="list-name"
          className="absolute left-2.5 top-2.5 text-sm text-gray-500 duration-300 transform scale-100 -translate-y-4 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-500"
        >
          Nazwa listy
        </label>
      </div>

      <Button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-full h-full"
        title="Stwórz"
        isLoading={isCreatingShoppingList}
      />
    </form>
  );
};

export default ShoppingListForm;
