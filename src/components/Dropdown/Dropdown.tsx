import { useSelector } from 'react-redux';
import themeStyles from '../../styles/utils/themeStyles';
import { RootState } from '../../app/store';

import './Dropdown.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { SortOption } from '../../types/sortOption';
import { QuantitativeOption } from '../../types/quantitativeOption';
import { OptionsType } from '../../types/optionsType';
import { useSearchParams } from 'react-router-dom';

type Props = {
  options: { value: string; id: number; type: string }[];
  startOption?: SortOption | QuantitativeOption | 'Select';
};

export const Dropdown: React.FC<Props> = ({
  options,
  startOption = 'Select',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentOption = searchParams.get(options[0].type) || startOption;

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpened(prev => !prev);
  };

  const handleOptionChanges = (
    value: SortOption | QuantitativeOption,
    type: OptionsType,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set(type, value);

    setSearchParams(params);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpened]);

  const { arrow } = themeStyles(currentTheme === 'light-theme');

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown__header body-text" onClick={toggleDropdown}>
        {currentOption}
        <span className="dropdown__header-icon">
          <img
            src={arrow}
            alt="dropdown arrow"
            className={classNames('icon icon-top', {
              'icon-down': isOpened || currentOption !== 'Select',
            })}
          />
        </span>
      </div>

      <div className={classNames('dropdown__content', { opened: isOpened })}>
        <ul className="dropdown__content-container">
          {options.map(option => (
            <li
              className="dropdown__content-option text-gray"
              key={option.id}
              onClick={() => {
                toggleDropdown();
                handleOptionChanges(
                  option.value as SortOption | QuantitativeOption,
                  option.type as OptionsType,
                );
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
