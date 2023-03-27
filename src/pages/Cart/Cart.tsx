import classNames from 'classnames';
import React, {
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartContext } from '../../helpers/CartProvider';
import { CardItem } from '../../types/CardItem';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { warningTimer } from '../../utils/warningTimer';

import './Cart.scss';

export const Cart: React.FC = () => {
  const [warning, setWarning] = useState(false);
  const [products] = useLocalStorage<Product[]>('products', []);
  const { cart, setCart } = useContext(CartContext);

  const visibleProducts = useMemo(() => {
    return products.filter(product => cart.some((value: CardItem) => {
      return value.id === product.id;
    }));
  }, [cart]);

  const deleteCart = (product: Product) => {
    setCart(prev => [
      ...prev.filter((p: CardItem) => p.id !== product.id),
    ]);
  };

  const increaseCountCart = useCallback((product: Product) => {
    setCart(prevCart => prevCart.map(carts => {
      if (carts.id === product.id) {
        return {
          ...carts,
          count: carts.count + 1,
        };
      }

      return carts;
    }));
  }, [cart]);

  const decreaseCountCart = useCallback((product: Product) => {
    setCart(prevCart => prevCart.map(carts => {
      if (carts.id === product.id) {
        return {
          ...carts,
          count: carts.count - 1 || 1,
        };
      }

      return carts;
    }));
  }, [cart]);

  const totalPrice = useCallback(cart.map((product: CardItem) => {
    return product.price * product.count;
  }).reduce((a: number, b: number) => a + b, 0), [cart]);

  const isWarning = () => {
    setWarning(true);
    warningTimer(setWarning, false, 3000);
  };

  return (
    <main>
      <div className="cart container">
        <BackButton />
        <h2 className="cart__title">Cart</h2>
        {!!visibleProducts.length && (
          <div className="cart__content">
            <div className="cart__items">
              {visibleProducts.map(product => (
                <div className="cart__item" key={product.id}>
                  <button
                    type="button"
                    className="cart__item-delete-btn"
                    onClick={() => deleteCart(product)}
                  >
                    x
                  </button>

                  <img src={`new/${product.image}`} alt="#" className="cart__item-image" />
                  <h2 className="cart__item-title">{product.name}</h2>
                  <div className="cart__item-counter">
                    <button
                      type="button"
                      className={classNames(
                        'cart__item-count-btn',
                        {
                          'cart__item-count-btn--active':
                            cart.find((p: CardItem) => p.id === product.id),
                        },
                      )}
                      onClick={() => decreaseCountCart(product)}
                    >
                      -
                    </button>

                    {cart.find((p: CardItem) => p.id === product.id).count}
                    <button
                      type="button"
                      className="
                        cart__item-count-btn
                        cart__item-count-btn--active
                      "
                      onClick={() => increaseCountCart(product)}
                    >
                      +
                    </button>
                    <p className="cart__item-price">{`$${product.price}`}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart__sum">
              {warning && (
                <p>
                  We are sorry, but this feature is not implemented yet.
                </p>
              )}
              <h2 className="cart__sum-amout">{`$${totalPrice}`}</h2>
              <p className="cart__sum-items">{`Total for ${cart.length} items`}</p>
              <button
                className="cart__sum-button"
                type="button"
                onClick={() => isWarning()}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
        {!visibleProducts.length && (
          <p>Your cart is emty</p>
        )}
      </div>
    </main>
  );
};
