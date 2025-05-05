import React from 'react';
import styles from './ProductOptions.module.scss';
import ProductInfo from './ProductInfo';
import { Actions } from '../../shared/Actions/Actions';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../services/favorites';
import { RootState } from '../../store/type';

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

  const isFavorite = favorites.includes(itemId);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(itemId));
    } else {
      dispatch(addFavorite(itemId));
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

      <Actions isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

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
