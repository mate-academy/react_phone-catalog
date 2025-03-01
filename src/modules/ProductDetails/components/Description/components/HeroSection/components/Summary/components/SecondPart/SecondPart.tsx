/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './SecondPart.module.scss';
import { HeartLikeSVG } from '../../../../../../../../../../svgs/HeartLikeSVG';
import { FavouritesContext } from '../../../../../../../../../../context/FavouritesContext';
import { ProductsContext } from '../../../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../../../context/ProductsContext/types/CurrentProduct';
import { MainContext } from '../../../../../../../../../../context/MainContext';
import { Product } from '../../../../../../../../../../types/CategoriesTypes/Product';
import classNames from 'classnames';

export const SecondPart: React.FC = () => {
  const { currentProduct, products } = useContext(ProductsContext);
  const { currentProductProps, MWFValueCondition } = useContext(MainContext);
  const { getIsIncluded, likeHandler } = useContext(FavouritesContext);

  const { id } = currentProduct as CurrentProduct;

  const onClickHandler = () => {
    if (currentProductProps) {
      likeHandler(id, currentProductProps);
    } else {
      const product = products.find(item => item.itemId === id) as Product;
      const props: Product = {
        ...product,
        sectionTitle: '',
        isMinWidthFixedValue: MWFValueCondition,
      };

      likeHandler(id, props);
    }
  };

  return (
    <div className={styles['second-part']}>
      <button className={styles.add}>Add to cart</button>

      <button
        className={classNames(styles.like, {
          [styles['is-liked']]: getIsIncluded(id),
        })}
        style={{ minWidth: '48px' }}
        onClick={onClickHandler}
      >
        <HeartLikeSVG />
      </button>
    </div>
  );
};
