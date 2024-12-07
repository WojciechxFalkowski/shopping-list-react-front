import { ShoppingListEntity } from '../models/ShoppingListEntity';
import ShoppingListItem from './ShoppingListItem';
import Skeleton from './Skeleton';

interface CombinedLists {
  handleDeleteList: (listId: string) => void;
  combinedLists: ShoppingListEntity[];
  loading: boolean;
}

const CombinedLists: React.FC<CombinedLists> = ({
  handleDeleteList,
  combinedLists,
  loading,
}) => {
  return (
    <div className="mt-2">
      {loading ? (
        <div>
          {[1, 2, 3].map((key) => (
            <Skeleton key={key} />
          ))}
        </div>
      ) : (
        combinedLists.map((shoppingList) => (
          <ShoppingListItem
            key={shoppingList.id}
            shoppingList={shoppingList}
            handleDeleteList={handleDeleteList}
          />
        ))
      )}
    </div>
  );
};

export default CombinedLists;
