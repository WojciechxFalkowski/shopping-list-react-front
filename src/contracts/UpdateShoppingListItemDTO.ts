export interface UpdateShoppingListItemDTO {
    shoppingListId: string,
    shoppingListItemId: string,
    name: string;
    quantity: number;
    purchased: boolean
}