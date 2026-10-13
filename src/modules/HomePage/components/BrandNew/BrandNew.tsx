import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import styles from './BrandNew.module.scss';
import products from '../../../../../public/api/products.json';

export const BrandNew = () => {
  const newest = Math.max(...products.map(product => product.year));

  const brandNewModels = [...products].filter(
    product => product.year === newest,
  );

  const preparedModels = brandNewModels.map(model => {
    return {
      ...model,
      price: model.fullPrice,
    };
  });

  return (
    <section className={styles.brandnew}>
      <ProductsSlider products={preparedModels} title={'Brand new models'} />
    </section>
  );
};
