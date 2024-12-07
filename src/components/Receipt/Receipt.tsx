import React, { useMemo } from 'react';

export interface ReceiptEntity {
  id: string;
  storeName: string;
  storeStreet: string;
  storeBuildingNumber: string;
  storePostalCode: string;
  storeCity: string;
  storeCountry: string;
  nip: string;
  merchantCompanyRegNo: string | null;
  receiptNumber: string;
  date: string;
  time: string;
  currency: string;
  total: number;
  notes: string | null;
  items: ReceiptItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  category: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ReceiptProps {
  receipt: ReceiptEntity;
  itemsLength: number;
  handleOpenModal: (receiptId: string) => void;
}

const Receipt: React.FC<ReceiptProps> = ({
  receipt,
  itemsLength,
  handleOpenModal,
}) => {
  const totalLength = useMemo(() => {
    return itemsLength - receipt.items.length;
  }, []);

  return (
    <div className="py-4 px-2 bg-white shadow-md rounded-md border border-gray-300">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-lg font-bold uppercase">{receipt.storeName}</h1>
        <p className="text-sm">
          {receipt.date} • {receipt.time}
        </p>
      </div>
      <hr className="my-3" />

      {/* Token Section */}
      <div className="text-center relative">
        <p className="w-11px-1 uppercase text-sm font-semibold absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
          Receipt Number
        </p>

        <div className="border-dashed border-2 border-gray-400 rounded-md py-2 my-2">
          <p className="font-mono text-lg tracking-widest">
            {receipt.receiptNumber}
          </p>
        </div>
      </div>

      {/* Store Details */}
      <div className="text-sm mt-4">
        <p>
          <span className="font-semibold">Address:</span> {receipt.storeStreet}{' '}
          {receipt.storeBuildingNumber}, {receipt.storePostalCode}{' '}
          {receipt.storeCity}
        </p>
        <p>
          <span className="font-semibold">Country:</span> {receipt.storeCountry}
        </p>
        <p>
          <span className="font-semibold">NIP:</span> {receipt.nip}
        </p>
        {receipt.merchantCompanyRegNo && (
          <p>
            <span className="font-semibold">Company Reg. No:</span>{' '}
            {receipt.merchantCompanyRegNo}
          </p>
        )}
      </div>
      <hr className="my-2" />

      {/* Items */}
      <div>
        {receipt.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-xs border-b py-2"
          >
            <p>
              {item.name} (x{item.quantity})
            </p>

            <p>
              {(item.quantity * item.unitPrice).toFixed(2)} {receipt.currency}
            </p>
          </div>
        ))}

        {totalLength > 0 && (
          <button
            onClick={() => handleOpenModal(receipt.id)}
            className="text-xs text-gray-400 w-full"
          >
            Zobacz więcej [{totalLength}]
          </button>
        )}
      </div>
      {/* <hr className="my-3" /> */}

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg mt-2">
        <p>Total:</p>
        <p>
          {receipt.total.toFixed(2)} {receipt.currency}
        </p>
      </div>
      {/* <hr className="my-3" /> */}

      {/* Notes */}
      {/* {receipt.notes && (
        <div className="text-sm mt-2">
          <p>
            <span className="font-semibold">Notes:</span> {receipt.notes}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Receipt;
