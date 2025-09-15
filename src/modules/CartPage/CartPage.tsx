import React, { useContext, useEffect } from 'react';
import cartPage from './CartPage.module.scss';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { CartContext } from '../../context/CartContext';
import { CartItem } from './components/CartItem';
import { ProductsContext } from '../../context/ProductsContext';
import { getAllProducts } from '../../api/getProducts';

export const CartPage: React.FC = () => {
  const { cartItems, clearCart, totalItemsOfCart } = useContext(CartContext);

  const { setAllProducts } = useContext(ProductsContext);

  useEffect(() => {
    getAllProducts().then(setAllProducts);
  }, [setAllProducts]);

  const totalOfCart = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={cartPage['cart-page']}>
      <Breadcrumbs />
      {cartItems.length === 0 ? (
        <div className={cartPage['cart-page__empty-cart-container']}>
          <h2 className={cartPage['cart-page__title']}>Your cart is empty</h2>
          <img
            src="img/cart-is-empty.png"
            alt="Empty cart image"
            className={cartPage['cart-page__empty-cart-container__image']}
          />
        </div>
      ) : (
        <>
          <h2 className={cartPage['cart-page__title']}>Cart</h2>
          <div className={cartPage['cart-page__content']}>
            <div className={cartPage['cart-page__item-list']}>
              {cartItems.map(cartItem => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem.product}
                  productQuantity={cartItem.quantity}
                />
              ))}
            </div>
            <div className={cartPage['cart-page__total']}>
              <span className={cartPage['cart-page__total__sum']}>
                {`$${totalOfCart}`}
              </span>
              <span className={cartPage['cart-page__total__items']}>
                {`Total for ${totalItemsOfCart} items`}
              </span>
              <button
                className={cartPage['cart-page__total__button']}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
