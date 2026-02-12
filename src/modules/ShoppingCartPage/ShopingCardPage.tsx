import React from 'react';
import style from './ShopingCardPage.module.scss';
import { useCart } from '../HomePage/hook/CartContext';
import arrowLeft from '../../shared/assets/icons/chevron-arrow-left.svg';
import plusIcon from '../../shared/assets/icons/plus.svg';
import minusIcon from '../../shared/assets/icons/minus.svg';
import removeIcon from '../../shared/assets/icons/close.svg';
import { Product } from '../../type/Product';

export const ShopingCardPage: React.FC = () => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loading';
  }

  const { cart, removeFromCart, totalPrice } = cartContext;

  const total = totalPrice();

  return (
    <div className={style.shopingBag}>
      <a className={style.navigate}>
        <img
          src={arrowLeft}
          alt="arrow icon left"
          className={style.whiteIcon}
        />
        <p>Back</p>
      </a>

      <h1 className={style.title}>Cart</h1>

      <div className={style.onDesctop}>
        <div>
          {cart.map((item: Product) => (
            <div className={style.shopCart} key={item.id}>
              <div className={style.wrapper}>
                <div className={style.cartDetail}>
                  <img
                    src={removeIcon}
                    alt="remove icon"
                    onClick={() => removeFromCart(item.id)}
                    className={style.removeIcon}
                  />

                  <img
                    src={item.images[0]}
                    alt="phone image"
                    className={style.itemImg}
                  />

                  <h2 className={style.itemTitle}>{item.name}</h2>
                </div>

                <div className={style.cartInfo}>
                  <div className={style.cartCount}>
                    <img
                      src={minusIcon}
                      alt="minus icon"
                      className={style.minusIcon}
                    />

                    <p>1</p>

                    <img
                      src={plusIcon}
                      alt="plus icon"
                      className={style.minusIcon}
                    />
                  </div>

                  <h2 className={style.price}>
                    ${item.priceRegular ?? item.priceDiscount}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className={style.total}>
            <div className={style.totalContainer}>
              <h1 className={style.totalTitle}>${total}</h1>
              <p className={style.totalDescription}>
                Total for {cart.length} items
              </p>
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
