import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './DropDown.module.scss';
import { Params } from '../../../../types/Params';
import { ArrowIcon } from '../../../../components/Icons/ArrowIcon';
import { itemsPerPage, sortOptions } from '../../../../constants/sortTypes';
import { getSearchWith } from '../../../../utils/searchParams';

export const DropDown: React.FC = () => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenQuantity, setIsOpenQuantity] = useState(false);
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

  const currentSortLabel =
    sortOptions.find(option => option.key === searchParams.get('sort'))
      ?.label || 'Newest';

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__sort}>
        <p className={classNames(styles.dropdown__label, 'text-small')}>
          Sort by
        </p>
        <div
          className={styles.dropdown__btnWrapper}
          onClick={() => setIsOpenSort(!isOpenSort)}
        >
          <div className={styles.dropdown__btn}>
            <p className="text-buttons">{currentSortLabel}</p>
            <div
              className={classNames(styles.dropdown__icon, {
                [styles.dropdown__icon__open]: isOpenSort,
              })}
            >
              <ArrowIcon />
            </div>
          </div>
          {isOpenSort && (
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
          onClick={() => setIsOpenQuantity(!isOpenQuantity)}
        >
          <div className={styles.dropdown__btn}>
            <p className="text-buttons">
              {searchParams.get('perPage') || 'All'}
            </p>
            <div
              className={classNames(styles.dropdown__icon, {
                [styles.dropdown__icon__open]: isOpenQuantity,
              })}
            >
              <ArrowIcon />
            </div>
          </div>
          {isOpenQuantity && (
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
