import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { BackLink } from '../../components/BackLink';
import { CartItem } from '../../components/CartItem';
import { getCartTotal } from '../../utils/cartHelper';
import './CartPage.scss';
import { Modal } from '../../components/Modal';

export const CartPage: React.FC = () => {
  const { cart, totalQuantity } = useCart();
  const total = useMemo(() => {
    return getCartTotal(cart);
  }, [cart]);

  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
  }, [isModalActive]);

  return (
    <div className="CartPage">
      <BackLink />

      {cart.length ? (
        <>
          <h1 className="CartPage__title">Cart</h1>
          <div className="CartPage__wrapper">
            <div className="CartPage__items">
              {cart.map(item => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>

            <div className="CartPage__total">
              <h1 className="CartPage__total-price">{`$${total}`}</h1>
              <p className="CartPage__total-text" data-cy="productQauntity">
                {totalQuantity === 1 ? 'Total for 1 item' : `Total for ${totalQuantity} items`}
              </p>
              <button
                type="button"
                className="CartPage__checkout"
                onClick={() => setIsModalActive(true)}
              >
                Checkout
              </button>

              <Modal
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
              />
            </div>
          </div>
        </>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </div>
  );
};
