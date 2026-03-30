import { useState } from 'react';
import { Back } from '../../components/Back';
import { Checkout } from '../../components/Checkout/Checkout';
import { useCartDispatch, useCartState } from '../../store/CartProvider';
import style from './ShoppingCartPage.module.scss';
import { Link } from 'react-router-dom';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

export const ShoppingCartPage = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const { theme } = useTheme();
  const { items } = useCartState();
  const dispatch = useCartDispatch();
  const checkoutPrice = items.reduce((sum, item) => {
    const fullItemPrice = item.product.price * item.quantity;

    return fullItemPrice + sum;
  }, 0);

  const handleDelete = (itemId: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemId });
  };

  const handleUpdate = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleClearCart = () => {
    setIsCheckout(false);
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <aside className={style.shoppingCart}>
      <Back />
      <h1 className={style.shoppingCart__title}>Cart</h1>
      {items.length === 0 && (
        <div className={style.shoppingCart__emptyContainer}>
          <img
            src="/img/cart-is-empty.png"
            alt="cart-is-empty"
            className={style.shoppingCart__emptyImg}
          />
          <p className={style.shoppingCart__emptyTitle}>Cart is empty</p>
        </div>
      )}

      {items.length !== 0 && (
        <div className={style.shoppingCart__container}>
          <div className={style.shoppingCart__content}>
            {items.map(item => {
              const productUrl = `/${item.product.category}/${item.id}`;

              return (
                <div className={style.cartCard} key={item.id}>
                  <div className={style.cartCard__info}>
                    <img
                      src="/img/close.svg"
                      alt="close"
                      className={style.cartCard__close}
                      onClick={() => handleDelete(item.id)}
                    />
                    <Link to={productUrl}>
                      <img
                        src={item.product.image}
                        alt={item.product.image}
                        className={style.cartCard__img}
                      />
                    </Link>
                    <span className={style.cartCard__name}>
                      {item.product.name}
                    </span>
                  </div>
                  <div className={style.cartCard__controls}>
                    <div className={style.cartCard__quantity}>
                      <button
                        className={style.cartCard__button}
                        onClick={() => handleUpdate(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        {item.quantity === 1 ? (
                          <img
                            src={theme === 'dark' ? ICONS.minus : ICONS.minus}
                            alt="minus"
                          />
                        ) : (
                          <img
                            src={
                              theme === 'dark'
                                ? ICONS.darkMinusAcive
                                : ICONS.minusActive
                            }
                            alt="minus"
                          />
                        )}
                      </button>
                      <span className={style.cartCard__quantityCount}>
                        {item.quantity}
                      </span>
                      <button
                        className={style.cartCard__button}
                        onClick={() => handleUpdate(item.id, item.quantity + 1)}
                      >
                        <img
                          src={
                            theme === 'dark'
                              ? ICONS.darkPluseActive
                              : ICONS.plusActive
                          }
                          alt="plus"
                        />
                      </button>
                    </div>
                    <h3 className={style.cartCard__price}>
                      {`$${item.product.price * item.quantity}`}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.purchase}>
            <h2 className={style.purchase__price}>{`$${checkoutPrice}`}</h2>
            <span className={style.purchase__totalItems}>
              {`Total for ${items.length} items`}
            </span>
            <button
              className={style.purchase__button}
              onClick={() => {
                setIsCheckout(true);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {isCheckout && (
        <Checkout onCheckout={setIsCheckout} onClearCart={handleClearCart} />
      )}
    </aside>
  );
};
