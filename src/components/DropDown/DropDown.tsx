import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortType } from '../../types/SortType';
import style from './DropDown.module.scss';
import classNames from 'classnames';

type Props = {
  dropDownName: string;
};

export const DropDown: React.FC<Props> = ({ dropDownName }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const variants =
    dropDownName === 'sort'
      ? ['Newest', 'Alphabetically', 'Cheapest']
      : ['All', 4, 8, 16];

  const sortBy = searchParams.get('sort') || SortType.Age;
  const itemOnPage = searchParams.get('perPage') || 'All';

  const [isOpen, setIsOpen] = useState(false);

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
    <div className={style.dropDown}>
      <p className={style.label}>
        {dropDownName === 'sort' ? 'Sort by' : 'Items on page'}
      </p>
      <div
        tabIndex={0}
        className={classNames(style.main, {
          [style['main--active']]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <div className={style.main__text}>
          {dropDownName === 'sort' ? sortBy : itemOnPage}
        </div>
        <div
          className={classNames(style.main__icon, {
            [style['main__icon--active']]: isOpen,
          })}
        />
      </div>
      {isOpen && (
        <div className={style.options}>
          {variants.map(item => (
            <div
              className={classNames(style.option, {
                [style['option--active']]:
                  itemOnPage === item.toString() || sortBy === item,
              })}
              onMouseDown={() => handleSortChange(dropDownName, item)}
              key={`${item}-${dropDownName}`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
