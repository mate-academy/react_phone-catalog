import React, { useState } from 'react';
import { BackButton } from '../../components/Buttons/BackButton';
import { CartItem } from '../../components/CartItem';
import { Divider } from '../../components/Divider';
import { Modal } from '../../components/Modal';
import { CenteredContent } from '../../components/CenteredContent';
import { NotFound } from '../../components/NotFound';
import { useCart } from '../../hooks/useCart';
import { useTranslate } from '../../hooks/useTranslate';
import { formatPrice } from '../../utils/formatPrice';
import { IMG_NOT_FOUND, TITLE_NOT_FOUND } from '../../constants/notFound';
import style from './Cart.module.scss';
import cn from 'classnames';

export const Cart: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const t = useTranslate();

  const {
    cartList,
    deleteFromCart,
    updateQty,
    clearCart,
    totalCartItems,
    totalCartAmount,
  } = useCart();

  const hasCartItems = cartList.length > 0;

  const handleConfirm = () => {
    clearCart();
    setModalIsOpen(false);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (!hasCartItems) {
    return (
      <CenteredContent>
        <NotFound img={IMG_NOT_FOUND.product} text={TITLE_NOT_FOUND.cart} />
      </CenteredContent>
    );
  }

  return (
    <div className="pageSection">
      <BackButton />

      <Modal
        isOpen={modalIsOpen}
        cancelFn={closeModal}
        primaryFn={handleConfirm}
        content={t('cart.checkout-content')}
      />

      <h1 className={cn('pageTitle', style.cartTitle)}>
        {t('categories.cart')}
      </h1>

      <div className={style.cartContent}>
        <section className={style.cartList}>
          {cartList.map(item => (
            <CartItem
              key={item.id}
              cartEntry={item}
              onDelete={deleteFromCart}
              updateQty={updateQty}
            />
          ))}
        </section>

        <section className={style.cartSummary}>
          <div className={style.cartSummaryTotal}>
            <strong className={style.cartSummaryAmount}>
              {formatPrice(totalCartAmount)}
            </strong>
            <p className={style.cartSummarySubtitle}>
              {`${t('cart.total-for')} ${totalCartItems} ${t('cart.items', { count: totalCartItems })}`}
            </p>
          </div>

          <Divider />

          <button
            type="button"
            onClick={openModal}
            className={style.cartSummaryCheckout}
          >
            {t('cart.checkout')}
          </button>
        </section>
      </div>
    </div>
  );
};
