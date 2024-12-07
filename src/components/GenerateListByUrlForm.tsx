import React, { useState } from 'react';
import Button from './Button';

interface GenerateListByUrlFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, url: string) => void;
  isLoading: boolean;
}

const GenerateListByUrlForm: React.FC<GenerateListByUrlFormProps> = ({
  handleSubmit,
  isLoading,
}) => {
  const [url, setUrl] = useState('https://www.przepisy.pl/przepis/frykadelki-w-sosie-cebulowym');

  return (
    <form
      onSubmit={(e) => handleSubmit(e, url)}
      className="p-2 lg:px-4 bg-white shadow-md rounded flex gap-4"
    >
      <div className="relative grow">
        <input
          type="text"
          id="list-name"
          placeholder=" "
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="peer block w-full rounded border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="list-name"
          className="absolute left-2.5 top-2.5 text-sm text-gray-500 duration-300 transform scale-100 -translate-y-4 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-500"
        >
          Nazwa listy
        </label>
      </div>

      <Button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-full h-full"
        title="Stwórz"
        isLoading={isLoading}
      />
    </form>
  );
};

export default GenerateListByUrlForm;
