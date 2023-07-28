/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Dispatch, FC, SetStateAction, useState,
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

  return (
    <div className="custom-select" onClick={toggleDropdown}>
      <div className="selected-option">{selectedOption}</div>
      {isOpen && (
        <ul className={classNames(
          'options',
          { 'options--opened': isOpen },
        )}
        >
          {options.map((option: string) => (
            <li
              // className=
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
