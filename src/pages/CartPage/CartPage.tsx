import {
  useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as cartSlice from '../../features/cartSlice';
import { NoResults } from '../../components/NoResults';
import { BASE_URL } from '../../utils/httpClient';

import './CartPage.scss';
import { Product } from '../../types/Product';
import { getProductByItemId } from '../../api/products';

type Props = {
};

export const CartPage: React.FC<Props> = (
) => {
  const dispatch = useAppDispatch();
  const { items: cart } = useAppSelector(state => state.cart);
  const { items: products } = useAppSelector(state => state.products);
  const location = useLocation();
  const [isCheckout, setIsCheckout] = useState(false);

  const visibleProducts = cart;
  const {
    totalPrice,
    totalQuantity,
  } = cart.reduce((amount, item) => ({
    totalPrice: amount.totalPrice + (item.product.price * item.quantity),
    totalQuantity: amount.totalQuantity + item.quantity,
  }), {
    totalPrice: 0,
    totalQuantity: 0,
  });

  const handleCheckoutClick = () => setIsCheckout(prev => !prev);
  const addToCart = (productId: Product['itemId']) => {
    const product = getProductByItemId(products, productId);

    return product && dispatch(cartSlice.add(product));
  };

  const takeFromCart = (productId: Product['itemId']) => {
    const product = getProductByItemId(products, productId);

    return product && dispatch(cartSlice.take(product));
  };

  const removeFromCart = (productId: Product['itemId']) => {
    const product = getProductByItemId(products, productId);

    return product && dispatch(cartSlice.remove(product));
  };

  return (
    <div
      data-cy="productList"
      className="CartPage
      CartPage__container
      page__container"
    >
      <div className="CartPage__top">
        <Link
          to={{
            pathname: location.state?.from,
            search: location.state?.search,
          }}
          className="CartPage__link CartPage__link-back"
        >
          <div className="CartPage__icon icon--arrow-left" />

          <div className="CartPage__item-info">Back</div>
        </Link>
      </div>

      <h1 className="CartPage__title">Cart</h1>

      {visibleProducts.length ? (
        <div className="CartPage__content">
          <div className="CartPage__CartItems">
            {
              visibleProducts.map((cartItem) => {
                const isFirst = cartItem.quantity <= 1;

                return (
                  <div
                    key={cartItem.product.itemId}
                    className="CartItem CartItem__container"
                  >
                    <section
                      className="CartItem__section CartItem__section--img"
                    >
                      <button
                        data-cy="cartDeleteButton"
                        type="button"
                        aria-label="cartDeleteButton"
                        className="ProductsSlider__button
                        CartItem__button--delete"
                        onClick={() => removeFromCart(cartItem.product.itemId)}
                      >
                        <i className="CartItem__icon icon--close" />
                      </button>

                      <Link
                        to={`/${cartItem.product.category}/${cartItem.product.itemId}`}
                        state={{ from: location.pathname }}
                        className="CartItem__link"
                      >
                        <img
                          src={`${BASE_URL}${cartItem.product.image}`}
                          alt={cartItem.product.name}
                          className="CartItem__img"
                        />

                        <p className="CartItem__name">
                          {cartItem.product.name}
                        </p>
                      </Link>
                    </section>

                    <section className="CartItem__section">
                      <div className="CartItem__buttons">
                        <button
                          type="button"
                          aria-label="quantityDecrease"
                          className={cn('ProductsSlider__button', {
                            'ProductsSlider__button--defualt': !isFirst,
                            'ProductsSlider__button--disabled': isFirst,
                          })}
                          disabled={isFirst}
                          onClick={() => takeFromCart(cartItem.product.itemId)}
                        >
                          <i className="ProductsSlider__icon icon--minus" />
                        </button>

                        <div className="CartItem__button CartItem__quantity">
                          {cartItem.quantity}
                        </div>

                        <button
                          data-cy="paginationRight"
                          type="button"
                          aria-label="quantityIncrease"
                          className={cn('ProductsSlider__button', {
                            'ProductsSlider__button--defualt': true,
                            'ProductsSlider__button--disabled': false,
                          })}
                          disabled={false}
                          onClick={() => addToCart(cartItem.product.itemId)}
                        >
                          <i className="ProductsSlider__icon icon--plus" />
                        </button>
                      </div>

                      <h2
                        className="CartItem__price
                      ProductCard__price--discount"
                      >
                        {`$${cartItem.product.price}`}
                      </h2>
                    </section>
                  </div>
                );
              })
            }
          </div>

          <div className="CartPage__total">
            <h2
              className="ProductCard__price--discount
              CartPage__total__price"
            >
              {`$${totalPrice}`}
            </h2>

            <p className="CartPage__total__info">{`Total for ${totalQuantity} items`}</p>

            <hr className="CartPage__total__hr" />

            <button
              type="button"
              className={cn('ProductCardButtons__button__cart',
                'CartPage__total__button',
                { 'ProductCardButtons__button__cart--active': false })}
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
            {isCheckout && (
              <div style={{ maxWidth: '272px' }}>
                <NoResults title="We are sorry,
                 but this feature is not implemented yet"
                />
              </div>
            )}
          </div>

        </div>
      ) : (
        <div className="CartPage__error">
          <NoResults title="Your cart is empty" />
        </div>
      )}
    </div>
  );
};
