/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useMemo, useState } from 'react';
// import {
//   CloseIcon, MinusIcon, PlusIcon,
// } from '../utils/Icons';
import { Product } from '../types/Phone';
import {
  LocaleDataTypes, setStorage,
} from '../utils/localeStorage';
import GoBackLink from './GoBackLink';
import CartProduct from './CartProduct';

const Cart = () => {
  const products = localStorage.getItem(LocaleDataTypes.CART);
  const productsFromCart: Product[] = products
    ? Object.values(JSON.parse(products))
    : [];
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  const handleCheckoutButton = () => {
    setIsMessageVisible(true);

    setTimeout(() => setIsMessageVisible(false), 4000);
  };

  useEffect(() => {
    setVisibleProducts(productsFromCart);
  }, []);

  const totalPrice = useMemo(() => visibleProducts?.reduce((acc, product) => {
    return acc + product.price * product.amount;
  }, 0), [visibleProducts]);

  const totalAmount = useMemo(() => visibleProducts?.reduce((acc, product) => {
    return acc + product.amount;
  }, 0), [visibleProducts]);

  const updateProductAmount = (productId: string, newAmount: number) => {
    const updatedProducts = visibleProducts
      .map((product) => (product.id === productId
        ? { ...product, amount: newAmount }
        : product));

    setVisibleProducts(updatedProducts);
  };

  return (
    <main className="cart container">
      <GoBackLink />

      <section className="section">
        <h1 className="section__title cart__title">Cart</h1>

        {visibleProducts.length > 0
          ? (
            <div className="cart__container">
              <div className="cart__content">
                {visibleProducts.map((product: Product) => {
                  return (
                    <CartProduct
                      key={product.id}
                      product={product}
                      setStorage={setStorage}
                      setVisibleProducts={setVisibleProducts}
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
                    {visibleProducts.length === 1
                      ? 'Total for 1 item'
                      : `Total for ${totalAmount} items`}
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
