import { useContext } from 'react';
import { Preview } from './components/Preview';
import { ProductColection } from '../../components/layout/ProductColection';
import { ProductsContext } from '../../store/ProductsProvider';
import styles from './HomePage.module.scss';
import { Category } from '../../components/layout/Category';

export const HomePage = () => {
  const products = useContext(ProductsContext);

  const getNewest = () => {
    if (!products.length) {
      return null;
    }

    const lastYear = products.reduce((max, item) =>
      item.year > max.year ? item : max,
    ).year;
    const newest = products.filter(item => item.year === lastYear);

    return newest;
  };

  const getHotPrices = () => {
    if (!products.length) {
      return null;
    }

    return products
      .slice()
      .sort((a, b) => {
        const discountMin = a.fullPrice ? a.fullPrice - a.price : 0;
        const discountMax = b.fullPrice ? b.fullPrice - b.price : 0;

        return discountMax - discountMin;
      })
      .slice(0, 24);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>
      <Preview />
      <div className={styles.content}>
        <ProductColection title="Brand new models" products={getNewest()} />
        <Category />
        <ProductColection title="Hot prices" products={getHotPrices()} />
      </div>
    </>
  );
};
