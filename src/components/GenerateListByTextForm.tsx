import React, { useState } from 'react';
import Button from './Button';

interface GenerateListByTextFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, text: string) => void;
  isLoading: boolean;
}

const GenerateListByTextForm: React.FC<GenerateListByTextFormProps> = ({
  handleSubmit,
  isLoading,
}) => {
  const [text, setText] = useState("2 pojedyncze filety z piersi kurczaka sól, pieprz, 1/2 łyżeczki słodkiej papryki, po szczypcie ostrej papryki i tymianku 200 g borowików, podgrzybków 1 mała cebula 175 ml bulionu drobiowego np. z eko kostki 100 ml śmietanki 30% 1 łyżka posiekanego koperku po 1 łyżce oleju, masła i mąki pszennej");

  return (
    <form
      onSubmit={(e) => handleSubmit(e, text)}
      className="p-2 lg:px-4 bg-white shadow-md rounded flex gap-4 flex-col"
    >
      <div className="relative grow">
        <textarea
          id="list-name"
          placeholder=" "
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] lg:min-h-[100px] peer block w-full rounded border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

export default GenerateListByTextForm;
