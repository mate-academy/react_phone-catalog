import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../store/cartSlice';
import { getImageUrl } from '../../api/getImage';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce((sum, item) => {
    const itemPrice = item.product.priceDiscount || item.product.price || 0;

    return sum + itemPrice * item.quantity;
  }, 0);

  const totalItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0,
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.page__back} onClick={() => navigate(-1)}>
        {'<'} Back
      </button>

      <h1 className={styles.page__title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.page__empty}>Your cart is empty</p>
      ) : (
        <div className={styles.page__content}>
          <div className={styles.page__list}>
            {cartItems.map(item => {
              const imageSrc =
                item.product.image ||
                item.product.imageUrl ||
                item.product.images?.[0] ||
                '';
              const cleanImageSrc = imageSrc.startsWith('/')
                ? imageSrc.slice(1)
                : imageSrc;
              const finalImage = `${import.meta.env.BASE_URL}${cleanImageSrc}`;

              <img
                src={getImageUrl(item.product.image)} // Просто передаємо сюди рядок з API
                alt={item.product.name}
                className={styles.card__image}
              />;
              const itemPrice =
                item.product.priceDiscount || item.product.price;

              return (
                <div key={item.id} className={styles.cart_item}>
                  <div className={styles.cart_item__info}>
                    <button
                      className={styles.cart_item__remove}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <img src="./img/close.png" alt="Remove" />
                    </button>

                    <Link
                      to={`/${item.product.category}/${item.product.itemId || item.product.id}`}
                      className={styles.cart_item__image_link}
                    >
                      <img
                        src={finalImage}
                        alt={item.product.name}
                        className={styles.cart_item__image}
                      />
                    </Link>

                    <Link
                      to={`/${item.product.category}/${item.product.itemId || item.product.id}`}
                      className={styles.cart_item__title}
                    >
                      {item.product.name}
                    </Link>
                  </div>

                  <div className={styles.cart_item__action}>
                    <div className={styles.cart_item__controls}>
                      <button
                        className={styles.cart_item__btn}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                      >
                        <img src="./img/minus.png" alt="Minus" />
                      </button>
                      <span className={styles.cart_item__quantity}>
                        {item.quantity}
                      </span>
                      <button
                        className={styles.cart_item__btn}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                      >
                        <img src="./img/plus.png" alt="Plus" />
                      </button>
                    </div>

                    <span className={styles.cart_item__price}>
                      ${itemPrice}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summary}>
            <div className={styles.summary__total}>
              <span className={styles.summary__price}>${totalAmount}</span>
              <span className={styles.summary__text}>
                Total for {totalItemsCount} items
              </span>
            </div>
            <button className={styles.summary__button} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
