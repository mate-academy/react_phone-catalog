import React from 'react';
import style from './FavoritePage.module.scss';
import homeIcon from '../../shared/assets/icons/home.svg';
import rightIcon from '../../shared/assets/icons/chevron-arrow-right.svg';
import { useCart } from '../HomePage/hook/CartContext';
import { ProductCart } from '../../components/ProductCart/ProductCart';
import { Product } from '../../type/Product';

type FavouriteProps = {
  isDiscount?: boolean;
};

export const FavoritePage: React.FC<FavouriteProps> = () => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loaded';
  }

  const { favourite } = cartContext;

  return (
    <div className={style.favorite}>
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
            <ProductCart product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
