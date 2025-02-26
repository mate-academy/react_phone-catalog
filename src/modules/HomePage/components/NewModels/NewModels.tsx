import styles from './NewModels.module.scss';
import products from '../../../../../public/api/products.json';
import { ProductSlider } from '../../../Shared/ProductsSlider';

export const NewModels = () => {
  const title = 'Brand new models';

  const filteredProducts = products
    .filter(product => product.year === 2022)
    .sort((a, b) => b.name.localeCompare(a.name));

  return (
    <section className={styles.newModels}>
      <ProductSlider products={filteredProducts} title={title} />
    </section>
  );
};
