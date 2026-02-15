import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import styles from './HomePage.module.scss';
import { useMemo } from 'react';
import { ShopByCategory } from './components/ShopByCategory';
import { useAppSelector } from '../../app/hooks';

export const HomePage = () => {
  // window.scrollTo(0, 0);

  const { items, loaded } = useAppSelector(state => state.products);

  const newModels = useMemo(() => {
    const yearOfNewestModels = Math.max(...items.map(product => product.year));

    return [...items].filter(product => product.year === yearOfNewestModels);
  }, [items]);

  const discountedModels = useMemo(() => {
    return [...items].sort((a, b) => {
      return b.fullPrice - b.price - (a.fullPrice - a.price);
    });
  }, [items]);

  return (
    <div className={styles.home_page}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={newModels}
        loading={!loaded}
      />

      <ShopByCategory />

      <ProductsSlider
        title="Hot prices"
        products={discountedModels}
        isDiscountVisible
        loading={!loaded}
      />
    </div>
  );
};
