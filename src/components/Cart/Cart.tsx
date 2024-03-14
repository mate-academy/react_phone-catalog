import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';
import { CartItem } from '../CartItem/CartItem';
import { setDataToLocalStorage } from '../../utils/LocalStorage';

export const Cart = () => {
  const { cart, setCart } = useContext(PhoneCatalogContext);

  const sum = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity, 0,
  );
  const total = cart.reduce(
    (accumulator, item) => accumulator + item.quantity, 0,
  );

  const navigate = useNavigate();

  const onSubmit = () => {
    setCart([]);
    setDataToLocalStorage('cart', cart);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="cartPage">
      <div className="cartPage__top">
        <div
          className="cartPage__top__back"
          role="button"
          tabIndex={0}
          onClick={goBack}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              goBack();
            }
          }}
        >
          <div className="arrow arrow-left" />
          <div className="cartPage__top__back__text">Back</div>
        </div>
        <div className="cartPage__top__title bold">Cart</div>
      </div>
      {cart.length > 0 ? (
        <div className="cartPage__bottom">
          <div className="cartPage__bottom__list">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                itemName={item.name}
                count={item.quantity}
                id={item.id}
                phoneId={item.phoneId}
              />
            ))}
          </div>
          <div className="cartPage__bottom__checkout">
            <div className="cartPage__bottom__checkout__block">
              <div className="cartPage__bottom__checkout__block__sum bold">{`$${sum}`}</div>
              <div className="cartPage__bottom__checkout__block__total">
                {total === 1 ? `Total for ${total} item` : `Total for ${total} items`}
              </div>
              <div className="cartPage__bottom__checkout__block__border" />
              <button
                type="submit"
                className="cartPage__bottom__checkout__block__button medium"
                onClick={onSubmit}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cartPage__bottom__empty">The cart is empty.</div>
      )}
    </div>
  );
};
