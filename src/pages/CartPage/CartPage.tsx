import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { Loader } from '../../components/Loader/Loader';
import { BackButton } from '../../components/BackButton/BackButton';
import './CartPage.scss';
import { CartItem } from '../../components/CartItem/CartItem';

export const CartPage: React.FC = () => {
  const { isLoading, cart } = useContext(Context);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const totalPrice = cart.length === 0 ? 0 : cart.map((item) => {
    const priceAfterDiscount = item.price * ((100 - item.discount) / 100);
    const quantity = item.quantity || 1;

    return priceAfterDiscount * quantity;
  }).reduce((a, b) => a + b, 0);

  let totalItems = 0;

  cart.forEach(item => {
    const quantity = item.quantity || 1;

    totalItems += quantity;
  });

  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <div className="cart">
            <div className="cart__navigate">
              <BackButton />
            </div>

            <h2 className="cart__title">Cart</h2>
            {cart.length === 0 ? (
              <h2 className="cart__empty">Your cart is empty</h2>
            ) : (
              <>
                <div className="cart__content">
                  <div className="cart__products">
                    {cart.map((product) => (
                      <CartItem key={product.id} {...product} />
                    ))}
                  </div>
                  <div className="cart__total-box">
                    <div className="cart__info">
                      <h2 className="cart__total-price">{`$${totalPrice}`}</h2>
                      <p className="cart__total-count">{`Total for ${totalItems} items`}</p>
                    </div>

                    <button
                      type="button"
                      className="cart__button button"
                      onClick={() => setIsOpenModal(true)}
                    >
                      Checkout
                    </button>

                    {isOpenModal && (
                      <div className="cart__modal modal">
                        <div className="modal__content">
                          <p className="modal__title">
                            <span>We are sorry,</span>
                            <span>but this feature is not implemented yet</span>
                          </p>
                          <button
                            type="button"
                            className="modal__button button"
                            onClick={() => {
                              setIsOpenModal(false);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
    </>
  );
};
