import React from 'react';
import styles from './BlockButtons.module.scss';
import { useProductActions } from '../../../../hooks/useProductActions';
import { Product } from '../../../../../../ProductsContext/TabsContext';
import { useSafeProduct } from '../../../../hooks/SafeProduct';

interface BlockButtonsProps {
  element: Product;
}

export const BlockButtons: React.FC<BlockButtonsProps> = ({ element }) => {
  const productContext = useSafeProduct();
  const isProductPage = productContext?.isProductPage ?? false;

  const { toggleFavourite, toggleCart, isFavourite, isInCart } =
    useProductActions(element);

  return (
    <div
      className={`${styles.blockButtons} ${isProductPage ? styles.productPage : ''}`}
    >
      <button
        className={`${styles.add} ${isInCart ? styles.addedToCart : ''}`}
        onClick={toggleCart}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        className={`${styles.favourites} ${isProductPage ? styles.productPageFavourites : ''}`}
        onClick={toggleFavourite}
        style={{
          background: isFavourite ? 'none' : '',
        }}
      >
        <img
          src={
            isFavourite
              ? './img/image/Icons/HartRed.svg'
              : './img/image/Icons/Hart.svg'
          }
          alt="Favourites"
        />
      </button>
    </div>
  );
};
