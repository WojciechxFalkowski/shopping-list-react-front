import { useEffect, useState } from 'react';
import { ShoppingListEntity } from '../models/ShoppingListEntity';
import CombinedLists from './CombinedLists';
import ShoppingListForm from './ShoppingListForm';
import api from '../services/api';

interface ShoppingListContainerProps {}

const ShoppingListContainer: React.FC<ShoppingListContainerProps> = ({}) => {
  const [myShoppingLists, setMyShoppingLists] = useState<ShoppingListEntity[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const myLists = await api.getShoppingLists();
      setMyShoppingLists(myLists);
    } catch (error) {
      console.error('Error fetching lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const combinedLists: ShoppingListEntity[] = [...myShoppingLists].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const handleAddList = (newList: ShoppingListEntity) => {
    setMyShoppingLists([...myShoppingLists, newList]);
  };

  const handleDeleteList = async (shoppingListId: string) => {
    try {
      const updatedShoppingLists = await api.removeShoppingList(shoppingListId);
      myShoppingLists.find((list) => list.id !== shoppingListId);
      setMyShoppingLists(updatedShoppingLists);
    } catch (error) {}
  };

  return (
    <>
      <h1 className="bg-white text-xs uppercase ps-2 lg:ps-4 pt-1">
        <span className="bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Listy zakupów
        </span>
      </h1>

      <ShoppingListForm onAdd={handleAddList} />

      <CombinedLists
        handleDeleteList={handleDeleteList}
        combinedLists={combinedLists}
        loading={loading}
      />
    </>
  );
};

export default ShoppingListContainer;
