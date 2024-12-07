import { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import GenerateListByTextForm from '../GenerateListByTextForm';
import { ShoppingListItemEntity } from '../../models/ShoppingListItemEntity';
import ShoppingItem from '../ShoppingItem';
import AddProductForm from '../AddProductForm';
import SelectWithButton from '../SelectWithButton';
import { ShoppingListEntity } from '../../models/ShoppingListEntity';

const GenerateListByText = () => {
  const [shoppingListItems, setShoppingListItems] = useState<
    ShoppingListItemEntity[]
  >([]);

  const [editedItemId, setEditedItemId] = useState<null | string>(null);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [isGeneratingShoppingItems, setIsGeneratingShoppingItems] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
  ) => {
    try {
      e.preventDefault();
      setIsGeneratingShoppingItems(true);
      const responeShoppingListItems =
        await api.generateShoppingListByText(text);
      console.log(responeShoppingListItems);
      setShoppingListItems(responeShoppingListItems);
      clearAddNewItemFields();
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingShoppingItems(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const updatedShoppingList = shoppingListItems.filter(
      (shoppingListItem) => shoppingListItem.id !== itemId,
    );
    setShoppingListItems(updatedShoppingList);
  };

  const onEditButton = async (itemId: string) => {
    const shoppingListItem = shoppingListItems.find(
      (shoppingListItem) => shoppingListItem.id === itemId,
    );
    if (!shoppingListItem) {
      return;
    }
    setNewItemName(shoppingListItem.name);
    setNewItemQuantity(shoppingListItem.quantity);
    setEditedItemId(shoppingListItem.id);
  };

  const handleTogglePurchased = async (itemId: string, purchased: boolean) => {
    const shoppingListItem = shoppingListItems.find(
      (shoppingListItem) => shoppingListItem.id === itemId,
    );

    if (!shoppingListItem) {
      return;
    }

    shoppingListItem.purchased = purchased;
    setShoppingListItems([...shoppingListItems]);
  };

  const disableEditMode = () => {
    clearAddNewItemFields();
  };

  const clearAddNewItemFields = () => {
    setNewItemName('');
    setNewItemQuantity(1);
    setEditedItemId(null);
  };

  const onEdit = async () => {
    const shoppingListItem = shoppingListItems.find(
      (shoppingListItem) => shoppingListItem.id === editedItemId,
    );

    if (!shoppingListItem || !editedItemId) {
      return;
    }

    shoppingListItem.name = newItemName;

    clearAddNewItemFields();
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItemName.trim() || !shoppingListItems) return;

    if (editedItemId) {
      onEdit();
      return;
    }

    const newItem = {
      id: `${newItemName}${shoppingListItems.length}${newItemQuantity}`,
      name: newItemName,
      quantity: newItemQuantity,
      purchased: false,
    };

    setShoppingListItems([...shoppingListItems, newItem]);
    clearAddNewItemFields();
  };

  const [selectedShoppingListId, setSelectedShoppingListId] = useState('');
  const [isAddingNewShoppingItems, setIsAddingNewShoppingItems] =
    useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsAddingNewShoppingItems(true);
      await api.addShoppingItems(selectedShoppingListId, shoppingListItems);
    } catch (error) {
    } finally {
      setIsAddingNewShoppingItems(false);
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedShoppingListId(value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };

  const [isFetchingShoppingLists, setIsFetchingShoppingLists] = useState(true);
  const [myShoppingLists, setMyShoppingLists] = useState<ShoppingListEntity[]>(
    [],
  );

  const fetchLists = async () => {
    try {
      const myLists = await api.getShoppingLists();
      setMyShoppingLists(myLists);
    } catch (error) {
      console.error('Error fetching lists:', error);
    } finally {
      setIsFetchingShoppingLists(false);
    }
  };

  const shoppingListNames = useMemo(() => {
    return myShoppingLists.map((myShoppingList) => {
      return {
        label: myShoppingList.name,
        value: myShoppingList.id,
      };
    });
  }, [myShoppingLists]);

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <>
      <SelectWithButton
        formClassName="flex bg-white my-2 px-4 py-2 gap-2"
        onSubmit={handleFormSubmit}
        selectClassName="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        options={shoppingListNames}
        selectDisabled={isFetchingShoppingLists}
        selectValue={selectedShoppingListId}
        onSelectChange={handleSelectChange}
        selectPlaceholder="Wybierz listę zakupową"
        buttonClassName="bg-green-500 text-white rounded h-full px-2"
        buttonTitle="Dodaj do listy"
        isLoading={isAddingNewShoppingItems}
        isDisabled={
          !selectedShoppingListId ||
          !shoppingListItems.length ||
          isAddingNewShoppingItems
        }
        onButtonClick={handleButtonClick}
      />

      <GenerateListByTextForm
        handleSubmit={handleSubmit}
        isLoading={isGeneratingShoppingItems}
      />

      <div>
        <AddProductForm
          newItemName={newItemName}
          newItemQuantity={newItemQuantity}
          setNewItemName={setNewItemName}
          setNewItemQuantity={setNewItemQuantity}
          handleAddItem={handleAddItem}
          isLoading={false}
          isEditMode={Boolean(editedItemId)}
        />

        <ul className="mt-2 space-y-2">
          {shoppingListItems &&
            shoppingListItems.map((shoppingListItem, index) => (
              <ShoppingItem
                key={index}
                id={shoppingListItem.id}
                name={shoppingListItem.name}
                quantity={shoppingListItem.quantity}
                purchased={shoppingListItem.purchased}
                onDelete={handleDeleteItem}
                onEdit={onEditButton}
                onTogglePurchased={handleTogglePurchased}
                isEditMode={editedItemId === shoppingListItem.id}
                disableEditMode={disableEditMode}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default GenerateListByText;
