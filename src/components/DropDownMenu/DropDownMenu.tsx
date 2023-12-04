import React, { useState } from 'react';
import cn from 'classnames';
import './DropDownMenu.scss';
import '../../utils/textStyles.scss';
import { ICONS } from '../../icons';

type Props = {
  items: {
    id: string;
    title: string;
  }[],
  sortBy: string,
  setSortBy: (item: {
    id: string;
    title: string;
  }) => void,
  title: string,
};

export const DropDownMenu: React.FC<Props> = ({
  items,
  sortBy,
  setSortBy,
  title,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <label htmlFor="items_on_page" className="dd-label small-text-style">
        {title}
      </label>
      <div className="dd-container">
        <button
          type="button"
          className="dd-select"
          onClick={() => setIsOpen(v => !v)}
          onBlur={() => setIsOpen(false)}
        >
          <span className="body-text-style">{sortBy}</span>
          <img
            src={ICONS.arrowDown}
            alt="Dropdown close"
            className={cn({
              'dd-arrow': isOpen,
            })}
          />
        </button>
        <ul className={cn({
          'dd-content': true,
          'dd-content_active': isOpen,
        })}
        >
          {items.map(item => (
            <li
              key={item.id}
            >
              <button
                type="button"
                className={cn('dd-item body-text-style', {
                  'dd-item-select': sortBy === item.title,
                })}
                onMouseUp={() => {
                  setSortBy(item);
                  setIsOpen(false);
                }}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
