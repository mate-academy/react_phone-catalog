import { Product } from '../../../../types/product';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import styles from './HotPrices.module.scss';
import products from '../../../../../public/api/products.json';

export const HotPrices = () => {
  const getDiscountAmount = (product: Product): number => {
    return product.fullPrice - product.price;
  };

  const sortedByHotPrice = [...products]
    .filter(product => product.price < product.fullPrice)
    .sort((a, b) => getDiscountAmount(a) - getDiscountAmount(b));

  return (
    <section className={styles.hotprices}>
      <ProductsSlider products={sortedByHotPrice} title={'Hot prices'} />
    </section>
  );
};
