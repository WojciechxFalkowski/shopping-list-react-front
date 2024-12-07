import ShoppingListAddUserForm from '../ShoppingListAddUserForm';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { UserEntity } from '../../models/UserEntity';
import Loader from '../Loader';
import { IconDelete } from '../Icons';
const ShoppingListManageUser = () => {
  const { listId } = useParams<{ listId: string }>();
  const [sharedWithUsers, setSharedWithUsers] = useState<UserEntity[]>([]);
  const [isFetchingSharedUsers, setIsFetchingSharedUsers] = useState(true);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isDeletingSharedUser, setIsDeletingSharedUser] = useState(false);

  const fetchListDetails = async () => {
    try {
      if (!listId) {
        return;
      }
      const sharedWithUsersRes =
        await api.getSharedWithUsersByShoppingList(listId);
      setSharedWithUsers(sharedWithUsersRes);
    } catch (error) {
      console.error('Error fetching shopping list details:', error);
    } finally {
      setIsFetchingSharedUsers(false);
      console.log(sharedWithUsers);
    }
  };

  useEffect(() => {
    fetchListDetails();
  }, [listId]);

  const onAdd = async (userId: string) => {
    try {
      if (!listId) {
        return;
      }
      setIsAddingUser(true);
      const updatedList = await api.addUserToSharedShoppingList(listId, userId);
      setSharedWithUsers(updatedList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingUser(false);
    }
  };
  const handleDeleteSharedUser = async (toBeDeletedUserId: string) => {
    try {
      if (!listId) {
        return;
      }
      setIsDeletingSharedUser(true);
      console.log(isDeletingSharedUser);
      const updatedList = await api.deleteSharedUserFromShoppingList(
        listId,
        toBeDeletedUserId,
      );
      setSharedWithUsers(updatedList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingSharedUser(false);
    }
  };
  return (
    <>
      <ShoppingListAddUserForm onAdd={onAdd} isAddingUser={isAddingUser} />

      {isFetchingSharedUsers ? (
        <Loader />
      ) : (
        <div className="mt-2">
          {sharedWithUsers.map((sharedWithUser) => {
            return (
              <article
                className="flex justify-between items-center bg-white px-2 lg:px-4 py-2 mb-2 rounded shadow relative"
                key={sharedWithUser.id}
              >
                <span>{sharedWithUser.username}</span>

                <button
                  onClick={() => handleDeleteSharedUser(sharedWithUser.id)}
                >
                  <IconDelete />
                </button>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ShoppingListManageUser;
