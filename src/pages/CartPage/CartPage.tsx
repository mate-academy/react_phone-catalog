import './CartPage.scss';
import { useState } from 'react';
import { BASE_URL } from '../../api/fetchClient';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton/BackButton';
import * as cartActions from '../../features/cartSlicer';
import * as priceActions from '../../features/productPriceSlicer';
import { Product } from '../../types/Product';

export const CartPage = () => {
  const cartProducts = useAppSelector((state) => state.cartProducts.items);
  const dispatch = useAppDispatch();

  const productPrice = cartProducts.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const [hasError, setHasError] = useState(false);

  const isProductId = (productId: string) => {
    return cartProducts.find(
      (selectedProduct) => selectedProduct.id === productId,
    );
  };

  const handleAddProduct = (productId: string) => {
    if (isProductId(productId)) {
      dispatch(cartActions.increaseQuantity(productId));
    }
  };

  const handleRemoveProduct = (productId: string) => {
    if (isProductId(productId)) {
      dispatch(cartActions.decreaseQuantity(productId));
    }
  };

  const handleDeleteProduct = (newProduct: Product) => {
    if (isProductId(newProduct.id)) {
      dispatch(priceActions.deleteProductPrice({ quantity: 1 }));

      dispatch(cartActions.deleteCartProducts(newProduct.id));
    }
  };

  return (
    <div className="cart-page">
      <BackButton />

      <h1 className="cart-page__title">Cart</h1>

      {!cartProducts.length ? (
        <div className="empty">
          <p className="empty__message">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <div className="cart-page__content">
            <div className="cart-page__list">
              {cartProducts.map((product) => (
                <div className="list-item">
                  <div className="list-item__left-container">
                    <button
                      type="button"
                      aria-label="close"
                      className="list-item__button-delete cart__close"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <div className="icon icon--remove" />
                    </button>

                    <div className="list-item__photo">
                      <img
                        className="list-item__photo_img"
                        src={`${BASE_URL}/${product.image}`}
                        alt={product.image}
                      />
                    </div>

                    <h1 className="list-item__name">{`${product.name}`}</h1>
                  </div>

                  <div className="list-item__right-container">
                    <div className="list-item__counter">
                      <button
                        type="button"
                        aria-label="remove"
                        className="list-item__counter_button"
                        onClick={() => handleRemoveProduct(product.id)}
                        disabled={product.quantity <= 1}
                      >
                        <div className="icon icon--minus" />
                      </button>
                      <div className="list-item__counter_amount">
                        {product.quantity}
                      </div>
                      <button
                        type="button"
                        aria-label="add"
                        className="list-item__counter_button"
                        onClick={() => handleAddProduct(product.id)}
                      >
                        <div className="icon icon--plus" />
                      </button>
                    </div>
                    <h1 className="list-item__price">{`$${product.price}`}</h1>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-page__checkout">
              <div className="cart-page__checkout_total">
                <h1 className="cart-page__checkout_total-price">{`$${productPrice}`}</h1>
                <h2 className="cart-page__checkout_total-amount">
                  {cartProducts.length === 1
                    ? `Total for ${cartProducts.length} item`
                    : `Total for ${cartProducts.length} items`}
                </h2>
              </div>

              <button
                type="button"
                className="cart-page__checkout-button"
                onClick={() => setHasError(!hasError)}
              >
                Checkout
              </button>
            </div>
          </div>
          {hasError && (
            <div className="cart__error">
              <button
                type="button"
                aria-label="close"
                className="cart__close cart__error__close"
                onClick={() => setHasError(false)}
              />
              <h2 className="cart__error__title">
                We are sorry, but this feature is not implemented yet
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
