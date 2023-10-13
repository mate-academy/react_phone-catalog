import { useMemo, useState } from 'react';
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

  return (
    <div className="CartPage">
      <BackLink />

      <h1 className="CartPage__title">Cart</h1>

      {cart.length ? (
        <div className="CartPage__wrapper">
          <div className="CartPage__items">
            {cart.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          <div className="CartPage__total">
            <h1 className="CartPage__total-price">{`$${total}`}</h1>
            <p className="CartPage__total-text" data-cy="productQauntity">
              {`Total for ${totalQuantity} items`}
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
      ) : (
        <h2 className="CartPage__empty">Your cart is empty</h2>
      )}
    </div>
  );
};
