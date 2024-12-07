import React, { useState } from 'react';
import Button from './Button';

interface ShoppingListAddUserFormProps {
  onAdd: (userId: string) => Promise<void>;
  isAddingUser: boolean;
}

const ShoppingListAddUserForm: React.FC<ShoppingListAddUserFormProps> = ({
  onAdd,
  isAddingUser,
}) => {
  const [userId, setUserId] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!userId) {
      return;
    }
    e.preventDefault();
    onAdd(userId);
    setUserId('');
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
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="peer block w-full rounded border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="list-name"
          className="absolute left-2.5 top-2.5 text-sm text-gray-500 duration-300 transform scale-100 -translate-y-4 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-500"
        >
          Dodaj użytkownika
        </label>
      </div>

      <Button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-full h-full"
        title="Dodaj"
        isLoading={isAddingUser}
      />
    </form>
  );
};

export default ShoppingListAddUserForm;
