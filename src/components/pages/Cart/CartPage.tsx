import './CartPage.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../common/Button/Button';
import { CartItem } from './CartItem/CartItem';
import { LongButton } from '../../../common/LongButton/LongButton';
import { Product } from '../../../types/types';
import { NoProducts } from '../../../common/NoProducts/NoProducts';
import { CartAndFavContext } from '../../../context/CartAndFavContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartProducts = [] } = useContext(CartAndFavContext) ?? {};

  const totalPrice = (cartProducts || []).reduce(
    (current = 0, prev?: Product) => {
      return prev?.count ? current + prev.price * prev.count : current;
    },
    0,
  );

  const totalAmount = (cartProducts || []).reduce(
    (current = 0, prev?: Product) => {
      return prev?.count ? current + prev.count : current;
    },
    0,
  );

  return (
    <div className="cart-page">
      <div
        className="back-button body12"
      >
        <Button
          className="no-border"
          image="icons/Chevron (Arrow Left).svg"
          alt="arrow-left"
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
        {cartProducts && cartProducts.length ? (
          <>
            <div className="cart-page__products">
              <ul className="cart-page__list">
                {cartProducts.map((product: Product) => {
                  return (
                    <li className="cart-page__item" key={product.id}>
                      <CartItem
                        product={product}
                      />
                    </li>
                  );
                })}
              </ul>
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
              <LongButton
                text="Checkout"
                link="/#/checkout"
              />
            </div>
          </>
        )
          : <NoProducts />}
      </div>
    </div>
  );
};
