import './PageCart.scss';
import { useAppSelector } from '../../app/hooks';
import { useContext } from 'react';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';

export const PageCart = () => {
  const { lang } = useContext(LangContext);
  const { cartGoods } = useAppSelector(state => state.cart);
  const navigate = useNavigate();
  const totalPrice = cartGoods.reduce(
    (acc, good) => acc + good.priceDiscount * good.quantity,
    0,
  );
  const totalitems = cartGoods.reduce((acc, good) => acc + good.quantity, 0);

  return (
    <div className="cart">
      <div className="cart__back">
        <div className="page-item__back--arrow icon icon--arrow-left"></div>
        <div onClick={() => navigate(-1)}>{translate('link.back', lang)}</div>
      </div>
      <h1 className="cart__title">{translate('link.cart', lang)}</h1>
      <div className="cart__container">
        <div className="cart__items">
          {cartGoods.length > 0 ? (
            cartGoods.map(prod => <CartItem key={prod.id} item={prod} />)
          ) : (
            <div className="">
              <Link to={'/'} className="not-found__button button">
                {translate('not-found.button', lang)}
              </Link>
              <img
                src="img/cart-is-empty.png"
                alt="img cart-is-empty"
                className="not-found__img"
              />
            </div>
          )}
        </div>
        {cartGoods.length > 0 && (
          <div className="cart__total">
            <h2 className="cart-item__sum">{`$${totalPrice}`}</h2>
            <p className="cart__total__text">{`Total for ${totalitems} items`}</p>
            <div className="cart__separator"></div>
            <button
              className="cart__total__button card__button--add"
              onClick={() =>
                alert('Funcionality of this button has not implemented yet')
              }
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
