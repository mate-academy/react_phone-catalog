import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
/* eslint max-len: off */
import { AddAndFavoritesContext } from '../../components/context/AddAndFavoritesContext';
import { useProductFilters } from '../../components/hooks/useProductFilters';
import { AllProductsType } from '../../types/AllProductsType';

import styles from './CartPage.module.scss';
import ArrowLeft from '../../../public/img/Icons/arrow-left-Icon.svg';
import Close from '../../../public/img/Icons/close-icon.svg';
import Plus from '../../../public/img/Icons/plus-Icon.svg';
import Minus from '../../../public/img/Icons/minus-Icon.svg';
import cartIsEmpty from '../../../public/img/cart-is-empty.png';

export const CartPage = () => {
  const context = useContext(AddAndFavoritesContext);
  const { getLastSearch, getLastPath } = useProductFilters();
  const { cart, changeQuantity, clearCart } = context;

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<AllProductsType[]>([]);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => setAllProducts(data));
  }, []);

  useEffect(() => {
    const productsInCart = allProducts.filter(product =>
      cart.some(item => item.id === product.id),
    );

    setProducts(productsInCart);
  }, [cart, allProducts]);

  let cartTotalSum = 0;
  const itemInCart = cart.length;

  const getProductLink = (product: AllProductsType) => {
    return `/${product.category}/${product.itemId}`;
  };

  const handleCheckout = () => {
    clearCart();
    setOrderMessage('Ваше замовлення успішно відправлено');

    setTimeout(() => setOrderMessage(null), 5000);
  };

  const closeMessage = () => setOrderMessage(null);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.buttonBackBlock}>
        <Link to={`${getLastPath()}${getLastSearch()}`} className={styles.icon}>
          <img src={ArrowLeft} alt="arrow" />
        </Link>

        <Link
          to={`${getLastPath()}${getLastSearch()}`}
          className={styles.breadcrumbsLink}
        >
          <div className={styles.backText}>Back</div>
        </Link>
      </div>

      <div className={styles.pageTitle}>Cart</div>

      {itemInCart > 0 ? (
        <div className={styles.cartSection}>
          <div className={styles.cardBox}>
            {products.map(product => {
              const modelPhoto = product.image;
              const modelName = product.name;
              const price = product.price;
              const id = product.id;

              const cartItem = cart.find(item => item.id === product.id);
              const quantity = cartItem?.quantity ?? 1;
              const modelSum = price * quantity;

              cartTotalSum += modelSum;

              const productLink = getProductLink(product);

              return (
                <div className={styles.cartsCard} key={id}>
                  <div className={styles.infoRow}>
                    <div
                      className={styles.delete}
                      onClick={() => changeQuantity(id, 'delete')}
                    >
                      <img src={Close} alt="close" />
                    </div>

                    <Link
                      to={productLink}
                      className={`${styles.modelLink} ${styles.photo}`}
                    >
                      <img src={modelPhoto} alt="model photo" />
                    </Link>

                    <Link
                      to={productLink}
                      className={`${styles.modelLink} ${styles.modelName}`}
                    >
                      {modelName}
                    </Link>
                  </div>

                  <div className={styles.calcBox}>
                    <div
                      className={`${styles.minus} ${styles.calcButton}`}
                      onClick={() => changeQuantity(id, 'minus')}
                    >
                      <img src={Minus} alt="minus" />
                    </div>

                    <div className={styles.count}>{quantity}</div>

                    <div
                      className={`${styles.plus} ${styles.calcButton}`}
                      onClick={() => changeQuantity(id, 'plus')}
                    >
                      <img src={Plus} alt="plus" />
                    </div>
                  </div>

                  <h3 className={styles.price}>{modelSum}</h3>
                </div>
              );
            })}
          </div>

          <div className={styles.totalForItem}>
            <div className={styles.totalItemPrice}>${cartTotalSum}</div>
            <p className={styles.mainText}>Total for {totalQuantity} items</p>
            <button
              className={`${styles.checkout} ${styles.buttonText}`}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.imgBox}>
          {orderMessage && (
            <div className={styles.orderMessage} onClick={closeMessage}>
              {orderMessage}
              <span className={styles.closeMessage}>×</span>
            </div>
          )}

          <h4 className={styles.emptyText}>Cart is empty</h4>
          <img
            src={cartIsEmpty}
            alt="cart is empty"
            className={styles.cartIsEmpty}
          />
        </div>
      )}
    </div>
  );
};
