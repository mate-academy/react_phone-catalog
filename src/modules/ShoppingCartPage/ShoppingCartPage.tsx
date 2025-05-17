import React, { useCallback, useEffect, useState } from 'react';
import shoppingCartPageStyles from './ShoppingCartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { GoBack } from '../../components/GoBack';
import { getProductsByIds } from '../../services/products';
import { CartList } from './components/CartList';
import { CartItemDetails } from '../../types/CartItemDetails';
import { TextButton } from '../../components/TextButton';
import lodash from 'lodash';
import { Divider } from '../../components/Divider/Divider';
import { useLoading } from '../../context/LoadingContext';
import { useError } from '../../context/ErrorContext';
import { handleErrorMessage } from '../../utils/handleErrorMessage';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';

export const ShoppingCartPage = () => {
  const { cart } = useCart();
  const { startLoading, stopLoading } = useLoading();
  const [products, setProducts] = useState<CartItemDetails[]>([]);
  const { addError } = useError();
  const [isHasError, setIsHasError] = useState(false);
  const totalPrice = lodash
    .chain(products)
    .map(product => product.totalPrice)
    .sum()
    .value();
  const totalQuantity = lodash
    .chain(products)
    .map(product => product.quantity)
    .sum()
    .value();

  const loadProducts = useCallback(() => {
    startLoading();
    getProductsByIds(cart.map(item => item.id))
      .then(productsFromServer =>
        setProducts(
          cart
            .map(item => {
              const productFromServer = productsFromServer.find(
                product => product.itemId === item.id,
              );

              if (!productFromServer) {
                return null;
              }

              const quantity = item.quantity;

              return {
                ...productFromServer,
                quantity,
                totalPrice: productFromServer.price * quantity,
              };
            })
            .filter((product): product is CartItemDetails => product !== null),
        ),
      )
      .catch(err => {
        addError(handleErrorMessage(err, 'Failed to load products.'));
        setIsHasError(true);
      })
      .finally(() => stopLoading());
  }, [cart, startLoading, stopLoading, addError]);

  useEffect(() => loadProducts(), [loadProducts]);

  return (
    <section className={shoppingCartPageStyles.shoppingCart}>
      <GoBack />
      <h1 className={shoppingCartPageStyles.shoppingCart__title}>Cart</h1>
      {isHasError ? (
        <ErrorFallback onRetry={loadProducts} />
      ) : cart.length === 0 ? (
        <div className={shoppingCartPageStyles.shoppingCart__emptyCart}>
          <p className={shoppingCartPageStyles.shoppingCart__description}>
            Your cart is empty
          </p>
          <img
            src="/public/img/cart-is-empty.png"
            alt="Empty cart image"
            className={shoppingCartPageStyles.shoppingCart__emptyCartImage}
          />
        </div>
      ) : (
        <div className={shoppingCartPageStyles.shoppingCart__content}>
          <CartList
            products={products}
            className={shoppingCartPageStyles.shoppingCart__cartList}
          />
          <div className={shoppingCartPageStyles.shoppingCart__checkout}>
            <div className={shoppingCartPageStyles.shoppingCart__details}>
              <p className={shoppingCartPageStyles.shoppingCart__totalPrice}>
                ${totalPrice}
              </p>
              <p className={shoppingCartPageStyles.shoppingCart__subtitle}>
                Total for {totalQuantity} items
              </p>
            </div>
            <Divider />
            <TextButton
              className={shoppingCartPageStyles.shoppingCart__checkoutButton}
            >
              Checkout
            </TextButton>
          </div>
        </div>
      )}
    </section>
  );
};
