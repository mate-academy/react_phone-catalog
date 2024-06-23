// BasketPage component
import { useContext, useState, useEffect } from 'react';
import { CatalogHeader } from '../../components/catalogHeader';
import styles from './BasketPage.module.scss';
import { AppContext } from '../../store/context';
import { ProductWithQuantity } from '../../types/ProductWithQuantity';
import { BackButton } from '../../components/backButton';
import { ModalWin } from './components/modalwin';

export const BasketPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { selectedProducts, setSelectedProducts } = useContext(AppContext);

  useEffect(() => {
    const selectedProductFromStorage = localStorage.getItem('selectedProducts');

    if (selectedProductFromStorage) {
      const parsedProducts: ProductWithQuantity[] = JSON.parse(
        selectedProductFromStorage,
      );

      if (JSON.stringify(parsedProducts) !== JSON.stringify(selectedProducts)) {
        setSelectedProducts(parsedProducts);
      }
    }
  }, [selectedProducts, setSelectedProducts]);

  const handlePlusCounter = (productId: string) => {
    const updatedSelectedProducts = selectedProducts.map(product => {
      if (product.id === productId) {
        const newQuantity = product.quantity ? product.quantity + 1 : 1;

        return { ...product, quantity: newQuantity };
      }

      return product;
    });

    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem(
      'selectedProducts',
      JSON.stringify(updatedSelectedProducts),
    );
  };

  const handleMinusCounter = (productId: string) => {
    const updatedSelectedProducts = selectedProducts.map(product => {
      if (product.id === productId) {
        const newQuantity = product.quantity ? product.quantity - 1 : 1;

        if (newQuantity < 1) {
          return product;
        }

        return { ...product, quantity: newQuantity };
      }

      return product;
    });

    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem(
      'selectedProducts',
      JSON.stringify(updatedSelectedProducts),
    );
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedSelectedProducts = selectedProducts.filter(
      product => product.id !== productId,
    );

    setSelectedProducts(updatedSelectedProducts);

    localStorage.setItem(
      'selectedProducts',
      JSON.stringify(updatedSelectedProducts),
    );
  };

  const allSumOfProducts = () => {
    let sum = 0;

    selectedProducts.forEach(item => {
      if (item.quantity && item.priceDiscount) {
        sum += item.quantity * item.priceDiscount;
      }
    });

    return sum;
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
                    value={item?.quantity || 1}
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
