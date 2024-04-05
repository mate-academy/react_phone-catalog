import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { actions as productsActions } from '../../store/reducers/products';
import { handleLocalStorage } from '../../utils/helpers/helpers';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { viewportWidth } = useAppSelector(state => state.viewport);
  const { cart } = useAppSelector(state => state.products);

  const [duplicateCart, setDuplicateCart] = useState([...cart]);
  const navigate = useNavigate();

  /* local storage start */

  const displyedCartItems = useMemo(() => {
    return handleLocalStorage('cart');
  }, [cart]);

  /* local storage end */

  /* handler functions start */

  const removeFromCart = (valueId: string) => {
    const updated = displyedCartItems.filter(
      (item: Product) => item.id !== valueId,
    );

    localStorage.setItem('cart', JSON.stringify(updated));
    dispatch(productsActions.removeFromCart(valueId));
  };

  const addDuplicate = (duplicate: Product) => {
    setDuplicateCart(prev => [...prev, duplicate]);
  };

  const removeDuplicate = (valueId: string) => {
    const toRemove = duplicateCart.findIndex(item => item.id === valueId);

    setDuplicateCart(prev => {
      const toReturn = [...prev];

      toReturn.splice(toRemove, 1);

      return toReturn;
    });
  };

  const handleGoBack = () => navigate(-1);

  /* handler functions end */

  const getItemCount = (productId: string) => {
    let count = 0;

    duplicateCart.forEach(item => {
      if (item.id === productId) {
        count++;
      }
    });

    return count;
  };

  const totalPrice = duplicateCart.reduce(
    (sum, el) => sum + el.priceDiscount,
    0,
  );

  useEffect(() => setDuplicateCart([...cart]), [cart]);

  const getLink = (item: Product) => {
    const category = item.category.toLowerCase();

    return `/${category}/${item.id}`;
  };

  /* JSX pieces start */

  const getCartItem = (product: Product) => {
    return (
      <>
        <button
          className="cart-item__delete"
          onClick={() => removeFromCart(product.id)}
        />

        <Link to={getLink(product)} className="cart-item__link">
          <img
            className="cart-item__img"
            src={product.images[0]}
            alt="cart-item"
          />
        </Link>

        <p className="cart-item__title">{product.name}</p>
      </>
    );
  };

  const getCartItems = (product: Product) => {
    return (
      <>
        <div className="cart-item__counter">
          <button
            className="cart-item__icon"
            onClick={() => removeDuplicate(product.id)}
            disabled={getItemCount(product.id) === 1}
          >
            <div className="cart-item__minus" />
          </button>

          <p className="cart-item__count">{getItemCount(product.id)}</p>

          <button
            className="cart-item__icon"
            onClick={() => addDuplicate(product)}
          >
            <div className="cart-item__plus" />
          </button>
        </div>

        <p className="cart-item__price">${product.priceDiscount}</p>
      </>
    );
  };

  /* JSX pieces end */

  return (
    <section className="cart">
      <div className="cart__link-back" onClick={handleGoBack}>
        <div className="cart__arrow" />

        <p className="cart__link-text">Back</p>
      </div>

      <h2 className="cart__title">Cart</h2>

      <div className="cart__cart">
        {cart?.length ? (
          <>
            <div className="cart__items">
              {cart.map(product => (
                <article className="cart-item" key={product.id}>
                  {viewportWidth < 640 ? (
                    <>
                      <div className="cart-item__item">
                        {getCartItem(product)}
                      </div>

                      <div className="cart-item__items">
                        {getCartItems(product)}
                      </div>
                    </>
                  ) : (
                    <>
                      {getCartItem(product)}

                      {getCartItems(product)}
                    </>
                  )}
                </article>
              ))}
            </div>

            <div className="cart__checkout">
              <div className="cart__description">
                <p className="cart__price">${totalPrice}</p>

                <p className="cart__items-count">
                  Total for {duplicateCart?.length}&nbsp;
                  {duplicateCart?.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button className="cart__button">Checkout</button>
            </div>
          </>
        ) : (
          <div className="empty-page">
            <article className="empty-page__card">
              <h3 className="empty-page__title">
                Looks like the cart is asleep
              </h3>

              <Link to="/" className="empty-page__button">
                Wake it up
              </Link>
            </article>

            <div className="empty-page__img-grid">
              <div className="empty-page__img empty-page__img--cart" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
