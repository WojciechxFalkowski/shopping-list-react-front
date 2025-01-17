import React, { useState } from 'react';
import Button from '../Button';
import Heading from '../Heading';
import api from '../../services/api';

const AddReceiptPage: React.FC = () => {
  const templateWithComments = `{
  "storeName": "", // Nazwa sklepu, np. "Apteka Z Uśmiechem", "IKEA"
  "storeStreet": "", // Ulica sklepu, np. "ul. Powstańców", "ul. Malborska"
  "storeBuildingNumber": "", // Numer budynku, np. "51", "62 lok. 430"
  "storePostalCode": "", // Kod pocztowy, np. "05-091", "03-286"
  "storeCity": "", // Miasto, np. "Ząbki", "Warszawa"
  "storeCountry": "", // Kraj, np. "PL", "POLSKA"
  "nip": "", // NIP, np. "125-16-25-347", "527-010-33-85"
  "merchantCompanyRegNo": "", // Opcjonalny numer rejestracyjny firmy, np. "000015490"
  "receiptNumber": "", // Numer paragonu, np. "1616", "307/81/117"
  "date": "", // Data w formacie YYYY-MM-DD, np. "2024-11-26", "2024-12-07"
  "time": "", // Czas w formacie HH:mm, np. "12:46", "15:10"
  "currency": "PLN", // Waluta, np. "PLN"
  "total": 0, // Łączna kwota, np. 116.95, 184.95
  "notes": "", // Notatki, np. "PARAGON FISKALNY"
  "items": [ // Lista produktów, np. "Levopront syrop 120ml", "VINTERSAGA kalendarz"
    {
      "name": "", // Nazwa produktu, np. "Levopront syrop 120ml", "BUMERANG wieszak"
      "quantity": 0, // Ilość, np. 1, 2
      "unitPrice": 0, // Cena jednostkowa, np. 29.99, 40.00
      "category": "", // Kategoria produktu, np. "MEDICINE", "DECORATION"
      "remarks": "" // Uwagi, np. "Bez recepty", ""
    }
  ]
}`;

  const templateNoComments = `{
  "storeName": "",
  "storeStreet": "",
  "storeBuildingNumber": "",
  "storePostalCode": "",
  "storeCity": "",
  "storeCountry": "",
  "nip": "",
  "merchantCompanyRegNo": "",
  "receiptNumber": "",
  "date": "",
  "time": "",
  "currency": "PLN",
  "total": 0,
  "notes": "",
  "items": [
    {
      "name": "",
      "quantity": 0,
      "unitPrice": 0,
      "category": "",
      "remarks": ""
    }
  ]
}`;

  const [textValue, setTextValue] = useState(templateNoComments);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Błąd podczas kopiowania do schowka: ', err);
    }
  };

  const handleWithComments = () => {
    setTextValue(templateWithComments);
    copyToClipboard(templateWithComments);
  };

  const handleNoComments = () => {
    setTextValue(templateNoComments);
    copyToClipboard(templateNoComments);
  };

  const handleCreateReceipt = async () => {
    try {
      // Parsujemy zawartość textValue jako JSON:
      let receiptData = JSON.parse(textValue);

      receiptData = JSON.parse(`{
  "storeName": "PARTYLANS Dariusz Wojciechowski",
  "storeStreet": "ul. Kępna",
  "storeBuildingNumber": "2b lok. E2",
  "storePostalCode": "03-730",
  "storeCity": "Warszawa",
  "storeCountry": "PL",
  "nip": "5261369741",
  "merchantCompanyRegNo": "",
  "receiptNumber": "000031541",
  "date": "2024-12-09",
  "time": "17:21",
  "currency": "PLN",
  "total": 12.00,
  "notes": "PARAGON FISKALNY",
  "items": [
    {
      "name": "Maska Salvador Dali 11792",
      "quantity": 1,
      "unitPrice": 12.00,
      "category": "ACCESSORIES",
      "remarks": ""
    }
  ]
}
`);

      // Wywołujemy metodę addReceipt z obiektu api:
      await api.addReceipt(receiptData);

      console.log('Paragon został pomyślnie utworzony!');
    } catch (error) {
      console.error('Błąd podczas tworzenia paragonu:', error);
    }
  };

  return (
    <div>
      <Heading level={1} className="mb-6 text-center">
        Dodaj nowy paragon
      </Heading>

      <div className="flex gap-1 mb-1">
        <Button
          onClick={handleWithComments}
          className="bg-blue-500 text-white p-1 rounded text-sm"
          title=" Skopiuj szkic z komentarzami"
        />

        <Button
          onClick={handleNoComments}
          className="bg-blue-500 text-white p-1 rounded text-sm"
          title=" Skopiuj szkic bez komentarzy"
        />
      </div>

      <textarea
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        style={{ width: '100%', height: '500px', fontFamily: 'monospace' }}
      />

      <Button
        onClick={handleCreateReceipt}
        className="bg-green-500 text-white p-2 rounded w-full h-full"
        title="Stwórz paragon"
      />
    </div>
  );
};

export default AddReceiptPage;
