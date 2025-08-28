import React, { useMemo } from 'react';
import styles from './Buttons.module.scss';

import heartIcon from '../../../../public/img/icons/icon-heart.svg';
import redHeart from '../../../../public/img/icons/icon-red-heart.svg';
import { useProductsState } from '../../context/ProductsStateContext';
import { useProducts } from '../../context/ProductsContext';
import { Products } from '../../../types/Products';

type Props = {
  productId: string;
};

export const Buttons: React.FC<Props> = ({ productId }) => {
  const { cart, favorites, toggleCartItem, toggleFavoriteItem } =
    useProductsState();
  const { products } = useProducts();

  const numericId = useMemo(() => {
    const idToNumber = Number(productId);

    if (!Number.isNaN(idToNumber)) {
      return idToNumber;
    }

    const found = products.find(
      (product: Products) => product.itemId === productId,
    );

    return found ? found.id : null;
  }, [productId, products]);

  if (numericId === null) {
    return null;
  }

  const isInCart = Object.keys(cart).map(Number).includes(numericId);
  const isFavorite = favorites.includes(numericId);

  return (
    <div className={`${styles.product__buttons} ${styles['buttons-product']}`}>
      <button
        className={
          styles[!isInCart ? 'buttons-product__add' : 'buttons-product__added']
        }
        onClick={() => toggleCartItem(numericId)}
      >
        {!isInCart ? 'Add to card' : 'Added'}
      </button>
      <button
        className={styles['buttons-product__like']}
        onClick={() => toggleFavoriteItem(numericId)}
      >
        <img src={!isFavorite ? heartIcon : redHeart} alt="heart" />
      </button>
    </div>
  );
};
