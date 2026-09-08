import { useState } from 'react';
import classNames from 'classnames';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useCartStore from '../../stores/useCartStore';
import useLanguageStore from '../../stores/useLanguageStore';
import styles from './CartPage.module.scss';
import { Modal } from '../../components/Modal';
import cartIsEmpty from '../../images/cart-is-empty.png';
import { useNavigate } from 'react-router-dom';
import { CloseIcon, MinusIcon, PlusIcon } from '../../components/icons';

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();
  const { t } = useLanguageStore();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = () => {
    clearCart();
  };

  const handleViewDetailsClick = (
    e: React.MouseEvent<HTMLLIElement>,
    category: string,
    itemId: string,
  ) => {
    const target = e.target as HTMLElement;

    if (target.closest('button')) {
      return;
    }

    navigate(`/${category}/${itemId}`);
  };

  return (
    <div className={styles.cart}>
      <Breadcrumbs product={null} />

      <h1 className={styles.cart__title}>{t('nav_cart')}</h1>

      {cartItems.length === 0 ? (
        <div className={styles.cart__message_wrapper}>
          <h3 className={styles.cart__message}>{t('cart_no_items')}</h3>
          <img
            className={styles.cart__message_img}
            src={cartIsEmpty}
            alt="cart is empty"
          />
        </div>
      ) : (
        <div className={styles.cart__content}>
          <ul className={styles['cart__items-list']}>
            {cartItems.map(item => (
              <li
                className={styles['cart-item']}
                key={item.id}
                onClick={e =>
                  handleViewDetailsClick(e, item.category, item.itemId)
                }
              >
                <div className={styles['cart-item__main-info']}>
                  <button
                    className={classNames(
                      styles['cart-item__button'],
                      styles['cart-item__remove-button'],
                    )}
                    // className={styles['cart-item__button']}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <CloseIcon />
                  </button>
                  <div className={styles['cart-item__image-container']}>
                    <img
                      className={styles['cart-item__image']}
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <p className={styles['cart-item__name']}>{item.name}</p>
                </div>

                <div className={styles['cart-item__actions-group']}>
                  <div className={styles['cart-item__counter']}>
                    <button
                      className={classNames(
                        styles['cart-item__button'],
                        styles['cart-item__counter-button--decrease'],
                        { [styles.disabled]: item.quantity === 1 },
                      )}
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                    >
                      <MinusIcon />
                    </button>
                    <p className={styles['cart-item__counter-value']}>
                      {item.quantity}
                    </p>
                    <button
                      className={styles['cart-item__button']}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <PlusIcon />
                    </button>
                  </div>

                  <h3 className={styles['cart-item__price']}>${item.price}</h3>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.cart__summary}>
            <h2 className={styles['cart__summary-total-price']}>
              ${getTotalPrice()}
            </h2>

            <p className={styles['cart__summary-info']}>
              {t('cart_total_for')} {getTotalItems()}{' '}
              {t('category_models_count')}
            </p>

            <div className={styles['cart__summary-divider']}></div>

            <button
              className={styles['cart__checkout-button']}
              onClick={handleCheckout}
            >
              {t('cart_checkout_button')}
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Закриття модального вікна (скасування)
        onConfirm={handleConfirmClear} // Підтвердження (очистити кошик)
        title={t('cart_checkout_button')} // Можна використовувати як заголовок
        message={t('checkout_confirmation_message')}
        confirmText={t('modal_confirm')}
        cancelText={t('modal_cancel')}
      />
    </div>
  );
}

export default CartPage;
