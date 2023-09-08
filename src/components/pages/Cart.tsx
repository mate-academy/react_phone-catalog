import { useMemo, useState } from 'react';

import GoBackLink from '../Blocks/GoBackLink';
import CartProduct from '../Blocks/CartProduct';

import { Product } from '../../types/Phone';

import {
  LocaleDataTypes,
  setStorage,
} from '../../utils/localeStorage';
import { useProductsContext } from '../../utils/ProductsContext';

const Cart = () => {
  const {
    cartProducts,
    setCartProducts,
    totalAmountInCart,
  } = useProductsContext();

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  const handleCheckoutButton = () => {
    setIsMessageVisible(true);

    setTimeout(() => setIsMessageVisible(false), 4000);
  };

  const totalPrice = useMemo(() => cartProducts?.reduce((acc, product) => {
    return acc + product.price * product.amount;
  }, 0), [cartProducts]);

  const updateProductAmount = (productId: string, newAmount: number) => {
    const updatedProducts = cartProducts
      .map((product) => (product.id === productId
        ? { ...product, amount: newAmount }
        : product));

    setCartProducts(updatedProducts);
  };

  const handleDelete = (id: string) => {
    setStorage(id, LocaleDataTypes.CART);
    setCartProducts((prevProds) => [...prevProds].filter(
      (prevProduct) => prevProduct.id !== id,
    ));
  };

  return (
    <main className="cart container">
      <GoBackLink />

      <section className="section">
        <h1 className="section__title cart__title">Cart</h1>

        {cartProducts.length > 0
          ? (
            <div className="cart__container">
              <div className="cart__content">
                {cartProducts.map((product: Product) => {
                  return (
                    <CartProduct
                      key={product.id}
                      product={product}
                      handleDelete={handleDelete}
                      updateProductAmount={updateProductAmount}
                    />
                  );
                })}
              </div>

              <article className="cart__purchase">
                <div className="cart__purchase--total">
                  <h2 className="cart__purchase--total--price">
                    $
                    {totalPrice}
                  </h2>
                  <p className="cart__purchase--total--amount">
                    {totalAmountInCart === 1
                      ? 'Total for 1 item'
                      : `Total for ${totalAmountInCart} items`}
                  </p>
                </div>

                {isMessageVisible
                  ? (
                    <p className="feature-is-not-available">
                      We are sorry, but this feature is not implemented yet
                    </p>
                  ) : (
                    <button
                      type="button"
                      // eslint-disable-next-line max-len
                      className="cart__purchase--checkout product-card--add-to-cart"
                      onClick={() => handleCheckoutButton()}
                    >
                      Checkout
                    </button>
                  )}
              </article>
            </div>
          ) : (
            <p className="cart__empty-cart-message">Your cart is empty</p>
          )}
      </section>
    </main>
  );
};

export default Cart;
