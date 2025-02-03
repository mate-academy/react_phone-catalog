import { useState } from 'react';
import styles from './CartSummary.module.scss';
import { Checkout } from '../../../../components/Checkout';
import { useProductsContext } from '../../../../hooks/savedProducts';
import { useProducts } from '../../../../hooks/useProducts';
import { ModalWindow } from '../../../../components/ModalWindow';

export const CartSummary = () => {
  const { cartProducts, countProductsMap } = useProductsContext();
  const { products } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const totalPrice = cartProducts.reduce((total, productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return total;
    const count = countProductsMap[productId] || 1;
    return total + product.price * count;
  }, 0);

  const totalCount = cartProducts.reduce((total, productId) => {
    const count = countProductsMap[productId] || 1;
    return total + count;
  }, 0);

  return (
    <div className={styles.summary}>
      <div className={styles.summary__wrapper}>
        <div className={styles.summary__sum}>
          <div className={styles.summary__price}>{totalPrice}</div>
          <div className={styles.summary__count}>
            Total for {totalCount} items
          </div>
        </div>

        <div className={styles.summary__btnWrapper}>
          <div className={styles.summary__divider}></div>
          <Checkout onClick={openModal}>Checkout</Checkout>
        </div>
      </div>

      {isModalOpen && <ModalWindow setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};
