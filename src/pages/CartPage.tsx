import { useState } from 'react';
import classNames from 'classnames';

import { Header } from '../components/header/Header';
import { Back } from '../components/main/Back';
import { Title } from '../components/main/Title';
import { CartItems } from '../components/main/cart/CartItems';
import { useLocalStorage } from '../helpers/LocalStorage';
import { CART_KEY } from '../helpers/constants/StorageKeys';
import { ProductInCart } from '../helpers/types/ProductInCart';
import { Footer } from '../components/footer/Footer';
import { Button } from '../components/main/Button';

export const CartPage = () => {
  const [
    getCart,
    setCart,,
    cartSize,
    cartTotalSize,
  ] = useLocalStorage(CART_KEY);

  const [clickedCheckout, setClickedCheckout] = useState(false);

  const cart: ProductInCart[] = getCart() as ProductInCart[];

  const buttonClasses = classNames('button', 'button--big', {
    'button--clicked': clickedCheckout,
  });
  const textClasses = classNames('button__text', {
    'button__text--clicked': clickedCheckout,
  });

  const cartTotalPrice = cart.reduce((total, current) => {
    const { quantity } = current;
    const { discountedPrice } = current.product;

    return total + (discountedPrice * quantity);
  }, 0);

  const cartTotalPriceText = `$${+cartTotalPrice.toFixed(2)}`;

  const countText = `Total for ${cartTotalSize} item${cartTotalSize === 1 ? '' : 's'}`;
  const cartIsEmpty = cartSize === 0;

  const handleRemoveClick = (id: string) => {
    setCart(cart.filter(cartItem => cartItem.product.id !== id));
  };

  const handleQuanticyClick = (id: string, isMinus: boolean) => {
    setCart(cart.map(cartItem => {
      const cartItemCopy = { ...cartItem };
      const { product, quantity } = cartItem;

      if (product.id === id) {
        if (isMinus) {
          if (quantity > 1) {
            cartItemCopy.quantity -= 1;
          }
        } else {
          cartItemCopy.quantity += 1;
        }
      }

      return {
        ...cartItemCopy,
      };
    }));
  };

  const handleCheckoutClick = () => {
    setClickedCheckout(true);
  };

  return (
    <>
      <Header
        hasSearch={false}
        hasNav={false}
        hasFavorites={false}
        cartCount={cartTotalSize}
      />

      <main className="cart">
        <Back extraClass="cart__back" />

        {cartIsEmpty ? (
          <Title extraClassName="cart__title">Your cart is empty</Title>
        ) : (
          <>
            <Title extraClassName="cart__title">Cart</Title>

            <div className="cart__content">
              <div className="cart__items">
                <CartItems
                  productsInCart={cart}
                  onRemoveClick={handleRemoveClick}
                  onQuantityClick={handleQuanticyClick}
                />
              </div>

              <div className="cart__summary-wrapper">
                <div className="cart__summary">
                  <Title
                    extraClassName="cart__total-price"
                  >
                    {cartTotalPriceText}
                  </Title>

                  <p className="cart__count-text">{countText}</p>

                  <Button
                    buttonClasses={buttonClasses}
                    onClick={handleCheckoutClick}
                    textClasses={textClasses}
                  >
                    Checkout
                  </Button>
                </div>

                {clickedCheckout && (
                  <p>We are sorry, but this feature is not implemented yet</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer hasTopNav={false} />
    </>
  );
};
