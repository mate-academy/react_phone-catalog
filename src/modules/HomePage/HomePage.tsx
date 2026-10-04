import { Welcome } from './components/Welcome';

import styles from './HomePage.module.scss';
import { Product } from '@/shared/types/Product';
import productsData from '@/shared/api/products.json';
import { NewAvailable } from './components/NewAvailable';
import { BrandNew } from './components/BrandNew/BrandNew';
import { Categories } from './components/ShopByCategory';
import { HotPrices } from './components/HotPrices/HotPrices';

export const HomePage = () => {
  const products = productsData as Product[];

  const newAvailable = [...products].sort((a, b) => b.year - a.year);

  const hotPrices = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  const newest = [...products].sort((a, b) => b.year - a.year);

  return (
    <>
      <h1 className={styles.hidden}>Product Catalog</h1>
      <Welcome />
      <NewAvailable products={newAvailable.slice(0, 10)} />
      <BrandNew products={newest} showRegularPriceOnly={true} />
      <Categories />
      <HotPrices products={hotPrices} />
    </>
  );
};
