import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './DropDown.module.scss';
import { itemsPerPage, sortOptions } from '../../constants/sortTypes';
import { ArrowIcon } from '../Icons/ArrowIcon';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchParams';
import { Params } from '../../types/Params';

export const DropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenItems, setIsOpenItems] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleSortChange = (sortKey: string) => {
    if (sortKey === 'age') {
      setSearchWith({ sort: null });
    } else {
      setSearchWith({ sort: sortKey });
    }
  };

  const handleItemsPerPageChange = (quantity: string) => {
    if (quantity === 'All') {
      setSearchWith({ perPage: null, page: null });
    } else {
      setSearchWith({ perPage: quantity, page: null });
    }
  };

  useEffect(() => {
    const icon = document.querySelector(`.${styles.dropdown__icon}`);

    icon?.classList.toggle(styles.dropdown__icon__open, isOpen);
  }, [isOpen]);

  const currentSortLabel =
    sortOptions.find(option => option.key === searchParams.get('sort'))
      ?.label || 'Newest';

  return (
    <div className={styles.dropdown}>
      <div>
        <p className={classNames(styles.dropdown__label, 'text-small')}>
          Sort by
        </p>
        <div
          className={styles.dropdown__btnWrapper}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.dropdown__btn}>
            <p className="text-buttons">{currentSortLabel}</p>
            <div className={styles.dropdown__icon}>
              <ArrowIcon />
            </div>
          </div>
          {isOpen && (
            <div className={styles.dropdown__menu}>
              {sortOptions.map(({ key, label }) => (
                <div
                  key={key}
                  className={classNames(styles.dropdown__item, 'text-body')}
                  onClick={() => handleSortChange(key)}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.dropdown__itemsPerPage}>
        <p className={classNames(styles.dropdown__label, 'text-small')}>
          Items on page
        </p>
        <div
          className={styles.dropdown__btnWrapper}
          onClick={() => setIsOpenItems(!isOpenItems)}
        >
          <div className={styles.dropdown__btn}>
            <p className="text-buttons">
              {searchParams.get('perPage') || 'All'}
            </p>
            <div className={styles.dropdown__icon}>
              <ArrowIcon />
            </div>
          </div>
          {isOpenItems && (
            <div className={styles.dropdown__menu}>
              {itemsPerPage.map(quantity => (
                <div
                  key={quantity}
                  className={classNames(styles.dropdown__item, 'text-body')}
                  onClick={() => handleItemsPerPageChange(quantity)}
                >
                  {quantity}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
