import { useMemo } from 'react';
import { fetchProducts } from '../../api';
import { Container } from '../../components/Container';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useRequest } from '../../hooks';
import { getHotPriceProducts, getNewestProducts } from '../../utils';
import { CategoryCards } from './components/CategoryCards';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const {
    data: products,
    isLoading,
    hasError,
    reload,
  } = useRequest(fetchProducts);

  const hotPriceProducts = useMemo(
    () => getHotPriceProducts(products ?? []),
    [products],
  );
  const newestProducts = useMemo(
    () => getNewestProducts(products ?? []),
    [products],
  );

  const renderProducts = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError || !products) {
      return <ErrorMessage onReload={reload} />;
    }

    return (
      <>
        <section className={styles['home-page__section']}>
          <ProductsSlider title="Brand new models" products={newestProducts} />
        </section>

        <section className={styles['home-page__section']}>
          <CategoryCards products={products} />
        </section>

        <section className={styles['home-page__section']}>
          <ProductsSlider title="Hot prices" products={hotPriceProducts} />
        </section>
      </>
    );
  };

  return (
    <Container>
      <h1 className={styles['home-page__title']}>Product Catalog</h1>

      <h2 className={styles['home-page__welcome']}>
        Welcome to Nice Gadgets store!
      </h2>

      <section className={styles['home-page__section']}>
        <PicturesSlider />
      </section>

      {renderProducts()}
    </Container>
  );
};
