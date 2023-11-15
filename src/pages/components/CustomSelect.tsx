/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Dispatch, FC, SetStateAction, useState, useEffect,
} from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-cycle
import '../../styles/styles.scss';
import { SortByOptions } from '../../types/SortByOptions';
import { SelectAmountItems } from '../../types/SelectAmountItems';

type Props = {
  options: { text: string, value: SortByOptions | SelectAmountItems }[],
  defaultOption: string,
  onChange: Dispatch<SetStateAction<{
    sortBy: SortByOptions, itemsShow: SelectAmountItems,
  }>>;
};

const CustomSelect: FC<Props> = ({ options, defaultOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    if (defaultOption === SortByOptions.AGE) {
      return 'Newest';
    }

    return defaultOption;
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (
    option: { text: string, value: SortByOptions | SelectAmountItems },
  ) => {
    setSelectedOption(option.text);

    setIsOpen(false);
    if (onChange) {
      if (SortByOptions.AGE === option.value
          || SortByOptions.NAME === option.value
          || SortByOptions.PRICE === option.value) {
        onChange((prev) => (
          { ...prev, sortBy: option.value as SortByOptions }));
      } else {
        onChange((prev) => (
          { ...prev, itemsShow: option.value as SelectAmountItems }));
      }
    }
  };

  // Add an event listener to the document body to handle clicks outside the selector
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const customSelect = document.querySelectorAll('.custom-select');

      if (customSelect
          && !customSelect[0]?.contains(target)
          && !customSelect[1]?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="custom-select" onClick={toggleDropdown}>
      <div className="selected-option">{selectedOption}</div>
      {isOpen && (
        <ul className={classNames(
          'options',
          { 'options--opened': isOpen },
        )}
        >
          {options.map((option) => (
            <li
              className="options__option"
              key={option.text}
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
