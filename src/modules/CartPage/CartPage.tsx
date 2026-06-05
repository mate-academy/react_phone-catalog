import { useCart } from '@/app/providers/Cart';
import { useProducts } from '@/app/providers/Products';
import { ButtonBack } from '@/components/ButtonBack';
import { ProductCardInCart } from '@/components/ProductCardInCart';
import { Product, ProductInCart } from '@/shared/type';
import { useLayoutEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { ButtonBuy } from '@/components/ButtonBuy/ButtonBuy';
import { Skeleton } from '@/components/Skeleton';
import { useTranslation } from 'react-i18next';
import { ModalDialog } from './components/ModalDialog';

export const CartPage = () => {
  const { t } = useTranslation();
  const { cart } = useCart();
  const { products, loadProducts, loading, error } = useProducts();
  const [openModal, setOpenModal] = useState(false);

  useLayoutEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const productsCart = useMemo(() => {
    if (!products) {
      return null;
    }
    const productsCartList: { product: Product; cartProduct: ProductInCart }[] = [];

    cart.forEach((cartProduct) => {
      const findProduct = products.find((product) => cartProduct.id === product.itemId);

      if (findProduct) {
        productsCartList.push({ product: findProduct, cartProduct });
      }
    });

    return productsCartList;
  }, [cart, products]);

  const resultsPrice = useMemo(() => {
    if (!productsCart) {
      return 1223;
    }

    return productsCart.reduce((prev, current) => {
      return prev + current.product.price * current.cartProduct.count;
    }, 0);
  }, [productsCart]);

  const TotalItems = useMemo(() => {
    if (!productsCart) {
      return 1;
    }

    return productsCart.reduce((prev, current) => {
      return prev + current.cartProduct.count;
    }, 0);
  }, [productsCart]);

  return (
    <>
      <main>
        <div className={styles.topContainer}>
          <ButtonBack className={styles.buttonBack}></ButtonBack>
          <h1 className={styles.title}>{t('cart.cart')}</h1>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.cardsContainer}>
            {loading &&
              cart.map((_, index) => {
                return (
                  <ProductCardInCart
                    key={index}
                    product={null}
                    cartProduct={null}
                  ></ProductCardInCart>
                );
              })}
            {!loading &&
              !error &&
              productsCart &&
              productsCart.map((productCart) => {
                return (
                  <ProductCardInCart
                    key={productCart.product.itemId}
                    product={productCart.product}
                    cartProduct={productCart.cartProduct}
                  ></ProductCardInCart>
                );
              })}
          </div>
          <div className={styles.results}>
            <div className={styles.resultsPriceAndTotal}>
              <Skeleton className={styles.resultsPriceAndTotal} isLoading={!productsCart}>
                <h2 className={styles.resultsPrice}>{`$${resultsPrice}`}</h2>
                <p>{`${t('cart.total')} ${TotalItems || 0} ${TotalItems > 1 ? t('sectionCategories.items') : t('sectionCategories.item')}`}</p>
              </Skeleton>
            </div>
            <div className={styles.resultsLine}></div>
            <Skeleton isLoading={!productsCart}>
              <ButtonBuy
                onClick={() => setOpenModal(true)}
                className={styles.resultsButton}
                selected={false}
              >
                {t('cart.checkout')}
              </ButtonBuy>
            </Skeleton>
          </div>
        </div>
      </main>
      {<ModalDialog isOpen={openModal} isSetOpen={setOpenModal}></ModalDialog>}
    </>
  );
};
