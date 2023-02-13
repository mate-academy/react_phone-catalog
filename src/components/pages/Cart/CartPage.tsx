/* eslint-disable no-useless-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { Button } from '../../../common/Button/Button';
import './CartPage.scss';
import { CartItem } from './CartItem/CartItem';
import { LongButton } from '../../../common/LongButton/LongButton';
import { Product } from '../../../types/types';
import { NoProducts } from '../../../common/NoProducts/NoProducts';

export const CartPage = () => {
  const navigate = useNavigate();

  const { cartProducts } = useContext<any>(CartAndFavContext);
  const totalPrice = cartProducts.reduce((current:number, prev: Product) => {
    if (prev.count) {
      return current + (prev.price * prev.count);
    }

    return;
  }, 0);

  // eslint-disable-next-line array-callback-return
  const totalAmount = cartProducts.reduce((current:number, prev: Product) => {
    if (prev.count) {
      return current + prev.count;
    }

    return;
  }, 0);

  return (
    <div className="cart-page">
      <div
        className="back-button body12"
      >
        <Button
          className="no-border"
          image="icons/Chevron (Arrow Left).svg"
          alt="<"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="back-button__text">
          Back
        </div>
      </div>
      <h1 className="cart-page__title">
        Cart
      </h1>
      <div className="cart-page__blocks">
        <div className="cart-page__products">
          {cartProducts.length ? (
            <ul className="cart-page__list">
              {cartProducts.map((product: any) => {
                return (
                  <li className="cart-page__item" key={product.id}>
                    <CartItem
                      product={product}
                    />
                  </li>
                );
              })}
            </ul>
          )
            : <NoProducts />}
        </div>
        <div className="cart-page__price">
          <h1 className="cart-page__price-total">
            $
            {totalPrice}
          </h1>
          <div className="cart-page__total-items">
            {`Total for ${totalAmount} items`}
          </div>
          <div className="horizontal-line" />
          <LongButton text="Checkout" />
        </div>
      </div>
    </div>
  );
};
