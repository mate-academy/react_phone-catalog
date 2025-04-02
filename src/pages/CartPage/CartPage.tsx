import { useCart } from '@context/CartContext';
import styles from './CartPage.module.scss';
import { BackButton } from '@components/Buttons/BackButton';
import EmptyImg from '../../../public/img/cart-is-empty.png';
import { CloseIcon } from '@components/Icons/CloseIcon';
import cn from 'classnames';
import { PlusIcon } from '@components/Icons/PlusIcon';
import { MinusIcon } from '@components/Icons/MinusIcon';
import { PrimaryButton } from '@components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';
import { ROUTES } from '@routes/index';
import { useState } from 'react';
import { Modal } from '@components/Modal';
export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCheckout}
      />
      <section className={styles.cart}>
        <BackButton />
        <h1 className={cn(styles.cart__title, 'main-title')}>Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.empty__title}>Your cart is empty.</p>
            <img
              src={EmptyImg}
              alt="Empty cart"
              className={styles.empty__img}
            />
          </div>
        ) : (
          <div className={styles.cart__container}>
            <ul className={styles.cart__list}>
              {cart.map(({ id, product, quantity }) => (
                <li key={id} className={styles.cart__item}>
                  <div className={styles.cart__content}>
                    <button
                      className={styles.cart__item_remove}
                      onClick={() => removeFromCart(id)}
                    >
                      <CloseIcon />
                    </button>
                    {/* Зроблено фото товару лінкою */}
                    <Link
                      to={ROUTES.PRODUCT_DETAILS(
                        product.category,
                        String(product.itemId),
                      )}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.cart__item_img}
                      />
                    </Link>

                    {/* Зроблено назву товару лінкою */}
                    <Link
                      to={ROUTES.PRODUCT_DETAILS(
                        product.category,
                        String(product.itemId),
                      )}
                    >
                      <p className={styles.cart__item_name}>{product.name}</p>
                    </Link>
                  </div>
                  <div className={styles.cart__actions}>
                    <div className={styles.cart__quantity_controls}>
                      <button
                        className={cn(styles.cart__minus, 'button-icon', {
                          disabled: quantity === 1,
                        })}
                        disabled={quantity === 1}
                        onClick={() => updateQuantity(id, quantity - 1)}
                      >
                        <MinusIcon disabled={quantity === 1} />
                      </button>

                      <span>{quantity}</span>

                      <button
                        className={cn(styles.cart__plus, 'button-icon')}
                        onClick={() => updateQuantity(id, quantity + 1)}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <h3 className="three-title">${product.price}</h3>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.cart__summary}>
              <h2 className={cn(styles.cart__total_price, 'secondary-title')}>
                ${totalPrice}
              </h2>
              <p className={styles.cart__total_items}>
                Total for {totalQuantity} items
              </p>
              <div className={styles.cart__checkout_btn}>
                <PrimaryButton
                  mainText="Checkout"
                  selectedText="Success"
                  onClick={handleCheckout}
                  isSelected={false}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
