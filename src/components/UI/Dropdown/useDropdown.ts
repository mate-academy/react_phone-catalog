// eslint-disable-next-line import/no-cycle

import { useRef, useState } from 'react';
import { DropdownOption, DropdownProps } from './Dropdown';
import { useHeightAnimation } from '../../../enhancers/hooks/heightAnimation';

export const useDropdown = ({
  selectedOption,
  onChange,
}: DropdownProps) => {
  const openButton = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [list, listStyle] = useHeightAnimation<HTMLUListElement>(
    isOpen, { border: '1px solid var(--c-elements)' },
  );
  const openGlobalClass = isOpen ? 'dropdown__box--open' : '';

  const handleOpen = () => {
    openButton.current?.focus();
    setIsOpen(prev => !prev);
  };

  const handleBlur = () => setIsOpen(false);

  const handleOptionChange = (option: DropdownOption) => () => {
    onChange(option);
    setIsOpen(false);
  };

  const getItemClasses = (option: DropdownOption) => {
    return `dropdown__item${option === selectedOption
      ? ' dropdown__item--selected' : ''}`;
  };

  return {
    list,
    listStyle,
    openButton,
    selectedOption,
    isOpen,
    openClass: openGlobalClass,
    handleOpen,
    handleBlur,
    handleOptionChange,
    getItemClasses,
  };
};
