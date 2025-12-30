import { FC } from 'react';
import styles from './Summary.module.scss';
import { Button } from '@/modules/shared/components/Button';
import classNames from 'classnames';
import { useModal } from '@/hooks/useModal';
import { CartModal } from '../CartModal';
import { useCart } from '@/hooks/useCart';

interface Props {
  totalPrice: number;
  totalItems: number;
  className?: string;
}

export const Summary: FC<Props> = ({ totalItems, totalPrice, className }) => {
  const { isOpen, closeModal, toggleModal } = useModal();
  const { clearCart } = useCart();

  return (
    <>
      <aside className={classNames(styles.wrapper, className)}>
        <div className={styles.topBar}>
          <h2 className={styles.price}>${totalPrice}</h2>
          <p className={styles.items}>Total for {totalItems} items</p>
        </div>
        <Button
          variant="primary"
          height="48px"
          width="100%"
          radius="8px"
          onClick={toggleModal}
        >
          Checkout
        </Button>
      </aside>

      <CartModal isOpen={isOpen} closeModal={closeModal} onSubmit={clearCart} />
    </>
  );
};
