import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton';
import { CartCheckout } from '../../components/CartCheckout';
import { ProductCart } from '../../components/ProductCart';
import { Loader } from '../../components/Loader';
import { ErrorNotification } from '../../components/ErrorNotification';
import { getUniqueItems } from '../../helpers/getUniqueItems';
import { Product } from '../../types/Product';

export const CartPage = () => {
  const { cart } = useAppSelector(state => state.favoriteAndCartProducts);
  const { loaded, isError } = useAppSelector(state => state.products);

  const [cartList, setCartList] = useState<Product[]>([]);

  const cartItems = () => {
    const list = getUniqueItems(cart, (item: Product) => item.id);

    setCartList(list);
  };

  useEffect(() => {
    cartItems();
  }, [cart.length]);

  return (
    <>
      {loaded ? (
        <>
          <BackButton />

          {isError ? (
            <ErrorNotification error={isError} />
          ) : (
            <div className="grid__item--desktop-1-24">
              <section className="
                page__section
                cart"
              >
                <h1 className="
                  page__section-title
                  cart__title"
                >
                  Cart
                </h1>

                {cartList.length ? (
                  <div className="
                    cart__container
                    grid grid--desktop"
                  >
                    <ul className="
                      cart__list
                      grid__item--desktop-1-16"
                    >
                      <TransitionGroup>
                        {cartList.map(product => (
                          <CSSTransition
                            key={product.id}
                            timeout={500}
                            classNames="item"
                          >
                            <ProductCart
                              key={product.id}
                              product={product}
                            />
                          </CSSTransition>
                        ))}
                      </TransitionGroup>
                    </ul>

                    <CartCheckout />
                  </div>
                ) : (
                  <h2 className="cart__empty-title">
                    Your cart is empty...
                  </h2>
                )}
              </section>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
