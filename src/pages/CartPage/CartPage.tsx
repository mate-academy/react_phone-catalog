import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartProductActions
  from '../../app/features/cartProductsSlice';
import { BackButton } from '../../components/BackButton';
import { CartProduct } from '../../types/CartProduct';
import { priceWithDiscount } from '../../helpers/priceWithDiscount';
import './CartPage.scss';

export const CartPage = () => {
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const dispatch = useAppDispatch();
  const newCartProducts: CartProduct[] = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    const productsFromLocalStorage = localStorage.getItem('cart');

    if (productsFromLocalStorage) {
      dispatch(
        cartProductActions.setCartProducts(
          JSON.parse(productsFromLocalStorage),
        ),
      );
    }
  }, []);

  const totalSum = () => {
    let total = 0;

    cartProducts.forEach(cartProduct => {
      total += cartProduct.quantity * priceWithDiscount(cartProduct.product);
    });

    return total;
  };

  const handlerMinusButtonClick = (id: string, quantity: number) => {
    if (quantity === 1) {
      return;
    }

    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id === id) {
        copy.quantity = currentProduct.quantity - 1;
      }

      newCartProducts.push(copy);
    });
    dispatch(cartProductActions.setCartProducts(newCartProducts));
  };

  const handlerPlusButtonClick = (id: string) => {
    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id === id) {
        copy.quantity = currentProduct.quantity + 1;
      }

      newCartProducts.push(copy);
    });
    dispatch(cartProductActions.setCartProducts(newCartProducts));
  };

  const handlerCartDeleteButtonClick = (product: CartProduct) => {
    dispatch(cartProductActions.deleteCartProduct(product));
  };

  return (
    <div className="CartPage">
      <BackButton />

      <h1 className="ProductPage__title">
        Cart
      </h1>
      <br />

      {cartProducts.length === 0
        && <h3>Your cart is empty</h3>}

      {cartProducts.length > 0
        && (
          <div className="CartPage__grid">
            <div className="CartPage__list">
              {cartProducts.map(cartProduct => (
                <div
                  key={cartProduct.id}
                  className="CartPage__list-item"
                >
                  <button
                    data-cy="cartDeleteButton"
                    aria-label="cartDeleteButton"
                    type="button"
                    className="cross-button"
                    onClick={() => {
                      handlerCartDeleteButtonClick(cartProduct);
                    }}
                  />

                  <img
                    className="CartPage__image"
                    src={cartProduct.product.imageUrl}
                    alt=""
                  />

                  <p className="CartPage__product-name text">
                    {cartProduct.product.name}
                  </p>

                  <div className="container">
                    <button
                      type="button"
                      className="icon-button"
                      disabled={cartProduct.quantity === 1}
                      onClick={() => {
                        handlerMinusButtonClick(
                          cartProduct.id, cartProduct.quantity,
                        );
                      }}
                    >
                      <div
                        className={classNames(
                          'icon',
                          'icon--minus',
                          { 'icon--minus-active': cartProduct.quantity > 1 },
                        )}
                      />
                    </button>

                    <div
                      data-cy="productQuantity"
                      className="CartPage__quantity"
                    >
                      {cartProduct.quantity}
                    </div>

                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handlerPlusButtonClick(cartProduct.id)}
                    >
                      <div className="icon icon--plus" />
                    </button>
                  </div>

                  <h2>
                    {`$${priceWithDiscount(cartProduct.product)}`}
                  </h2>
                </div>
              ))}
            </div>

            <div className="CartPage__total">
              <h1>{`$${totalSum()}`}</h1>
              <br />
              <span className="text text--light">
                {`Total for ${cartProducts.length} items`}
              </span>
              <br />

              <div className="row" />
              <br />

              <button
                type="button"
                className="CartPage__checkout-button"
                onClick={() => {
                  setIsCheckoutActive(true);
                  setTimeout(() => {
                    setIsCheckoutActive(false);
                  }, 5000);
                }}
              >
                <span className="text text--white">
                  Checkout
                </span>
              </button>
              <br />
              <br />
            </div>

            {isCheckoutActive
             && (
               <div className="CartPage__checkout-info">
                 <h2>
                   We are sorry, but this feature is not implemented yet
                 </h2>
               </div>
             )}
          </div>
        )}
    </div>
  );
};
