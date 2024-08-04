import style from './Dropdown.module.scss';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SortType } from '../../types/SortType';

type Props = {
  dropdownName: 'sort' | 'perPage';
};

export const Dropdown: React.FC<Props> = ({ dropdownName }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const variants =
    dropdownName === 'sort'
      ? ['Newest', 'Alphabetically', 'Cheapest']
      : ['All', 4, 8, 16];

  const sortBy = searchParams.get('sort') || SortType.Age;
  const itemsOnPage = searchParams.get('perPage') || 'All';

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  const handleSortChange = (dropName: string, option: string | number) => {
    const params = new URLSearchParams(searchParams);

    if (option === variants[0]) {
      params.delete(dropName);
    } else {
      params.set(dropName, `${option}`);
    }

    setSearchParams(params);
  };

  return (
    <div className={style.dropdown}>
      <p className={style.label}>
        {dropdownName === 'sort' ? 'Sort by' : 'Items on page'}
      </p>
      <div
        tabIndex={0}
        className={cn(style.main, {
          [style['main--active']]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <div className={style.main__text}>
          {dropdownName === 'sort' ? sortBy : itemsOnPage}
        </div>
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
              className={cn(style.option, {
                [style['option--active']]:
                  itemsOnPage === item.toString() || sortBy === item,
              })}
              onMouseDown={() => handleSortChange(dropdownName, item)}
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
