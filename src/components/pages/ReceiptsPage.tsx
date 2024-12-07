// src/components/Receipt/pages/ReceiptsPage.tsx
import React, { useEffect, useState } from 'react';
import { ReceiptEntity } from '../../models/ReceiptEntity';
import Text from '../Text';
import Heading from '../Heading';
import api from '../../services/api';
import ReceiptsGrid from '../Receipt/ReceiptsGrid';

const ReceiptsPage: React.FC = () => {
  const [receipts, setReceipts] = useState<ReceiptEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        // Zastąp poniższy URL swoim endpointem API
        const response = await api.getReceipts();
        setReceipts(response);
      } catch (err) {
        setError('Błąd podczas pobierania paragonów.');
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) {
    return (
      <div className="">
        <Text className="text-center text-gray-500">
          Ładowanie paragonów...
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <Text className="text-center text-red-500">{error}</Text>
      </div>
    );
  }

  return (
    <div className="">
      <Heading level={1} className="mb-6 text-center">
        Moje Paragony
      </Heading>
      {/* <ReceiptList receipts={receipts} /> */}

      <ReceiptsGrid receipts={receipts} />
    </div>
  );
};

export default ReceiptsPage;
