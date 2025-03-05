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
import { CartContext } from '../../../../../../../../../../context/CartContext';
import { CartItemType } from '../../../../../../../../../Cart/types/CartItemType';
import { AddButtonTexts } from '../../../../../../../../../../enums/AddButtonTexts';

export const SecondPart: React.FC = () => {
  // #region context

  const { currentProduct, products } = useContext(ProductsContext);
  const { currentProductProps, MWFValueCondition } = useContext(MainContext);
  const { getIsInFavourites, likeHandler: like } =
    useContext(FavouritesContext);
  const { getIsInCart, addItem } = useContext(CartContext);

  // #endregion

  const { id } = currentProduct as CurrentProduct;
  const isInCart = getIsInCart(id);

  // #region handlers

  const likeHandler = () => {
    if (currentProductProps) {
      like(id, currentProductProps);
    } else {
      const product = products.find(item => item.itemId === id) as Product;
      const props: Product = {
        ...product,
        sectionTitle: '',
        isMinWidthFixedValue: MWFValueCondition,
      };

      like(id, props);
    }
  };

  const addHandler = () => {
    const product =
      currentProductProps ||
      (products.find(item => item.itemId === id) as Product);
    const { name, image, price, category } = product;
    const props: CartItemType = {
      title: name,
      image,
      fullPrice: price,
      pricePerItem: price,
      category,
      counter: 1,
    };

    addItem(id, props);
  };

  // #endregion

  return (
    <div className={styles['second-part']}>
      <button
        className={classNames(styles.add, { [styles['is-added']]: isInCart })}
        onClick={addHandler}
      >
        {isInCart ? AddButtonTexts.added : AddButtonTexts.add}
      </button>

      <button
        className={classNames(styles.like, {
          [styles['is-liked']]: getIsInFavourites(id),
        })}
        style={{ minWidth: '48px' }}
        onClick={likeHandler}
      >
        <HeartLikeSVG />
      </button>
    </div>
  );
};
