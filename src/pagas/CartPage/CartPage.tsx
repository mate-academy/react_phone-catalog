import { useEffect, useState } from 'react';
import cn from 'classnames';
import { BackButton } from '../../components/BackButton';
import { ProductForCart } from '../../types/ProductForCart';

import './CartPage.scss';

export const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<ProductForCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getCartProduct = localStorage.getItem('cart');
    const CartInProducts: ProductForCart[] = getCartProduct
      ? JSON.parse(getCartProduct)
      : [];

    setCartProducts(CartInProducts);
  }, []);

  const calculateTotalPrice = (products: ProductForCart[]) => {
    return products.reduce((total, product) => {
      return (
        total + (product.product.price - product.product.discount)
          * product.quantity
      );
    }, 0);
  };

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(cartProducts);

    setTotalPrice(newTotalPrice);
  }, [cartProducts]);

  const calculateProducts = (products: ProductForCart[]) => {
    return products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };

  useEffect(() => {
    const countProducts = calculateProducts(cartProducts);

    setTotalCount(countProducts);
  }, [cartProducts]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const updatedCart = cartProducts.map((product) => (
      product.id === productId
        ? { ...product, quantity: newQuantity }
        : product
    ));

    setCartProducts(updatedCart);
    const newTotalPrice = calculateTotalPrice(updatedCart);

    setTotalPrice(newTotalPrice);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId,
    );

    setCartProducts(updatedCart);
    const newTotalPrice = calculateTotalPrice(updatedCart);

    setTotalPrice(newTotalPrice);
    const newTotalCount = calculateProducts(updatedCart);

    setTotalCount(newTotalCount);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <div className="CartPage">
        <BackButton />
        <h1 className="CartPage__title">Cart</h1>
        {cartProducts.length
          ? (
            <div className="CartPage__content content">
              <div className="content__cards">
                <ul className="content__cards--list">
                  {cartProducts.map((product) => (
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
                        onClick={() => handleRemoveFromCart(product.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'Space') {
                            handleRemoveFromCart(product.id);
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
                      <h2 className="cardItem__title">
                        {product.product.name}
                      </h2>
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
