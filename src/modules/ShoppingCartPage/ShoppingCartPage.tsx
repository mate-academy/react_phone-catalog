import React, { useEffect, useState } from 'react';
import shoppingCartPageStyles from './ShoppingCartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { GoBack } from '../../components/GoBack';
import { getProductsByIds } from '../../services/products';
import { CartList } from './components/CartList';
import { CartItemDetails } from '../../types/CartItemDetails';
import { ActionButton } from '../../components/ActionButton';
import { LoaderOverlay } from '../../components/LoaderOverlay';
import lodash from 'lodash';
import { Divider } from '../../components/Divider/Divider';

export const ShoppingCartPage = () => {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<CartItemDetails[]>([]);
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

  useEffect(() => {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
  }, [cart]);

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <section className={shoppingCartPageStyles.shoppingCart}>
      <GoBack />
      <h1 className={shoppingCartPageStyles.shoppingCart__title}>Cart</h1>
      {cart.length === 0 ? (
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
            <ActionButton
              className={shoppingCartPageStyles.shoppingCart__checkoutButton}
            >
              Checkout
            </ActionButton>
          </div>
        </div>
      )}
    </section>
  );
};
