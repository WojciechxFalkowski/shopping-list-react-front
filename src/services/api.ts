import { ReceiptEntity } from "../models/ReceiptEntity";
import { ShoppingItemListEntity, ShoppingListEntity } from "../models/ShoppingListEntity";
import { UserEntity } from "../models/UserEntity";

const API_URL = import.meta.env.VITE_API_URL

const defaultHeaders = { 'Content-Type': 'application/json' };

const authHeaders = () => ({
  ...defaultHeaders,
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  useAuth: boolean = true,
): Promise<T> => {
  const headers = useAuth ? authHeaders() : defaultHeaders;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Fetch error: ${response.status} ${error}`);
  }

  return response.json() as Promise<T>;
};

const api = {
  register: async (user: { username: string; password: string; email: string }) =>
    await apiRequest<{ message: string }>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }, false),

  login: async (credentials: { username: string; password: string }) => {
    const { token } = await apiRequest<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, false);
    return token;
  },

  createShoppingList: async (list: { name: string }) =>
    await apiRequest<ShoppingListEntity>('/shopping-lists', {
      method: 'POST',
      body: JSON.stringify(list),
    }),

  getSharedShoppingLists: async () =>
    await apiRequest<ShoppingListEntity[]>('/shopping-lists/shared'),

  getShoppingLists: async () =>
    apiRequest<ShoppingListEntity[]>('/shopping-lists/me'),

  removeShoppingList: async (shoppingListId: string) =>
    await apiRequest<Promise<ShoppingListEntity[]>>('/shopping-lists', {
      method: 'DELETE',
      body: JSON.stringify({ shoppingListId }),
    }),

  getShoppingItemsByListId: async (listId: string) =>
    await apiRequest<ShoppingListEntity>(`/shopping-lists/${listId}`),

  addShoppingItem: async (item: {
    listId: string;
    name: string;
    quantity: number;
    purchased?: boolean
  }) =>
    await apiRequest<void>('/shopping-lists/add-shopping-item', {
      method: 'POST',
      body: JSON.stringify({
        ...item,
        purchased: item.purchased ?? false
      }),
    }),

  addShoppingItems: async (listId: string, shoppingListItems: {
    name: string;
    quantity: number;
    purchased?: boolean
  }[]) =>
    await apiRequest<void>('/shopping-lists/add-shopping-items', {
      method: 'POST',
      body: JSON.stringify({
        listId,
        shoppingListItems: shoppingListItems.map(shoppingItem => {
          return {
            ...shoppingItem,
            purchased: shoppingItem.purchased ?? false
          }
        })
      }),
    }),

  deleteShoppingItem: async (itemId: string
  ) =>
    await apiRequest<ShoppingListEntity>(`/shopping-lists/delete-shopping-item/${itemId}`, {
      method: 'DELETE',
    }),

  updateShoppingItem: async (itemId: string, item: {
    name: string;
    quantity: number;
    purchased: boolean
  }
  ) =>
    await apiRequest<void>(`/shopping-lists/update-shopping-item/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    }),

  generateShoppingListByUrl: async (url: string) =>
    await apiRequest<void>(`/ai/generate-from-url`, {
      method: 'PUT',
      body: JSON.stringify({ url })
    }),

  generateShoppingListByText: async (text: string) =>
    await apiRequest<ShoppingItemListEntity[]>(`/ai/generate-shopping-list-from-text`, {
      method: 'PUT',
      body: JSON.stringify({ text })
    }),

  addUserToSharedShoppingList: async (shoppingListId: string, userId: string) =>
    await apiRequest<UserEntity[]>('/shopping-lists/sharedWithUsers', {
      method: 'POST',
      body: JSON.stringify({
        shoppingListId,
        userId
      }),
    }),

  getSharedWithUsersByShoppingList: async (shoppingListId: string) =>
    await apiRequest<UserEntity[]>(`/shopping-lists/${shoppingListId}/sharedWithUsers`, {
      method: 'GET',
    }),

  deleteSharedUserFromShoppingList: async (shoppingListId: string,
    toBeDeletedUserId: string) =>
    await apiRequest<UserEntity[]>(`/shopping-lists/${shoppingListId}/sharedWithUsers`, {
      method: 'DELETE',
      body: JSON.stringify({
        shoppingListId,
        toBeDeletedUserId
      }),
    }),

  getReceipts: async () =>
    await apiRequest<ReceiptEntity[]>(`/receipts`, {
      method: 'GET',
    }),
};

export default api;
