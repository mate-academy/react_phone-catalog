import { useContext } from 'react';
import { Preview } from '../../components/layout/Preview';
import { ProductColection } from '../../components/layout/ProductColection';
import { PageTitle } from '../../components/ui/PageTitle';
import { ProductsContext } from '../../store/ProductsProvider';
import styles from './HomePage.module.scss';

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

  // const getHotPrices = products?.slice().sort((a, b) => {
  //   const discountMin = a.fullPrice ? a.fullPrice - a.price : 0;
  //   const discountMax = b.fullPrice ? b.fullPrice - b.price : 0;

  //   return discountMax - discountMin;
  // });

  return (
    <>
      <div className={styles.container}>
        <PageTitle>Welcome to Nice Gadgets store!</PageTitle>
      </div>
      <Preview />
      <div className={styles.content}>
        <ProductColection title="Brand new models" products={getNewest()} />
        <ProductColection title="Hot prices" products={getHotPrices()} />
      </div>
    </>
  );
};
