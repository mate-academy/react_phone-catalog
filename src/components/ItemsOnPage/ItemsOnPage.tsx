import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import ArrowDown from '../../images/icons/arrow_down.svg';
import './itemsOnPage.scss';
import { SelectOption } from '../../types/SelectOtion';

type Props = {
  setItemsPerPage: (item: number) => void
};

export const ItemsOnPage: React.FC<Props> = ({ setItemsPerPage }) => {
  const options = [
    { value: 0, label: 'All' },
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
  ];

  const [value, setValue] = useState<typeof options[0]>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useMemo(() => {
    setItemsPerPage(value?.value);
  }, []);

  const selectOption = (option: SelectOption) => {
    if (option !== value) {
      setValue(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return option === value;
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  return (
    <div className="itemsOnPage">
      <p className="itemsOnPage__title">
        Items on page
      </p>
      <div
        role="button"
        tabIndex={0}
        className="itemsOnPage__container"
        onClick={() => setIsOpen(prev => !prev)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={() => setIsOpen(prev => !prev)}
      >
        <span className="itemsOnPage__value">{value?.label}</span>
        <div>
          <img
            src={ArrowDown}
            alt="arrow down"
            className={classNames(
              'itemsOnPage__caret',
              { 'itemsOnPage__caret--up': isOpen },
            )}
          />
        </div>
        <ul className={classNames(
          'itemsOnPage__options',
          { itemsOnPage__options__show: isOpen },
        )}
        >
          {options.map((option, index) => (
            <button
              type="button"
              key={option.value}
              className={classNames(
                'itemsOnPage__option',
                { itemsOnPage__option__selected: isOptionSelected(option) },
                {
                  itemsOnPage__option__highlighted: index === highlightedIndex,
                },
              )}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={e => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
            >
              {option.label}

            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};
