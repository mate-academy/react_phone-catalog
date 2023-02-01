import classNames from 'classnames';
import React, {
  useEffect, useRef, useState,
} from 'react';

type Props = {
  filterTitle: string,
  filterOptions: string[],
  currentOption: string,
  onSelect: (value: string) => void,
};

export const Select: React.FC<Props> = ({
  filterTitle,
  filterOptions,
  currentOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectField = useRef<HTMLButtonElement | null>(null);
  const dropdownList = useRef<HTMLDivElement | null>(null);

  // const updateSearch = (value: string) => {

  // }

  useEffect(() => {
    if (dropdownList.current && selectField.current) {
      const { offsetHeight } = selectField.current;
      const { style } = dropdownList.current;

      if (isOpen) {
        style.height = `${4 * offsetHeight}px`;
        style.borderBottomWidth = '1px';
      } else {
        style.height = '0';
        style.borderBottomWidth = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className="select">
      <div className="select__title">
        {filterTitle}
      </div>
      <button
        aria-label="selectBtn"
        type="button"
        className={classNames(
          'select__field',
          'select__field--sort',
          { 'select__field--open': isOpen },
        )}
        ref={selectField}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {currentOption}
      </button>
      <div
        className="select__dropdown-list"
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="dropdown-list" ref={dropdownList}>
          {filterOptions.map(option => (
            <button
              key={option}
              aria-label="optionBtn"
              type="button"
              className="
                dropdown-list__item
              "
              onClick={() => {
                setIsOpen(false);
                onSelect(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
