/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useContext, useMemo } from 'react';
import classNames from 'classnames';
import './Cart.scss';
import { /* useNavigate, */ useOutletContext } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { Product } from '../../types/Product';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { CartContext } from '../../components/GlobalCartProvider';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

type CartItem = {
  id: string,
  quantity: number,
  product: Product,
};

export const Cart = () => {
  const products = useOutletContext<Product[]>();
  const { cart, setCart } = useContext(CartContext);
  const [isActive, setIsActive] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (!products.length) {
      return [];
    }

    return cart.map(cartItem => {
      const product = products.find(p => p.id === cartItem.id) as Product;

      return {
        ...cartItem,
        product,
      };
    });
  });

  // const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, curr) => {
      return acc + (calculateDiscount(curr.product) * curr.quantity);
    }, 0);
  }, [cartItems]);

  const handleDeleteItem = (id: string) => {
    setCartItems(
      cartItems.filter(item => item.id !== id),
    );

    setCart(cart.filter(item => item.id !== id));
  };

  const onChangeQuantity = (itemId: string, sign: number) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + sign,
        };
      }),
    );

    setCart(
      cart.map(cartItem => {
        if (cartItem.id !== itemId) {
          return cartItem;
        }

        return {
          ...cartItem,
          quantity: cartItem.quantity + sign,
        };
      }),
    );
  };

  const handleCheckout = () => {
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return (
    <div className="Cart container">
      <div className="Cart__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="Cart__return">
        <GoBackButton />
      </div>

      <div className="Cart__title">
        <h1>
          Cart
        </h1>
      </div>

      <div className={classNames(
        'Cart__checkout-message',
        { active: isActive },
      )}
      >
        <h2>
          We are sorry, but this feature is not implemented yet
        </h2>
      </div>

      {!cartItems.length
        ? (
          <h2 className="Cart__no-items-message">
            Your cart is empty 🧐
          </h2>
        )
        : (
          <div className="Cart__content grid">
            <div className="Cart__products">
              <ul className="Cart__products-list">
                {cartItems.map(item => (
                  <li className="Cart__products-item" key={item.id}>
                    <div className="Cart__item">
                      <button
                        className="Cart__item-delete"
                        type="button"
                        data-cy="cartDeleteButton"
                        onClick={handleDeleteItem.bind(null, item.product.id)}
                      />

                      <div className="Cart__item-image">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                        />
                      </div>

                      <div className="Cart__item-title">
                        {item.product.name}
                      </div>

                      <div className="Cart__item-quantity">
                        <Button
                          content="quantity"
                          sign="minus"
                          disabled={item.quantity === 1}
                          onClick={() => onChangeQuantity(item.id, -1)}
                        />

                        <span
                          data-cy="productQauntity"
                        >
                          {item.quantity}
                        </span>

                        <Button
                          content="quantity"
                          sign="plus"
                          onClick={() => onChangeQuantity(item.id, 1)}
                        />
                      </div>

                      <div className="Cart__item-price">
                        <h2>
                          {`$${calculateDiscount(item.product)}`}
                        </h2>
                      </div>

                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="Cart__checkout">
              <h2>
                {`$${totalPrice}`}
              </h2>

              <p>
                {`Total for ${cartItems.length} items`}
              </p>

              <Button
                content="cart"
                onClick={handleCheckout}
                disabled={isActive}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
    </div>
  );
};
