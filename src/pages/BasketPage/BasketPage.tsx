import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CatalogHeader } from '../../components/catalogHeader';
import styles from './BasketPage.module.scss';
import { BackButton } from '../../components/backButton';
import { ModalWin } from './components/modalwin';
import { AppDispatch, RootState } from '../../app/store';
import {
  decrementQuantity,
  deleteProduct,
  incrementQuantity,
  setSelectedProducts,
} from '../../features/basket';
import { useAppSelector } from '../../app/hooks';

export const BasketPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProducts } = useAppSelector(
    (state: RootState) => state.basket,
  );

  const handlePlusCounter = (productId: string) => {
    dispatch(incrementQuantity(productId));
  };

  const handleMinusCounter = (productId: string) => {
    dispatch(decrementQuantity(productId));
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  const allSumOfProducts = () => {
    return selectedProducts.reduce((sum, item) => {
      if (item.quantity && item.priceDiscount) {
        sum += item.quantity * item.priceDiscount;
      }
      return sum;
    }, 0);
  };

  return (
    <section className={styles.basketpage}>
      <div className={styles.basketpage__content}>
        <div className={styles.basketpage__header}>
          <BackButton />
          <CatalogHeader
            products={selectedProducts}
            category={'Basket'}
            withoutDrop={true}
          />
        </div>
        <div className={styles.basketpage__items}>
          {selectedProducts.map(item => (
            <div key={item.id} className={styles.basketpage__item}>
              <div className={styles.basketpage__item_left}>
                <button onClick={() => handleDeleteProduct(item.id)}>
                  <img src="img/icons/close.svg" alt="" />
                </button>
                <div className={styles.basketpage__photo_wrapper}>
                  <img
                    className={styles.basketpage__photo}
                    src={item.images[0]}
                    alt="photoofproduct"
                  />
                </div>
                <p className={styles.basketpage__name}>{item.name}</p>
              </div>
              <div className={styles.basketpage__item_right}>
                <div className={styles.basketpage__counter}>
                  <button
                    className={styles.basketpage__sign}
                    onClick={() => handleMinusCounter(item.id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className={styles.basketpage__quantity}
                    value={item?.quantity ?? 1}
                    readOnly
                  />
                  <button
                    className={styles.basketpage__sign}
                    onClick={() => handlePlusCounter(item.id)}
                  >
                    +
                  </button>
                </div>
                <h3 className={styles.basketpage__price}>
                  ${item.priceDiscount}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {selectedProducts.length > 0 && (
          <div className={styles.basketpage__total}>
            <h3 className={styles.basketpage__price}>${allSumOfProducts()}</h3>
            <span className={styles.basketpage__divider}></span>
            <p className={styles.basketpage__info}>
              Total for {selectedProducts.length} items
            </p>
            <button
              className={styles.basketpage__button}
              onClick={() => setShowModal(true)}
            >
              <p className={styles.basketpage__button_text}>Checkout</p>
            </button>
          </div>
        )}
        {showModal && (
          <ModalWin
            setShowModal={setShowModal}
            setSelectedProducts={setSelectedProducts}
          />
        )}
        {selectedProducts.length === 0 && (
          <p className={styles.basketpage__errormsj}>
            Oops! Its still empty here
          </p>
        )}
      </div>
    </section>
  );
};
