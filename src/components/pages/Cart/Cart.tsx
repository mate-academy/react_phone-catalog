import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import classNames from 'classnames';
import { ProductsContext } from '../../ProductsContext/ProductsContext';

import arrowLeftGrey from '../../../img/arrowLeft.png';

import './cart.scss';
import { CartProduct } from '../../CartProduct/CartProdut';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartProducts, curtSum, countOfItems } = useContext(ProductsContext);
  const [isModalActive, setIsModalActive] = useState(false);

  const showModal = () => {
    setTimeout(() => {
      setIsModalActive(false);
    }, 3000);

    if (isModalActive) {
      setIsModalActive(false);

      return;
    }

    setIsModalActive(true);
  };

  return (
    <div className="cart">
      <button
        className="cart__navigation-btn"
        type="button"
        onClick={() => navigate(-1)}
      >
        <img src={arrowLeftGrey} alt="arrow-icon" />
        Back
      </button>

      {cartProducts.length === 0 ? (
        <h1 className="cart__title title">Cart is empty</h1>
      ) : (
        <h1 className="cart__title title">Cart</h1>
      )}

      <div className="cart__wrapper">
        <div className="cart__products">
          <div className="cart__list">
            {cartProducts.map(product => (
              <CartProduct product={product} key={product.itemId} />
            ))}
          </div>
        </div>
        {cartProducts.length > 0 && (
          <div className="cart__bill">
            <div className="cart__wrapper-bill">
              <div className="cart__total">${curtSum(cartProducts)}</div>
              <div className="cart__countOfItems">
                Total for {countOfItems(cartProducts)} items
              </div>

              <button
                type="button"
                className="cart__checkoutBtn btn"
                onClick={showModal}
              >
                Checkout
              </button>
            </div>

            <div
              className={classNames('cart__checkout-modal', {
                'cart__checkout-modal--isActive': isModalActive,
              })}
            >
              Checkout is not implemented yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
