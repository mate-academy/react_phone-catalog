import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../utils/api';
import { Product } from '../../types/Product';
import { CartCard } from './components/CartCard';
import { Loader } from '../shared/components/Loader/Loader';
import { Modal } from './components/Modal';

export const Cart = () => {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartIds, setCartIds } = useAppContext();

  useEffect(() => {
    setIsLoad(true);

    getProducts()
      .then(productsFromServer => setProducts(productsFromServer))
      .finally(() => setIsLoad(false));
  }, []);

  const cartItems = useMemo(() => {
    return products.filter(prod => cartIds.includes(prod.id));
  }, [products, cartIds]);

  const totalPrice = useMemo(() => {
    return cartIds.reduce<number>((acc, id) => {
      const product = products.find(prod => prod.id === id);

      return product ? acc + Number(product.price) : acc;
    }, 0);
  }, [cartIds, products]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setCartIds([]);
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Modal isModalOpen={isModalOpen} setIsModelOpen={setIsModalOpen}>
            <h4 className={styles.modalTitle}>
              Checkout is not implemented yet. Do you want to clear the cart?
            </h4>
            <div className={styles.modalButtons}>
              <button
                onClick={handleConfirm}
                className={`${styles.modalBtn} ${styles.confirm}`}
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                className={`${styles.modalBtn} ${styles.cancel}`}
              >
                Cancel
              </button>
            </div>
          </Modal>
          <div className={styles.header}>
            <div className={styles.backBtnContainer}>
              <img
                className={styles.arrow}
                src="/icons/chevron-arrow-left.svg"
                alt="arrow-left"
              />
              <button className={styles.backBtn} onClick={handleBack}>
                Back
              </button>
            </div>
            <h1 className={styles.title}>Cart</h1>
          </div>
          {cartIds.length > 0 ? (
            <div className={styles.cartBody}>
              <div className={styles.cartList}>
                {cartItems.map(cartItem => (
                  <CartCard key={cartItem.id} cartItem={cartItem} />
                ))}
              </div>
              {cartItems.length > 0 && (
                <div className={styles.totalContainer}>
                  <div className={styles.info}>
                    <h2 className={styles.price}>${totalPrice}</h2>
                    <span className={styles.counter}>
                      Total for {cartIds.length} items
                    </span>
                  </div>
                  <button onClick={handleOpenModal} className={styles.btn}>
                    Checkout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyMsg}>
              <p>Your cart is empty :/</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
