// .. Home.jsx
import styles from './Home.module.scss';
import { Brand } from './components/Brand';
import { Hero } from './components/Hero';
import { HotPrices } from './components/HotPrices';
import { ShopByCategory } from './components/ShopByCategory';
import type { Product } from '../../types/Product';

interface HomeProps {
  newBrandProducts: Product[];
  hotProducts: Product[];
  products: Product[];
}

export const Home = ({
  newBrandProducts,
  hotProducts,
  products,
}: HomeProps) => {
  return (
    <section className={styles.HomePage}>
      <Hero />
      <Brand newBrandProducts={newBrandProducts} />
      <ShopByCategory products={products} />
      <HotPrices hotProducts={hotProducts} />
    </section>
  );
};
