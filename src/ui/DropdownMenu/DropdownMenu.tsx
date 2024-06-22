import cn from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import arrowDown from '../../assets/images/arrow-down.svg';
import arrowUp from '../../assets/images/arrow-up.svg';
import {
  DEFAULT_PER_PAGE,
  valuesPagination,
} from '../../constants/default-values';
import { DropdownItem } from '../../types/DropdownItem';
import { Sorts } from '../../types/Sorts';

import styles from './DropdownMenu.module.scss';

type Props = {
  items: DropdownItem[];
  params: string | null;
  defaultParams: string;
  isPrimary?: boolean;
};

enum SortsType {
  age = 'Newest',
  title = 'Alphabetically',
  price = 'Cheapest',
}

export const DropdownMenu: React.FC<Props> = ({
  items,
  isPrimary,
  params,
  defaultParams,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedItem, setSelectedItem] = useState(
    SortsType[params as keyof typeof SortsType] ||
      items.find(item => item === params) ||
      defaultParams,
  );

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleToogleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const addQueryToUrlParams = (item: DropdownItem) => {
    const urlParams = new URLSearchParams(searchParams);
    const currentItem = item.toLowerCase();

    if (currentItem === Sorts.newest) {
      urlParams.set('sort', Sorts.age);
    } else if (currentItem === Sorts.alphabetically) {
      urlParams.set('sort', Sorts.title);
    } else if (currentItem === Sorts.cheapest) {
      urlParams.set('sort', Sorts.price);
    } else if (
      valuesPagination.includes(item) &&
      item !== DEFAULT_PER_PAGE.toString()
    ) {
      urlParams.set('perPage', item);
    }

    setSearchParams(urlParams);
  };

  const handleSelectedItem = (item: DropdownItem) => {
    setSelectedItem(item as SortsType);
    addQueryToUrlParams(item);

    handleCloseDropdown();
  };

  return (
    <div
      tabIndex={0}
      onBlur={handleCloseDropdown}
      className={cn(styles.DropdownMenu, {
        [styles.Large]: isPrimary,
      })}
    >
      <div onClick={handleToogleDropdown} className={styles.Header}>
        <p className={styles.Text}>{selectedItem}</p>

        {isOpen ? (
          <img src={arrowUp} alt="up" />
        ) : (
          <img src={arrowDown} alt="down" />
        )}
      </div>

      {isOpen && (
        <div className={styles.Items}>
          {items.map(item => (
            <p
              key={item}
              onClick={() => handleSelectedItem(item)}
              className={styles.Item}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
