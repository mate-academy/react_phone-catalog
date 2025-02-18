import { useNavigate } from 'react-router-dom';
import { BasketItem } from '../BasketItem/BasketItem';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './BasketPage.scss';
import { useBasket } from '../../utils/Stores';
import { Product } from '../../types/Propduct';
import { Menu } from '../Menu/Menu';
import { useRef, useState } from 'react';

export const BasketPage = () => {
  const checkoutRef = useRef<HTMLButtonElement>(
    document.querySelector('.no-checkout__box'),
  );
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const basketStore = useBasket(state => state.basket);
  const clearBusket = useBasket(state => state.clearBusket);

  const handleFocus = () => {
    setIsFocused(true);

    if (checkoutRef.current) {
      checkoutRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false); // Set the state to unfocused when the button loses focus
  };

  const checkedArray = () => {
    const newBasketStore: Product[] = [];

    basketStore.forEach(product => {
      if (
        !newBasketStore.find(productNew => productNew.itemId === product.itemId)
      ) {
        newBasketStore.push(product);
      }
    });

    return newBasketStore;
  };

  let totalPrice = 0;

  basketStore.forEach(product => (totalPrice += product.price));

  return (
    <>
      <Header />
      <Menu />
      <main className="basket-page">
        <button
          onClick={() => navigate(-1)}
          className="return-button basket-page__return-button"
        >
          <img src="./img/arrow-prev.svg" alt="return" />
          <span>Back</span>
        </button>
        <h1 className="basket-page__title">Cart</h1>
        {checkedArray().length !== 0 ? (
          <>
            <div className="basket-page__product-box">
              {checkedArray().map(product => (
                <BasketItem
                  key={product.id}
                  idFromParam={product.itemId}
                  category={product.category}
                />
              ))}
            </div>
            <div className="basket-page__final-box">
              <h5 className="basket-page__total-price">${totalPrice}</h5>
              <p className="basket-page__total-counter">
                Total for {basketStore.length}{' '}
                {basketStore.length === 1 ? 'item' : 'items'}
              </p>
              <div className="line" />
              <button
                className="basket-page__send-button"
                onClick={handleFocus}
              >
                Checkout
              </button>
              <button
                className="no-checkout__box"
                ref={checkoutRef}
                onBlur={handleBlur}
                style={{ opacity: isFocused ? '1' : '0' }}
              >
                <p className="no-checkout__text">
                  Checkout is not implemented yet. Do you want to clear the
                  Cart?
                </p>
                <div className="no-checkout__buttons-box">
                  <button
                    className="no-checkout__button no-checkout__button--cancel"
                    onClick={handleBlur}
                  >
                    Cancel
                  </button>
                  <button
                    className="no-checkout__button no-checkout__button--clear"
                    onClick={() => {
                      clearBusket();
                      setIsFocused(false);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </button>
            </div>
          </>
        ) : (
          <div className="image-box">
            <img
              src="./img/cart-is-empty.png"
              alt="no products in cart"
              className="basket-page__no-products-image"
            />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
