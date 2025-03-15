import React from 'react';
import style from './ShopBag.module.scss';
import shopIcon from '../assets/icons/shopping-bag-cart.svg';
import { useCart } from '../../modules/HomePage/hook/CartContext';

export const ShopBag: React.FC = () => {

  const cartContext = useCart();

  if (!cartContext) {
    return `Not loading context`;
  }

  const { cart } = cartContext;

  return (
    <div className={style.container}>
      <img src={shopIcon} alt="Shop icon" className={style.shopBag} />
      {cart.length > 0 && (
        <span className={style.countProduct}>{cart.length}</span>
      )}
    </div>
  );
};
