import styles from './HomePage.module.scss';
import FrontSlider from './components/FrontSlider';
import ProductsSlider from '../shared/components/ProductsSlider';
import Category from './components/Category';
import { categories } from './utils/data';

import Loader from '../shared/components/Loader';
import { useProducts } from '../shared/context/productsContext';
import { useEffect } from 'react';

const HomePage = () => {
  const { products, isLoading, isError } = useProducts();

  const hotPriceProducts = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => {
      const discontA = a.fullPrice - a.price;
      const discontB = b.fullPrice - b.price;

      return discontB - discontA;
    })
    .slice(0, 30);

  const newBrandProducts = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => b.year - a.year)
    .slice(0, 30);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.main}>
      <h1 style={{ visibility: 'hidden', position: 'absolute', zIndex: -1 }}>
        Product Catalog
      </h1>
      <h2 className={styles.title}>
        Welcome to Nice <br /> Gadgets store!
      </h2>
      <FrontSlider />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={styles.errorMessage}>Something went wrong!</div>
      ) : (
        <ProductsSlider
          title="Brand new models"
          products={newBrandProducts}
          isHideFullPrice={true}
        />
      )}
      <section className={styles.categories}>
        <h2 className={styles.categories__title}>Shop by category</h2>
        {categories.map(category => (
          <Category key={category.id} category={category} />
        ))}
      </section>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={styles.errorMessage}>Something went wrong!</div>
      ) : (
        <ProductsSlider title="Hot price" products={hotPriceProducts} />
      )}
    </div>
  );
};

export default HomePage;
