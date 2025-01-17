import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingListEntity } from '../models/ShoppingListEntity';
import ShoppingItem from './ShoppingItem';
import AddProductForm from './AddProductForm';
import AddUserIcon from './AddUserIcon';
import { UpdateShoppingListItemDTO } from '../contracts/UpdateShoppingListItemDTO';

const ShoppingListDetails: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [shoppingList, setShoppingList] = useState<ShoppingListEntity | null>(
    null,
  );
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [editedItemId, setEditedItemId] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const fetchListDetails = async () => {
    try {
      if (!listId) {
        return;
      }
      const shoppingListRes = await api.getShoppingItemsByListId(listId);
      setShoppingList(shoppingListRes);
    } catch (error) {
      console.error('Error fetching shopping list details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListDetails();
  }, [listId]);

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      setIsAdding(true);
      if (!listId) {
        return;
      }
      if (editedItemId) {
        onEdit();
        return;
      }
      const newItem = {
        listId: listId,
        name: newItemName,
        quantity: newItemQuantity,
        purchased: false,
      };
      await api.addShoppingItem(newItem);
      await fetchListDetails();
      clearAddNewItemFields();
    } catch (error) {
      console.error('Error adding shoppingItem:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const updatedShoppingList = await api.deleteShoppingItem(itemId);
    setShoppingList(updatedShoppingList);
  };

  const onEditButton = async (itemId: string) => {
    const shoppingItem = shoppingList?.shoppingItems.find(
      (shoppingItem) => shoppingItem.id === itemId,
    );
    if (!shoppingItem) {
      return;
    }
    setNewItemName(shoppingItem.name);
    setNewItemQuantity(shoppingItem.quantity);
    setEditedItemId(shoppingItem.id);
  };

  const clearAddNewItemFields = () => {
    setNewItemName('');
    setNewItemQuantity(1);
    setEditedItemId(null);
  };

  const onEdit = async () => {
    const shoppingItem = shoppingList?.shoppingItems.find(
      (shoppingItem) => shoppingItem.id === editedItemId,
    );

    if (!shoppingItem || !editedItemId || !shoppingList) {
      return;
    }

    //
    await handleUpdateShoppingList({
      shoppingListId: shoppingList.id,
      shoppingListItemId: editedItemId,
      name: newItemName,
      quantity: newItemQuantity,
      purchased: shoppingItem.purchased,
    });

    clearAddNewItemFields();
  };

  const handleUpdateShoppingList = async (
    updateShoppingListDTO: UpdateShoppingListItemDTO,
  ) => {
    const updatedShoppingList = await api.updateShoppingItem(
      updateShoppingListDTO,
    );

    setShoppingList(updatedShoppingList);
  };

  const disableEditMode = () => {
    clearAddNewItemFields();
  };

  const handleTogglePurchased = async (itemId: string, purchased: boolean) => {
    const shoppingItem = shoppingList?.shoppingItems.find(
      (shoppingItem) => shoppingItem.id === itemId,
    );

    if (!shoppingItem || !shoppingList) {
      return;
    }

    await handleUpdateShoppingList({
      shoppingListId: shoppingList.id,
      shoppingListItemId: itemId,
      name: shoppingItem.name,
      quantity: shoppingItem.quantity,
      purchased: !shoppingItem.purchased,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const navigateToShoppingListManageUser = () => {
    if (!shoppingList) {
      return;
    }

    navigate(`/list/${shoppingList.id}/manage-user`);
  };

  return (
    <div className="relative">
      {shoppingList && (
        <>
          <h1 className="bg-white text-xs uppercase ps-2 lg:ps-4 pt-1">
            <span className="bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {shoppingList.name}
            </span>
          </h1>

          <button
            onClick={navigateToShoppingListManageUser}
            className="absolute bg-green-500 w-7 h-7 rounded-full flex justify-center items-center -top-2 lg:-top-1 right-[50%]"
          >
            <AddUserIcon width={24} height={24} fill="white" />
          </button>

          <AddProductForm
            newItemName={newItemName}
            newItemQuantity={newItemQuantity}
            setNewItemName={setNewItemName}
            setNewItemQuantity={setNewItemQuantity}
            handleAddItem={handleAddItem}
            isLoading={isAdding}
            isEditMode={Boolean(editedItemId)}
          />

          <div>
            {/* <h2 className="text-lg font-semibold">Items</h2> */}
            <ul className="mt-2 space-y-2">
              {shoppingList.shoppingItems.map((item) => (
                <ShoppingItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  purchased={item.purchased}
                  onDelete={handleDeleteItem}
                  onEdit={onEditButton}
                  onTogglePurchased={handleTogglePurchased}
                  isEditMode={editedItemId === item.id}
                  disableEditMode={disableEditMode}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingListDetails;
