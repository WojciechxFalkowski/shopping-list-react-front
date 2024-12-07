// src/components/Receipt/molecules/ReceiptHeader.tsx
import React from 'react';
import Heading from '../Heading';
import Text from '../Text';
import { ReceiptEntity } from '../../models/ReceiptEntity';

interface ReceiptHeaderProps {
  receipt: ReceiptEntity;
}

const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ receipt }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <Heading level={2}>{receipt.storeName}</Heading>
        <Text>{`${receipt.storeStreet} ${receipt.storeBuildingNumber}`}</Text>
        <Text>{`${receipt.storePostalCode} ${receipt.storeCity}, ${receipt.storeCountry}`}</Text>
        <Text>NIP: {receipt.nip}</Text>
      </div>
      <div className="mt-2 sm:mt-0">
        <Text>
          <strong>Nr Paragonu:</strong> {receipt.receiptNumber}
        </Text>
        <Text>
          <strong>Data:</strong> {receipt.date}
        </Text>
        <Text>
          <strong>Godzina:</strong> {receipt.time}
        </Text>
      </div>
    </div>
  );
};

export default ReceiptHeader;
