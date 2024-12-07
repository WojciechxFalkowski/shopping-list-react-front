// src/components/Receipt/organisms/ReceiptList.tsx
import React from 'react';
import ReceiptCard from './ReceiptCard';
import { ReceiptEntity } from '../../models/ReceiptEntity';

interface ReceiptListProps {
  receipts: ReceiptEntity[];
}

const ReceiptList: React.FC<ReceiptListProps> = ({ receipts }) => {
  if (receipts.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Brak paragonów do wyświetlenia.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {receipts.map((receipt) => (
        <ReceiptCard key={receipt.id} receipt={receipt} />
      ))}
    </div>
  );
};

export default ReceiptList;
