import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import styles from './BrandNew.module.scss';
import products from '../../../../../public/api/products.json';

export const BrandNew = () => {
  const newest = Math.max(...products.map(product => product.year));

  const brandNewModels = [...products].filter(
    product => product.year === newest,
  );

  return (
    <section className={styles.brandnew}>
      <ProductsSlider products={brandNewModels} title={'Brand new models'} />
    </section>
  );
};
