import React, { useState } from 'react';
import Receipt, { ReceiptEntity } from './Receipt';
import ReceiptModal from './ReceiptModal';

interface ReceiptsGridProps {
  receipts: ReceiptEntity[];
}

const ReceiptsGrid: React.FC<ReceiptsGridProps> = ({ receipts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptEntity | null>(
    null,
  );

  const handleOpenModal = (receiptId: string) => {
    const selectedReceipt = receipts.find(
      (receipe) => receipe.id === receiptId,
    );

    if (!selectedReceipt) {
      return;
    }
    setSelectedReceipt(selectedReceipt);
    setModalOpen(true);

    lockScroll();
    // document.body.style.paddingRight = `${getScrollbarWidth()}px`;
  };

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReceipt(null);
    unlockScroll();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {receipts.map((receipt) => (
        <Receipt
          key={receipt.id}
          receipt={{ ...receipt, items: receipt.items.slice(0, 3) }}
          itemsLength={receipt.items.length}
          handleOpenModal={handleOpenModal}
        />
      ))}

      {selectedReceipt && (
        <ReceiptModal
          receipt={selectedReceipt}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ReceiptsGrid;
