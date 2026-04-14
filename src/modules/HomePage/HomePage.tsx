import styles from './HomePage.module.scss';
import classNames from 'classnames';
import { Categories } from './components/Categories/Categories';
import productsData from '../../../public/api/products.json';
import { getHotPrices, getNewModels } from '../shared/utils/products';
import { BannerWrapper } from './components/BannerWrapper/BannerWrapper';
import { Product, RawProductFromApi } from '../shared/types/Product';
import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { useMemo } from 'react';

export const HomePage = () => {
  const normalizedProducts: Product[] = useMemo(() => {
    return (productsData as RawProductFromApi[]).map(product => ({
      ...product,
      id: product.itemId,
    }));
  }, []);

  const hotProducts = getHotPrices({ products: normalizedProducts });
  const NewModels = getNewModels(normalizedProducts as Product[]);

  return (
    <div className={styles.home}>
      <section className={classNames('container', styles.homeSection)}>
        <div className={styles.title}>Welcome to Nice Gadgets store!</div>
      </section>

      <h1 className={styles.hidden}>Product Catalog</h1>

      <section className={classNames('container', styles.homeSection)}>
        <BannerWrapper />
      </section>

      <section className={classNames('container', styles.homeSection)}>
        <ProductSlider title="Brand new models" products={NewModels} isDiscountHidden={true} />
      </section>

      <section className={classNames('container', styles.homeSection)}>
        <h2>Shop by category</h2>
        <Categories />
      </section>

      <section className={classNames('container', styles.homeSection)}>
        <ProductSlider title="Hot prices" products={hotProducts} isDiscountHidden={false} />
      </section>
    </div>
  );
};
