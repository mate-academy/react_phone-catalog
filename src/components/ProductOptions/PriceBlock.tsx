import React from 'react';
import styles from './ProductOptions.module.scss';
import ProductInfo from './ProductInfo';
import { Actions } from '../../shared/Actions/Actions';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../services/favorites';
import { RootState } from '../../store/type';
import { addProduct } from '../../services/cart';

type PriceBlockProps = {
  itemId: string;
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
};

const PriceBlock: React.FC<PriceBlockProps> = ({
  itemId,
  priceDiscount,
  priceRegular,
  screen,
  resolution,
  processor,
  ram,
}) => {
  const dispatch = useDispatch();
  const favorites: string[] = useSelector(
    (state: RootState) => state.favorites,
  );
  const cart: { id: string; quantity: number }[] = useSelector(
    (state: RootState) => state.cart,
  );

  const isFavorite = favorites.includes(itemId);
  const isInCart = cart.some(item => item.id === itemId);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(itemId));
    } else {
      dispatch(addFavorite(itemId));
    }
  };

  const toggleCart = () => {
    if (!isInCart) {
      dispatch(addProduct(itemId));
    }
  };

  return (
    <div className={styles.productOptions__prices}>
      <div className={styles.productOptions__price}>
        {priceDiscount && (
          <span className={styles.productOptions__fullPrice}>
            ${priceRegular}
          </span>
        )}
        {priceDiscount && (
          <span className={styles.productOptions__discount}>
            ${priceDiscount}
          </span>
        )}
      </div>

      <Actions
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        toggleCart={toggleCart}
        isInCart={isInCart}
      />

      <ProductInfo
        screen={screen}
        resolution={resolution}
        processor={processor}
        ram={ram}
      />
    </div>
  );
};

export default PriceBlock;
