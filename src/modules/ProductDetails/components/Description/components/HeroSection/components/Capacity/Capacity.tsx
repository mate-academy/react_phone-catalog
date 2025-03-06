/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductsContext } from '../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../context/ProductsContext/types/CurrentProduct';
import { SearchContext } from '../../../../../../../../context/SearchContext';
import styles from './Capacity.module.scss';

export const Capacity: React.FC = () => {
  const { currentProduct, categories } = useContext(ProductsContext);
  const { searchParams } = useContext(SearchContext);
  const navigate = useNavigate();

  const { id, capacityAvailable, capacity, namespaceId, color, category } =
    currentProduct as CurrentProduct;

  // #region handlers

  const onClickHandler = (item: string) => {
    const product = categories[category].find(_product => {
      if (
        _product.color === color &&
        _product.capacity === item &&
        _product.namespaceId === namespaceId
      ) {
        return _product;
      }

      return;
    }) as CurrentProduct;

    navigate({
      pathname: `/${category}/${product.id}`,
      search: searchParams ? searchParams.toString() : '',
    });
  };

  // #endregion

  return (
    <div className={styles.capacity}>
      <div className={styles.title}>Select capacity</div>
      <div className={styles.wrapper}>
        {capacityAvailable.map(item => {
          return (
            <label
              key={`${id}-${item}`}
              onClick={() => onClickHandler(item)}
              className={classNames(styles.item, {
                [styles['is-active']]: capacity === item,
              })}
            >
              <input
                type="radio"
                style={{ display: 'contents' }}
                value={item}
              />
              {item}
            </label>
          );
        })}
      </div>
    </div>
  );
};
