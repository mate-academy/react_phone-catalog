/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Dispatch, FC, SetStateAction, useState, useEffect,
} from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-cycle
import { SortByOptions } from '../PhonesPage';
import '../../styles/styles.scss';

type Props = {
  options: string[],
  defaultOption: string,
  onChange: Dispatch<SetStateAction<{ sortBy: string; itemsShow: string; }>>;
};

const CustomSelect: FC<Props> = ({ options, defaultOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      if (SortByOptions.AGE === option
          || SortByOptions.NAME === option
          || SortByOptions.PRICE === option) {
        onChange((prev) => ({ ...prev, sortBy: option }));
      } else {
        onChange((prev) => ({ ...prev, itemsShow: option }));
      }
    }
  };

  const selectorText = (optionValue: string) => {
    switch (optionValue) {
      case 'age':
        return 'Newest';
      case 'price':
        return 'Cheapest';
      case 'name':
        return 'Alphabetically';

      default:
        return optionValue.toUpperCase();
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
      <div className="selected-option">{selectorText(selectedOption)}</div>
      {isOpen && (
        <ul className={classNames(
          'options',
          { 'options--opened': isOpen },
        )}
        >
          {options.map((option: string) => (
            <li
              className="options__option"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {selectorText(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
