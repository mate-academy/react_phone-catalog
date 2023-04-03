import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  dropdownItemHeight,
  dropdownWidth,
} from '../../helpers/constants/constants';
import { SearchLink } from '../SearchLink/SearchLink';
import './style.scss';

const firstLetterToUppercase = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

type DropdownProps = {
  title: string,
  searchName: string,
  options: string[],
};

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  searchName,
  options,
}) => {
  const [currentValue, setCurrentValue] = useState('');
  const [serchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const listHeight = dropdownItemHeight * options.length;

  useEffect(() => {
    const paramsInSearch = serchParams.get(searchName);

    if (paramsInSearch) {
      const formattedParams = firstLetterToUppercase(paramsInSearch);

      setCurrentValue(formattedParams);
    }
  }, [currentValue]);

  const handleDropdownClose = (e: MouseEvent) => {
    const element = e.target as HTMLElement;

    if (!element.className.includes('dropdown')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDropdownClose);

    return () => {
      document.removeEventListener('click', handleDropdownClose);
    };
  }, []);

  const handleDropdownOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = (text: string) => {
    setIsOpen(false);
    setCurrentValue(text);
  };

  return (
    <div
      className="dropdown"
      style={{ width: dropdownWidth }}
    >
      <p className="dropdown__title">
        {title}
      </p>

      <div
        className="dropdown__body"
      >
        <button
          style={{ width: dropdownWidth }}
          id="title"
          className="dropdown__item dropdown__item--main"
          type="button"
          onClick={handleDropdownOpen}
        >
          {currentValue || 'Choose'}

          <i className="icon icon--arrow-down dropdown__arrow" />
        </button>

        <ul
          className={classNames('dropdown__list', {
            'dropdown__list--open': isOpen,
          })}
          style={{
            width: dropdownWidth,
            height: isOpen ? listHeight : 0,
          }}
        >
          {options.map(option => (
            <SearchLink
              key={option}
              className="dropdown__item dropdown__item--option"
              params={{ [searchName]: option.toLowerCase(), page: null }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </SearchLink>
          ))}
        </ul>
      </div>
    </div>
  );
};
