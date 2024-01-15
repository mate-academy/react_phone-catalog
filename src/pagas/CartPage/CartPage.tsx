import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { ProductForCart } from '../../types/ProductForCart';
import { useCart } from '../../context/CartProvider';

import './CartPage.scss';

export const CartPage = () => {
  const { cart, handleRemoveFromCart, updateQuantity } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const calculateTotalPrice = (products: ProductForCart[]) => {
    return products.reduce((total, product) => {
      return (
        total
          + (product.product.price - product.product.discount)
          * product.quantity
      );
    }, 0);
  };

  const calculateProducts = (products: ProductForCart[]) => {
    return products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(cart);

    setTotalPrice(newTotalPrice);

    const newTotalCount = calculateProducts(cart);

    setTotalCount(newTotalCount);
  }, [cart]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);

    const newTotalPrice = calculateTotalPrice(cart);

    setTotalPrice(newTotalPrice);
  };

  const handleRemove = (productId: string) => {
    const productToRemove = cart.find((product) => product.id === productId);

    if (productToRemove) {
      handleRemoveFromCart(productToRemove);

      const newTotalPrice = calculateTotalPrice(cart);

      setTotalPrice(newTotalPrice);

      const newTotalCount = calculateProducts(cart);

      setTotalCount(newTotalCount);
    }
  };

  return (
    <div className="container">
      <div className="CartPage">
        <BackButton />
        <h1 className="CartPage__title">Cart</h1>
        {cart.length
          ? (
            <div className="CartPage__content content">
              <div className="content__cards">
                <ul className="content__cards--list">
                  {cart.map((product) => (
                    <li
                      key={product.id}
                      className="cardItem"
                    >
                      <div
                        role="button"
                        aria-label="Close"
                        tabIndex={0}
                        className="cardItem__closing"
                        data-cy="cartDeleteButton"
                        onClick={() => handleRemove(product.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'Space') {
                            handleRemove(product.id);
                          }
                        }}
                      />
                      {product.product && (
                        <img
                          src={product.product.imageUrl}
                          alt={product.product.name}
                          className="cardItem__image"
                        />
                      )}
                      <Link
                        to={`/${product.product.type}s/${product.product.id}`}
                        className="cardItem__title"
                      >
                        <h2 className="cardItem__title">
                          {product.product.name}
                        </h2>
                      </Link>
                      <div className="cardItem__count">
                        <button
                          type="button"
                          aria-label="minus"
                          className={cn('cardItem__count--icon', {
                            minusActive: product.quantity > 1,
                            minus: product.quantity <= 1,
                          })}
                          onClick={() => (
                            handleQuantityChange(
                              product.id,
                              product.quantity - 1,
                            ))}
                          disabled={product.quantity <= 1}
                        />
                        <div className="cardItem__count--number">
                          {product.quantity}
                        </div>
                        <button
                          type="button"
                          aria-label="plus"
                          className="cardItem__count--icon plus"
                          onClick={() => handleQuantityChange(
                            product.id,
                            product.quantity + 1,
                          )}
                        />
                      </div>
                      <div
                        className="cardItem__sum"
                        data-cy="productQauntity"
                      >
                        {`$${product.quantity * (product.product.price - product.product.discount)}`}
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
              <div className="content__calculator">
                <div className="content__price">
                  <div className="content__price--sum">{`$${totalPrice}`}</div>
                  <p className="content__price--count">{`Total for ${totalCount} items`}</p>
                </div>

                <button
                  type="button"
                  className="content__button"
                >
                  Checkout
                </button>
              </div>
            </div>
          )
          : (
            <p className="no-goods">
              No items have been added to the shopping cart.
              Please explore our products and add your desired items to
              the cart for a delightful shopping experience.
            </p>
          )}
      </div>
    </div>
  );
};
