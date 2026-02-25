import React from 'react';
import { ProductPrices } from '../../../../shared/components/ProductPrices';
import styles from './BuySectoin.module.scss';
import { ProductAction } from '../../../../shared/components/ProductAction';
import { useCart } from '../../../../hooks/context/useCart';
import { useFavorite } from '../../../../hooks/context/useFavorite';

interface Props {
  id: string;
  price: number;
  fullPrice: number;
}

export const BuySectoin: React.FC<Props> = ({ price, fullPrice, id }) => {
  const { toogleProductFromBag, haveItemInBag } = useCart();
  const { toogleProductFromFavourite, haveItemInFavourite } = useFavorite();
  return (
    <div className={styles.container}>
      <ProductPrices price={price} fullPrice={fullPrice} />

      <ProductAction
        onAddToCart={() => toogleProductFromBag(id)}
        onAddToFavourite={() => toogleProductFromFavourite(id)}
        toBag={haveItemInBag(id)}
        toFavourite={haveItemInFavourite(id)}
      />
    </div>
  );
};
