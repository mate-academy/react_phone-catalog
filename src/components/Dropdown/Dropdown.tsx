import style from './Dropdown.module.scss';
import { useState } from 'react';
import cn from 'classnames';

type Props = {
  dropdownName: 'sortBy' | 'itemsOnPage';
};

export const Dropdown: React.FC<Props> = ({ dropdownName }) => {
  const variants =
    dropdownName === 'sortBy'
      ? ['Newest', 'Alphabetically', 'Cheapest']
      : ['All', 4, 8, 16];

  const [isOpen, setIsOpen] = useState(false);
  const [currentChoose, setCurrentChoose] = useState(variants[0]);

  return (
    <div className={style.dropdown}>
      <p className={style.label}>
        {dropdownName === 'sortBy' ? 'Sort by' : 'Items on page'}
      </p>
      <div
        tabIndex={0}
        className={cn(style.main, {
          [style['main--active']]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <div className={style.main__text}>{currentChoose}</div>
        <div
          className={cn(style.main__icon, {
            [style['main__icon--active']]: isOpen,
          })}
        />
      </div>
      {isOpen && (
        <div className={style.options}>
          {variants.map(item => (
            <div
              className={style.option}
              onMouseDown={() => setCurrentChoose(item)}
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
