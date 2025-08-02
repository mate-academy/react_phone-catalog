import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import {
  clearCart,
  selectTotalItems,
  selectTotalPrice,
} from '../../features/cartSlice';
import { useDispatch } from 'react-redux';
import { Modal } from './components/organisms/Modal';
import { PageMessage } from '../shared/molecules/PageMessage';
import { Heading } from '../shared/molecules/Heading';
import { Typography } from '../shared/atoms/Typography';
import { Button } from '../shared/atoms/Button';
import { CartItem } from './components/organisms/CartItem';
import { Divider } from '../shared/atoms/Divider';
import { BackButton } from '../shared/atoms/BackButton';
import { HTMLDataAttr } from '../../enums/htmlDataAttribs';
import { setElementDataAttr } from '../../helpers/setHtmlDataAttr';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();

  const { cartItems } = useAppSelector(state => state.cart);
  const totalItems = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setElementDataAttr('body', HTMLDataAttr.Modal, isModalOpen);
  }, [isModalOpen]);

  return (
    <>
      <BackButton className={styles.back} />
      <div className={styles.cart}>
        <Heading title={t('cart.title')} />

        {cartItems.length > 0 ? (
          <div className={styles.content}>
            <div className={styles.list}>
              {cartItems.map(item => (
                <CartItem product={item} key={item.id} />
              ))}
            </div>

            <div className={styles.total}>
              <div className={styles.total__info}>
                <Typography
                  variant="h2"
                  tag="h2"
                  className={styles.total__price}
                >
                  {totalPrice}
                </Typography>
                <Typography
                  variant="body"
                  className={styles.total__items_count}
                  color="secondary"
                >
                  {t('cart.total', { count: totalItems })}
                </Typography>
              </div>
              <div>
                <Divider />
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className={styles.total__button}
                size="large"
                fullWidth
              >
                <Typography variant="buttons" color="inherit">
                  {t('cart.checkout')}
                </Typography>
              </Button>
            </div>
          </div>
        ) : (
          <PageMessage title={t('cart.empty')} />
        )}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            dispatch(clearCart());
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};
