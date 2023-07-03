import { FC, useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductInShoppingCart } from '../../components/ProductInShoppingCart';
import { Notification } from '../../components/Notification';
import './shoppingCartPage.scss';
import { BackToHomeButton } from '../../components/BackToHomeButton/BackToHomeButton';

export const ShoppingCartPage: FC = () => {
  const theme = useAppSelector(state => state.theme.value);
  const shoppingCart = useAppSelector(state => state.shoppingCart.value);
  const sumOfPrices = useMemo(() => {
    return shoppingCart.reduce((previousValue, currentValue) => {
      return previousValue + (currentValue.price * currentValue.quantity);
    }, 0);
  }, [shoppingCart]);
  const quantityOfProductsInShoppingCart = useMemo(() => {
    return shoppingCart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
  }, [shoppingCart]);
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutClicked(true);

    const timeout = setTimeout(() => {
      setIsCheckoutClicked(false);
    }, 2000);

    if (isCheckoutClicked) {
      clearTimeout(timeout);
    }
  };

  return (
    <div className="shopping-cart">
      <div
        className="shopping-cart__notification"
        style={{ transform: `translateX(${isCheckoutClicked ? '0' : '110%'})` }}
      >
        <Notification
          message="Sorry, this feature is not available at the moment"
        />
      </div>

      <div className="shopping-cart__wrapper">
        <BackToHomeButton />
        <h1 className={`title title--${theme}`}>Cart</h1>
      </div>

      {!shoppingCart.length ? (
        <Notification message="Your cart is empty" />
      ) : (
        <div className="shopping-cart__container">
          <div className="shopping-cart__products-list">
            {shoppingCart.map(product => (
              <ProductInShoppingCart
                key={product.id}
                product={product}
                theme={theme}
              />
            ))}
          </div>

          <div className={`shopping-cart__total shopping-cart__total--${theme}`}>
            <div className={`shopping-cart__total-container shopping-cart__total-container--${theme}`}>
              <h1 className={`shopping-cart__sum shopping-cart__sum--${theme}`}>{`$${sumOfPrices}`}</h1>
              <p className="shopping-cart__number-of-items">
                {`Total for ${quantityOfProductsInShoppingCart} items`}
              </p>
            </div>
            <button
              type="button"
              className="shopping-cart__checkout"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
