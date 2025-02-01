import styles from './CartPage.module.scss';
import { BackBtn } from '../../components/BackBtn';
import { getPrevPath } from '../../utils/getPrevPath';
import { Link, useLocation } from 'react-router-dom';
import { ProductCart } from './components/ProductCart';
import { useContext, useState } from 'react';
import { CartContext } from '../../ContextProvider';
import { CartBtnType } from '../../types/CartBtnType';
import { Checkout } from './components/Checkout';
import { hasDiscount } from '../../utils/hasDiscount';
import { getTotalProductsInCart } from '../../utils/getTotalProductsInCart';
import { Modal } from './components/Modal';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const CartPage = () => {
  const { t } = useTranslation('common');

  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { state, pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevPath = getPrevPath(pathname);
  const { search, pathname: path } = state ?? { search: '', pathname: '' };
  const totalNumOfProducts = getTotalProductsInCart(cartProducts);

  const handleCart = (cartBtnType: CartBtnType, productId: string) => {
    const item = cartProducts.find(({ id }) => id === productId);

    if (!item) {
      return;
    }

    const { id, quantity, product } = item;
    const index = cartProducts.findIndex(
      ({ id: itemId }) => itemId === productId,
    );

    const filteredCart = cartProducts.filter(
      ({ id: itemId }) => itemId !== productId,
    );
    const changeQuantity = () => {
      return [
        ...filteredCart.slice(0, index),
        {
          id,
          quantity:
            cartBtnType === CartBtnType.add ? quantity + 1 : quantity - 1,
          product,
        },
        ...filteredCart.slice(index),
      ];
    };

    if (cartBtnType === CartBtnType.delete) {
      setCartProducts([...filteredCart]);

      return;
    }

    setCartProducts(changeQuantity());
  };

  const totalPrice = cartProducts.reduce((a, b) => {
    return (
      a +
      b.quantity *
        (hasDiscount(b.product.name)
          ? b.product.priceDiscount
          : b.product.priceRegular)
    );
  }, 0);

  return (
    <section className={styles.container}>
      <BackBtn path={path} prevPath={prevPath} search={search} />
      <h2 className={styles.productTitle}>{t('cart')}</h2>
      <div className={styles.contentContainer}>
        {!!cartProducts.length ? (
          <>
            {cartProducts.map(product => (
              <ProductCart
                cartProduct={product}
                handleCart={handleCart}
                key={product.id}
              />
            ))}
            <Checkout
              totalPrice={totalPrice}
              numOfProducts={totalNumOfProducts}
              handleModal={setIsModalOpen}
            />
          </>
        ) : (
          <>
            <p className={styles.titleEmpty}>{t('noResult.noCart')}</p>
            <Link to={'/'} className={classNames('ctaBtn', styles.ctaBtn)}>
              {t('buttons.findDevice')}
            </Link>
            <div
              className={styles.emptyFavImg}
              aria-label={t('accessibility.emptyCart')}
            ></div>
          </>
        )}
      </div>
      {isModalOpen && <Modal handleModal={setIsModalOpen} />}
    </section>
  );
};
