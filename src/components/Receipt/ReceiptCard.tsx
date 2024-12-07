// src/components/Receipt/organisms/ReceiptCard.tsx
import React, { useState } from 'react';
import { ReceiptEntity } from '../../models/ReceiptEntity';
import ReceiptHeader from './ReceiptHeader';
import Heading from '../Heading';
import Text from '../Text';
import ItemRow from './ItemRow';

interface ReceiptCardProps {
  receipt: ReceiptEntity;
}

const ReceiptCard: React.FC<ReceiptCardProps> = ({ receipt }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
      <div
        className="cursor-pointer p-4 bg-gray-100 hover:bg-gray-200"
        onClick={toggleOpen}
      >
        <ReceiptHeader receipt={receipt} />
        <div className="flex justify-end">
          <button className="mt-2 text-blue-500 hover:underline">
            {isOpen ? 'Zwiń' : 'Rozwiń'}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          <Heading level={3} className="mb-2">
            Pozycje
          </Heading>
          <div className="hidden sm:flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="w-1/3">
              <strong>Nazwa</strong>
            </div>
            <div className="w-1/6 text-center">
              <strong>Ilość</strong>
            </div>
            <div className="w-1/6 text-center">
              <strong>Cena Jednostkowa</strong>
            </div>
            <div className="w-1/6 text-center">
              <strong>Kategoria</strong>
            </div>
          </div>
          {receipt.items.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
          <div className="mt-4 flex justify-end">
            <Text className="text-lg font-semibold">
              Razem: {receipt.total.toFixed(2)} {receipt.currency}
            </Text>
          </div>
          {receipt.notes && (
            <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 text-yellow-800 rounded">
              <Text>
                <strong>Notatki:</strong> {receipt.notes}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReceiptCard;
