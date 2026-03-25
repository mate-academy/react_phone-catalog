import { Preview } from './components/Preview';
import { ProductColection } from '../../components/layout/ProductColection';
import styles from './HomePage.module.scss';
import { Category } from '../../components/layout/Category';
import { useProducts } from '../../hooks/useProducts';

export const HomePage = () => {
  const { products, isLoading } = useProducts();

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
      .slice(0, 12);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>
      <Preview />
      <div className={styles.content}>
        <ProductColection
          title="Brand new models"
          products={getNewest()}
          loading={isLoading}
        />
        <Category />
        <ProductColection
          title="Hot prices"
          products={getHotPrices()}
          loading={isLoading}
        />
      </div>
    </>
  );
};
