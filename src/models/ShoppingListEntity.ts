import { UserEntity } from "./UserEntity";

export interface ShoppingListEntity {
  id: string;
  name: string;
  listCode: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  shoppingItems: ShoppingItemListEntity[]
  isShared: boolean;
  sharedWithUsers: UserEntity[]
}

export interface ShoppingItemListEntity {
  id: string;
  name: string;
  purchased: boolean;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}