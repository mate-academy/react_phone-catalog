import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BackToPage } from '../BackToPage/BackToPage';
import { CartDescription } from '../CartDescription/CartDescription';
import { Product } from '../../types/Products';
import './Cart.scss';
import { NoResults } from '../NoResults/NoResults';

export const Cart: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cartPhones, setCartPhones] = useState<Product []>([]);
  const [checkout, setCheckout] = useState(false);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const retrievedData = localStorage.getItem('cart');
    const cartFromStorage = retrievedData ? JSON.parse(retrievedData) : [];

    setCartPhones(cartFromStorage);
  }, []);

  const calculateTotal = (cartArray: Product[]) => {
    const newTotalPrice = cartArray.reduce(
      (sum: number, item: Product) => (
        sum + item.price * (item.quantity || 1)
      ),
      0,
    );
    const newTotalItems = cartArray
      .reduce((sum: number, item: Product) => sum + (item.quantity || 1), 0);

    setTotalPrice(newTotalPrice);
    setTotalItems(newTotalItems);
  };

  const updateCart = (updatedCart: Product[]) => {
    setCartPhones(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleDeleteClick = (name: string) => {
    const updatedCart = cartPhones.filter(product => product.name !== name);

    updateCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckOutClick = () => {
    setCheckout(true);

    timeoutId = setTimeout(() => {
      setCheckout(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        <BackToPage />
        <div className="cart-page__title">Cart</div>
        {cartPhones.length > 0 ? (
          <div className="cart-page__row">
            <div className="cart-page__column cart-page__column_big">
              {cartPhones.map(phone => (
                <CartDescription
                  key={phone.id}
                  phone={phone}
                  handleDeleteClick={handleDeleteClick}
                  updateCart={updateCart}
                />
              ))}
            </div>
            <div
              className={classNames({
                'cart-page__column': true,
                'cart-page__column_small': true,
                'column-cart': true,
              })}
            >
              <div className="column-cart__content">
                <div className="column-cart__price">{`$${totalPrice}`}</div>
                <div
                  data-cy="productQauntity"
                  className="column-cart__quantity"
                >
                  {`Total for ${totalItems} items`}
                </div>
                <button
                  type="button"
                  className="column-cart__checkout"
                  onClick={handleCheckOutClick}
                >
                  Checkout
                </button>
              </div>

              {checkout && (
                <div className="column-cart__content feature-message">
                  We are sorry, but this feature is not implemented yet
                </div>
              )}
            </div>
          </div>
        ) : <NoResults category="cart" />}

      </div>
    </main>
  );
};
