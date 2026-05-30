import { useDispatch, useSelector } from 'react-redux';
import './CartPage.scss';
import { RootState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from '../../../redux/cartSlice';
import { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal';

export const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [showGoBtn, setShowGoBtn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (totalCount === 0) {
      const timer = setTimeout(() => {
        setShowGoBtn(true);
      }, 1500);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [totalCount]);

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <Link to={'/'} className="back">
          <span className="back__icon"></span>
          Back
        </Link>

        {totalCount > 0 && <h1 className="products__title title">Cart</h1>}

        <div className="cart-page__content">
          {totalCount === 0 && (
            <div className="cart-page__no-items no-items">
              <h3 className="no-items__title">
                Oops... Looks like your cart is empty! 😄
              </h3>

              <Link
                to="/"
                className={`no-items__btn ${showGoBtn ? 'no-items__btn--visible' : 'no-items__btn--hidden'}`}
              >
                Go shopping!
              </Link>
            </div>
          )}

          <div className="cart-page__list">
            {cart.map(product => (
              <article
                className={`cart-page__item item ${removingId === product.id ? 'item--removing' : ''}`}
                key={product.id}
              >
                <div className="item__photo-and-title">
                  <button
                    className="item__remove-button"
                    onClick={() => {
                      setRemovingId(product.id);
                      setTimeout(() => {
                        dispatch(removeProduct(product.id));
                      }, 300);
                    }}
                  >
                    <img src="./img/icons/remove-from-cart.svg" alt="" />
                  </button>
                  <Link
                    to={`/${product.category}/${product.id}`}
                    className="item__photo"
                  >
                    <img src={`./${product.image}`} alt="" />
                  </Link>
                  <Link
                    to={`/${product.category}/${product.id}`}
                    className="item__title"
                  >
                    {product.name}
                  </Link>
                </div>

                <div className="item__count-and-price">
                  <button
                    className="item__count-btn item__count-btn--minus"
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                  >
                    {product.quantity === 1 ? (
                      <img src="./img/icons/minus.png" alt="" />
                    ) : (
                      <img src="./img/icons/minus-active.png" alt="" />
                    )}
                  </button>

                  <p className="item__count">{product.quantity}</p>
                  <button
                    className="item__count-btn item__count-btn--plus"
                    onClick={() => dispatch(increaseQuantity(product.id))}
                  >
                    <img src="./img/icons/plus.png" alt="" />
                  </button>
                  <p className="item__price">${product.price}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="cart-page__checkout checkout">
            <div className="checkout__top">
              <div className="checkout__price">${totalPrice}</div>
              <p className="checkout__items-count">
                Total for {totalCount} item{totalCount !== 1 && 's'}
              </p>
            </div>
            <div className="checkout__bottom">
              <button
                className={
                  totalCount > 0 ? 'checkout__btn' : 'checkout__btn--not-active'
                }
                onClick={() => {
                  if (totalCount > 0) {
                    setIsModalOpen(true);
                  }
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          text="Checkout is not implemented yet. Do you want to clear the Cart?"
          onConfirm={() => {
            cart.forEach(product => dispatch(removeProduct(product.id)));
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
