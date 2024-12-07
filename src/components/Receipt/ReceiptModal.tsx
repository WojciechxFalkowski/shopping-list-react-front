import React from 'react';
import Receipt, { ReceiptEntity } from './Receipt';
import { IconClose } from '../Icons';

interface ReceiptModalProps {
  receipt: ReceiptEntity;
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  isOpen,
  onClose,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Zamyka modal tylko, jeśli kliknięto w backdrop, a nie w sam modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white w-11/12 max-w-2xl px-2 shadow-lg relative py-2">
        <button
          onClick={onClose}
          className=" text-gray-600 hover:text-gray-900 text-xl font-bold w-full "
        >
          <IconClose className="ms-auto" width={24} height={24} />
        </button>

        <div className="max-h-[90vh] overflow-y-scroll pb-6">
          <Receipt
            key={receipt.id}
            receipt={{ ...receipt, items: receipt.items }}
            itemsLength={receipt.items.length}
            handleOpenModal={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
