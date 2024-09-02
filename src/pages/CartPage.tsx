import React, { useState, useEffect } from 'react';
import { CartItem } from '../components/CartItem/CartItem';
// import { Product } from '../types/Product';
import { CartActionType } from '../types/CartActionType';
import { useCart } from '../hooks/useCart';
import { NotFoundProductPage } from './NotFoundProductPage';
import { GoBackLink } from '../components/ui/GoBackLink';
import { CardButton } from '../components/ui/CardButton';
import { CartModal } from '../components/CartModal';

const CartPage: React.FC = () => {
  const { cart, updateCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(() =>
    cart.reduce((acc, item) => acc + item.price * (item.count || 1), 0),
  );
  const [totalItemCount, setTotalItemCount] = useState(() =>
    cart.reduce((acc, item) => acc + (item.count || 1), 0),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  useEffect(() => {
    const totalInitialPrice = cart.reduce(
      (acc, item) => acc + item.price * (item.count || 1),
      0,
    );
    const totalInitialItems = cart.reduce(
      (acc, item) => acc + (item.count || 1),
      0,
    );

    setTotalPrice(totalInitialPrice);
    setTotalItemCount(totalInitialItems);
  }, [cart]);

  if (!cart.length) {
    return <NotFoundProductPage title="Your cart is empty" />;
  }

  return (
    <div className="cart-page" id="cart-page">
      <div className="cart-page__goback-link">
        <GoBackLink />
      </div>

      <div className="cart-page__title-block">
        <h2>Cart</h2>
      </div>

      <div className="cart-page__content">
        <div className="cart-page__wrapper">
          {cart.map(itemCart => (
            <CartItem
              key={itemCart.id}
              item={itemCart}
              updateCart={updateCart}
              setItemsOnPage={() => {}} // Dummy function, modify as needed
            />
          ))}
        </div>
        <div className="cart-page__total">
          <div className="cart-page__price-wrapper">
            <h2>${totalPrice}</h2>

            <p className="body-text body-text--gray">
              Total for {totalItemCount} {totalItemCount > 1 ? 'items' : 'item'}
            </p>
          </div>

          <CardButton
            style={{ height: '48px', width: '100%' }}
            variant="primary"
            onClick={() => toggleModal()}
          >
            Checkout
          </CardButton>
        </div>
      </div>

      {isModalOpen && (
        <CartModal
          onClose={() => toggleModal()}
          onClear={() => updateCart(null, CartActionType.DELETE_ALL)}
        />
      )}
    </div>
  );
};

export default CartPage;
