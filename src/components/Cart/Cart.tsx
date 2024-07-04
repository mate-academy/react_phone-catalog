import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Cart.scss';
import { ItemsContext } from '../../ItemsContext';
import { Link, useOutletContext } from 'react-router-dom';
import { CartItem } from '../CartItem';
import { Product } from '../../types/Product';
import { ModalWindow } from '../ModalWindow';

export const Cart: React.FC = () => {
  const { items, setItems, allPrices, setAllPrices, amountOfItems } =
    useContext(ItemsContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

  const darkTheme = useOutletContext<boolean>();

  useEffect(() => {
    const newTotalPrice = allPrices.reduce((prev, item) => {
      return prev + item.sum;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [allPrices]);

  const DeleteProductFromCart = useCallback(
    (currentProduct: Product) => {
      setItems(currentItems =>
        currentItems.filter(item => item.id !== currentProduct.id),
      );

      setAllPrices(currentPrices =>
        currentPrices.filter(item => item.id !== currentProduct.id),
      );
    },
    [setAllPrices, setItems],
  );

  return (
    <section className="cart-page">
      <div className="cart-page__back-nav back-nav">
        <div className="back-nav__arrow icon-arrow-left"></div>
        <Link to=".." className="back-nav__link">
          Back
        </Link>
      </div>

      <h1 className="cart-page__title title title--big">Cart</h1>
      {isModalWindowOpen && (
        <ModalWindow
          setItems={setItems}
          setAllPrices={setAllPrices}
          setIsModalWindowOpen={setIsModalWindowOpen}
          darkTheme={darkTheme}
        />
      )}
      {items.length === 0 && <p>Your cart is empty</p>}
      <div className="cart-page__container">
        <div className="cart-page__items">
          {items.map(item => (
            <CartItem
              key={item.id}
              product={item.product}
              quantity={item.quantity}
              id={item.id}
              onDelete={DeleteProductFromCart}
              darkTheme={darkTheme}
            />
          ))}
        </div>

        {items.length > 0 && (
          <div className="cart-page__total-price-box">
            <div className="cart-page__total-price-info">
              <p className="cart-page__total-price-value">{`$${totalPrice}`}</p>
              <p className="cart-page__total-price-text">
                {`Total for ${amountOfItems} items`}
              </p>
            </div>

            <button
              className="add-to-cart-button"
              onClick={() => {
                setIsModalWindowOpen(true);
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
