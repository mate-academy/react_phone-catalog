import { useTranslation } from 'react-i18next';
import { GoBackButton } from '../../components/GoBackButton';
import styles from './CartPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { CartItem } from '../../components/CartItem';
import { useEffect, useState } from 'react';
import emptyCartImg from '../../images/cart-is-empty.png';
import { Modal } from '../../components/Modal';
import { clearCart } from '../../features/cartSlice';
import { Loader } from '../../components/Loader';

export const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartProducts } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
  const totalCount = cartProducts.reduce(
    (count, product) => count + product.quantity,
    0,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getItemForm = (count: number) => {
    if (count === 1) {
      return 'one';
    }

    if (count >= 2 && count <= 4) {
      return 'few';
    }

    if (count > 4) {
      return 'many';
    }

    return 'other';
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <GoBackButton
          className={styles.customBackButton}
          iconClassName={styles.customIcon}
          title={t('buttonBack.back')}
          onClick={() => navigate(-1)}
        />
      </div>

      <h1 className={styles.cartTitle}>{t('cartPage.title')}</h1>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : cartProducts.length > 0 ? (
          <>
            <ul className={styles.list}>
              {cartProducts.map(product => (
                <Link
                  to={`/${product.category}/:${product.itemId}`}
                  className={styles.cartItem}
                  key={product.id}
                >
                  <CartItem product={product} />
                </Link>
              ))}
            </ul>
            <div className={styles.totalCheckoutBlock}>
              <div className={styles.containerBtm}>
                <p className={styles.totalPrice}>{`$${totalPrice}`}</p>
                <p className={styles.totalCount}>
                  {t('cartPage.totalFor', {
                    count: totalCount,
                    items: t(`cartPage.items.${getItemForm(totalCount)}`),
                  })}
                </p>
                <span className={styles.line}></span>
              </div>
              <button
                className={styles.checkoutBtn}
                onClick={handleCheckoutClick}
              >
                {t('cartPage.checkout')}
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyContent}>
            <p className={styles.emptyCartMessage}>{t('cartPage.emptyCart')}</p>
            <img
              className={styles.emptyImg}
              src={emptyCartImg}
              alt="Empty Cart"
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};
