/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
// import { useEffect, useState } from 'react';
// import { Product } from '../types/Phone';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CloseIcon, IconSlideLeft, MinusIcon, PlusIcon,
} from '../utils/Icons';
import { Product } from '../types/Phone';
import { LocaleDataTypes, setFavorite } from '../utils/localeStorage';

const Cart = () => {
  const products = localStorage.getItem(LocaleDataTypes.CART);

  const productsFromCart: Product[] = products ? Object.values(JSON.parse(products)) : [];

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  const handleCheckoutButton = () => {
    setIsMessageVisible(true);

    setTimeout(() => setIsMessageVisible(false), 4000);
  };

  useEffect(() => {
    // if (productsFromCart) {
    setVisibleProducts(productsFromCart);
    // }
  }, []);

  const totalPrice = useMemo(() => visibleProducts?.reduce((acc, product) => {
    return acc + product.price;
  }, 0), [visibleProducts?.length]);

  return (
    <main className="cart container">
      <Link to="/" className="link-go-back">
        <IconSlideLeft />
        <span className="link-go-back__caption">Back</span>
      </Link>

      <section className="section">
        <h1 className="section__title cart__title">Cart</h1>

        {visibleProducts.length > 0
          ? (
            <div className="cart__container">
              {/* <div className="cart__content"> */}
              {/* {visibleProducts.map((product) => ( */}
              <div className="cart__content">
                {visibleProducts.map((product: Product) => (
                  <article key={product.id} className="cart__product">
                    <div className="cart__product--wrapper">
                      <button
                        type="button"
                        className="cart__product--close-button"
                        onClick={() => {
                          setFavorite(product.id, LocaleDataTypes.CART);
                          setVisibleProducts(prevProds => [...prevProds].filter(prevProduct => prevProduct.id !== product.id));
                        }}
                      >
                        <CloseIcon />
                      </button>
                      <img
                        src="https://placehold.co/66x66"
                        alt=""
                        className="cart__product--photo"
                      />
                      <p className="cart__product--name">
                        {product.name}
                      </p>
                    </div>

                    <div className="cart__product--side-panel">
                      <div className="cart__product--amount-control">
                        <button type="button" className="cart__product--amount-button">
                          <MinusIcon color="#E2E6E9" />
                        </button>
                        <p className="cart__product--products-amount">1</p>
                        <button type="button" className="cart__product--amount-button">
                          <PlusIcon />
                        </button>
                      </div>
                      <p className="cart__product--price">
                        $
                        {product.price}
                      </p>
                    </div>
                  </article>
                ))}
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
                      : `Total for ${visibleProducts.length} items`}
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
                      className="cart__purchase--checkout product-card--add-to-cart"
                      onClick={() => handleCheckoutButton()}
                    >
                      Checkout
                    </button>
                  )}
              </article>
              {/* )) */}
            </div>
          ) : (
            <p className="cart__empty-cart-message">Your shopping cart is empty.</p>
          )}

        {/* </div> */}
      </section>
    </main>
  );
};

export default Cart;
