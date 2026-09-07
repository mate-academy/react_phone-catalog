import React, { useState } from 'react';
import { useCart } from '../../../../hooks/context/useCart';
import { ProductType } from '../../../../shared/types/ProductType';
import { PrimaryButton } from '../../../../shared/UI/Buttons/PrimaryButton';
import styles from './CartCheckout.module.scss';
import { useCartPrice } from '../../hooks/useCartPrice';
import { Modal } from '../../../shared/components/Modal';
import { CartForm } from '../CartForm';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  products: ProductType[];
}

export const CartCheckout: React.FC<Props> = ({ products }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { howManyItems, deleteAllProductFromBag } = useCart();
  const totalPrice = useCartPrice(products);
  const onSubmit = () => {
    deleteAllProductFromBag();
    setOpen(false);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.price}>{totalPrice}</h2>

        <p className={styles.item__count}>
          {t('cart_page.total_item', { count: howManyItems })}
        </p>
      </div>

      <hr className={styles.line} />

      <PrimaryButton onClick={() => setOpen(true)}>
        {t('cart_page.checkout_button')}
      </PrimaryButton>

      {open && (
        <Modal setOpen={setOpen}>
          <CartForm
            message={t('cart_page.form_message', { count: totalPrice })}
            onCancel={() => setOpen(false)}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </div>
  );
};
