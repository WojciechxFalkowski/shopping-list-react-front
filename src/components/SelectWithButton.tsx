import React from 'react';
import Button from './Button';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectWithButtonProps {
  formClassName?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;

  selectClassName?: string;
  options: SelectOption[];
  selectDisabled?: boolean;
  selectValue?: string;
  onSelectChange?: (value: string) => void;
  selectPlaceholder?: string;

  buttonClassName?: string;
  buttonTitle?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SelectWithButton: React.FC<SelectWithButtonProps> = ({
  formClassName = 'flex bg-white my-2 px-4 py-2 gap-2',
  onSubmit,
  selectClassName = 'flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5',
  options,
  selectDisabled = false,
  selectValue,
  onSelectChange,
  selectPlaceholder = 'Wybierz opcję',
  buttonClassName = 'bg-green-500 text-white rounded h-full px-2',
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <form className={formClassName} onSubmit={onSubmit}>
      <select
        disabled={selectDisabled}
        className={selectClassName}
        value={selectValue}
        onChange={(e) => onSelectChange?.(e.target.value)}
      >
        {selectPlaceholder && (
          <option disabled={!selectValue} value="">
            {selectPlaceholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <Button
        title="Dodaj do listy"
        type="submit"
        className={buttonClassName}
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};

export default SelectWithButton;
