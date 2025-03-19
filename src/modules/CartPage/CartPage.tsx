import React from 'react';
import style from './CartPage.module.scss';
import arrowLeft from '../../shared/icons/chevron-arrow-left.svg';
import plusIcon from '../../shared/icons/plus.svg';
import minusIcon from '../../shared/icons/minus.svg';
import removeIcon from '../../shared/icons/close.svg';
import EmptyBag from '/img/cart-is-empty.png';
import { NavLink } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/Products';

export const CartPage: React.FC = () => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loading';
  }

  const { cart, removeFromCart } = cartContext;

  const totalPrice = cart.reduce((acc, item) => acc + (item.finalPrice || 0), 0);

  return (
    <div className={style.shopingBag}>
      <NavLink to={''} className={style.navigate}>
        <img src={arrowLeft} alt="arrow icon left" className={style.whiteIcon} />
        <p>Back</p>
      </NavLink>

      <h1 className={style.title}>Cart</h1>

      <div className={style.onDesctop}>
        <div>
          {cart.length === 0 && <img src={EmptyBag} alt="Empty bag" className={style.emptyBag} />}
          {cart.map((item: Product) => (
            <div className={style.shopCart} key={item.id}>
              <div className={style.wrapper}>
                <div className={style.cartDetail}>
                  <img src={removeIcon} alt="remove icon" className={style.removeIcon} onClick={() => removeFromCart(item.id)}/>

                  <img src={item.image} alt="phone image" className={style.itemImg} />

                  <h2 className={style.itemTitle}>{item.name}</h2>
                </div>

                <div className={style.cartInfo}>
                  <div className={style.cartCount}>
                    <img src={minusIcon} alt="minus icon" className={style.minusIcon} />

                    <p>1</p>

                    <img src={plusIcon} alt="plus icon" className={style.plusIcon} />
                  </div>

                  <h2 className={style.price}>${item.finalPrice}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className={style.total}>
            <div className={style.totalContainer}>
              <h1 className={style.totalTitle}>${totalPrice}</h1>
              <p className={style.totalDescription}>Total for {cart.length} items</p>
            </div>

            <div className={style.checkout}>
              <button className={style.checkoutBtn}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
