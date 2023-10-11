import {
  useContext,
  useEffect,
  useState,
} from 'react';
import uuid from 'react-uuid';
import { BackButton } from '../../components/BackButton';
import { CartCheckout } from '../../components/CartCheckout';
import { Context } from '../../components/Context';
import { Loader } from '../../components/Loader';
import { ProductCart } from '../../components/ProductCart';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getUniqueItems } from '../../helpers/getUniqueItems';
import { Product } from '../../types/Product';

export const CartPage: React.FC = () => {
  const { isLoading, cart } = useContext(Context);

  const [cartList, setCartList] = useState<Product[]>([]);

  const cartItems = () => {
    const list = getUniqueItems(cart, (item: Product) => item.id);

    setCartList(list);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    cartItems();
  }, [cart.length]);

  return (
    <>
      {isLoading
        && <Loader />}

      {!isLoading
        && (
          <div
            className="
              grid__item--tablet-1-12
              grid__item--desktop-1-24"
          >
            <BackButton />

            <section className="page__section cart">
              <h1
                className="
                  page__section-title
                  section__title
                  cart__title"
              >
                Cart
              </h1>

              {!cartList.length && (
                <>
                  <h2 className="cart__empty-title">
                    Your cart is empty...
                  </h2>

                  <ProductsSlider
                    type="recommendations"
                  />
                </>
              )}

              {cartList.length > 0 && (
                <div
                  className="
                    cart__container
                    grid
                    grid--desktop"
                >
                  <ul
                    className="
                      cart__list
                      grid__item--tablet-1-12
                      grid__item--desktop-1-16"
                  >
                    {cartList.map(product => (
                      <ProductCart
                        key={uuid()}
                        product={product}
                      />
                    ))}
                  </ul>

                  <CartCheckout />
                </div>
              )}
            </section>
          </div>
        )}
    </>
  );
};
