import { useNavigate } from 'react-router-dom';
import { Button } from '../../../helpers/Button/Button';
import { LongButton } from '../../../helpers/LongButton/LongButton';
import { CartItem } from './CartItem/CartItem';
import './CartPage.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const products = JSON.parse(localStorage.getItem('cartProducts'));
  console.log(products)
	const totalPrice = products.reduce((current, prev) => {
    return current + prev.price;
  }, 0);

  return (
    <div className="cart-page">
      <div
        className="back-button body12"
        onClick={() => {
          navigate(-1);
        }}
      >
        <Button
          className="no-border"
          image="/icons/Chevron (Arrow Left).svg"
          alt="<"
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
          {products && (
            <ul className="cart-page__list">
              {products.map((product) => {
                return (
                  <li className="cart-page__item">
                    <CartItem product={product} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="cart-page__price">
          <h1 className="cart-page__price-total">
            $
            {totalPrice}
          </h1>
          <div className="cart-page__total-items">
            {`Total for ${products.length} items`}
          </div>
          <div className="horizontal-line" />
          <LongButton text="Checkout" />
        </div>
      </div>

    </div>
	 );
};
