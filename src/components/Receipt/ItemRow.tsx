// src/components/Receipt/molecules/ItemRow.tsx
import React from 'react';
import { ReceiptItem } from '../../models/ReceiptEntity';

interface ItemRowProps {
  item: ReceiptItem;
}

const ItemRow: React.FC<ItemRowProps> = ({ item }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-200">
      <div className="w-full sm:w-1/3">
        <p className="font-medium">{item.name}</p>
        {item.remarks && (
          <p className="text-sm text-gray-500">{item.remarks}</p>
        )}
      </div>
      <div className="w-full sm:w-1/6 text-center">
        <p>{item.quantity}</p>
      </div>
      <div className="w-full sm:w-1/6 text-center">
        <p>{item.unitPrice.toFixed(2)} PLN</p>
      </div>
      <div className="w-full sm:w-1/6 text-center">
        <p>{item.category}</p>
      </div>
    </div>
  );
};

export default ItemRow;
