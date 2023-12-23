import { useContext, useState } from 'react';
import { TechProductsContext } from '../../stores/TechProductsContext';
import { CartType } from '../../types/CartInterface';
import './Cart.scss';
import { totalCountInCart } from '../../helpers/getTotalCount';
import { getTotalSumCart } from '../../helpers/getTotalSum';

export const Cart = () => {
  const {
    cart,
    updateCountInCart,
    deleteFromCart,
  } = useContext(TechProductsContext);

  const [messageCheckout, setMessageCheckout] = useState('');

  const increaseCountInCart = (item: CartType, count: number) => {
    updateCountInCart({ ...item, count: count + 1 });
  };

  const decreaseCountInCart = (item: CartType, count: number) => {
    updateCountInCart({ ...item, count: count - 1 });
  };

  const handleCheckoutMessage = () => {
    setMessageCheckout('We are sorry, but this feature is not implemented yet');
    setTimeout(() => {
      setMessageCheckout('');
    }, 2000);
  };

  return (
    <div className="grid-cover">
      <div className="cart">
        <div className="cart__left-block">
          {
            cart.map((item) => {
              const {
                itemId,
                image,
                name,
                price,
                count,
              } = item;

              return (
                <div key={itemId} className="cart__cart-block">
                  <div className="cart__left-part-cart">
                    <button
                      aria-label="deleteItemCart"
                      type="button"
                      data-cy="cartDeleteButton"
                      className="cart__delete icon icon--cross"
                      onClick={() => deleteFromCart(itemId)}
                    />

                    <div className="cart__image-container">
                      <img
                        alt="phone"
                        className="cart__image"
                        src={image}
                      />
                    </div>

                    <p className="cart__info">{name}</p>
                  </div>

                  <div className="cart__right-part-cart">
                    <div className="cart__more-less-count-select">
                      <button
                        type="button"
                        className="cart__more-less-buttons"
                        onClick={() => decreaseCountInCart(item, count)}
                        disabled={count <= 1}
                      >
                        -
                      </button>

                      <div className="cart__count-product">{count}</div>

                      <button
                        type="button"
                        className="cart__more-less-buttons"
                        onClick={() => increaseCountInCart(item, count)}
                      >
                        +
                      </button>
                    </div>

                    <h2 className="cart__price">{`$${price * count}`}</h2>

                    <button
                      aria-label="deleteItemCart"
                      type="button"
                      data-cy="cartDeleteButton"
                      className="button button--mobile-delete-from-cart"
                      onClick={() => deleteFromCart(itemId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className="cart__right-block">
          <div className="cart__total-price-block">
            <h2 className="cart__total-sum">{`$${getTotalSumCart(cart)}`}</h2>
            <p
              className="cart__text-total-count-items"
              data-cy="productQauntity"
            >
              {totalCountInCart(cart) > 1 ? `Total for ${totalCountInCart(cart)} items` : 'Total for 1 item'}
            </p>
          </div>

          <div className="separator separator--under-total-price" />

          <button
            type="button"
            className="button button--checkout"
            onClick={handleCheckoutMessage}
          >
            Checkout
          </button>

          <p className="has-text-danger cart__checkout-message">
            {messageCheckout}
          </p>
        </div>
      </div>
    </div>
  );
};
