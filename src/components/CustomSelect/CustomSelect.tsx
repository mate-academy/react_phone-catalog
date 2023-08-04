import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './CustomSelect.scss';

type PropsS = {
  value: string;
  isSelect: boolean;
  handleActiveSelect: () => void;
  handleOnKeyDown: (
    e: React.KeyboardEvent<HTMLLIElement>,
    value: string
  ) => void;
  handleChooseValue: (item: string) => void;
  listItems: string[];
  onBlurFromLastItem: (items: string[], item: string) => void;
  onBlurBlock: () => void;
};

export const CustomSelect: FC<PropsS> = ({
  value,
  isSelect,
  handleActiveSelect,
  handleOnKeyDown,
  handleChooseValue,
  listItems,
  onBlurFromLastItem,
  onBlurBlock,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlClickOut = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onBlurBlock();
      }
    };

    document.addEventListener('mousedown', handlClickOut);

    return () => {
      document.removeEventListener('mousedown', handlClickOut);
    };
  }, []);

  return (
    <div
      className="custom-select"
      role="listbox"
      ref={ref}
    >
      <button
        className={classNames(
          'filter__block',
          { active: isSelect },
        )}
        onClick={handleActiveSelect}
        aria-expanded={isSelect}
        type="button"
        aria-haspopup="listbox"
      >
        {value}
      </button>

      <ul
        className={classNames(
          'filter__block-sort',
          { active: isSelect },
        )}
      >
        {listItems.map((i) => (
          <li
            className={classNames(
              'filter__item',
              { active: value === i },
            )}
            role="option"
            aria-selected={value === i}
            key={i}
            tabIndex={0}
            onClick={() => handleChooseValue(i)}
            onKeyDown={(e) => handleOnKeyDown(e, i)}
            onBlur={() => onBlurFromLastItem(listItems, i)}
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};
