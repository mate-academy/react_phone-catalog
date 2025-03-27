import React, { useState } from 'react';
import style from './FavouritePage.module.scss';
import homeIcon from '../../shared/icons/home.svg';
import rightIcon from '../../shared/icons/chevron-arrow-right.svg';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/Products';
import { ProductCart } from '@/components/ProductCart/ProductCart';
import { Loader } from '@/components/Loader/Loader';

type FavouriteProps = {
  isDiscount?: boolean;
};

export const FavoritePage: React.FC<FavouriteProps> = () => {
  const [loading, setLoading] = useState(true);
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loaded';
  }

  const { favourite } = cartContext;

  setInterval(() => {
    setLoading(false);
  }, 1000);

  return (
    <div className={style.favorite}>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.wrapper}>
          <div className={style.navigation}>
            <img src={homeIcon} alt="home icon" />
            <img src={rightIcon} alt="arrow right icon" />
            <p className={style.navTitle}>Favourite</p>
          </div>

          <div className={style.pageInfo}>
            <h1 className={style.title}>Favourites</h1>
            <p className={style.description}>
              {favourite.length} {favourite.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className={style.container}>
            {favourite.map((item: Product) => (
              <ProductCart product={item} key={item.id} isDiscount={item.isDiscount} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
