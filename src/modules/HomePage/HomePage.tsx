import React from 'react';
import BannerSlider from '../BannerSlider';
import styles from './HomePage.module.scss';
import ProductsSlider from '../ProductsSlider';
import products from '../../../public/api/products.json';
import Categories from '../Categories';

export const HomePage: React.FC = () => {
  const discountedModels = [...products]
    .sort((p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price))
    .filter(p => p.year < 2021);
  const newModels = [...products]
    .sort((p1, p2) => p2.year - p1.year)
    .slice(0, 50);

  return (
    <>
      <section>
        <div className="container">
          <h1 className={`${styles.title}`}>Welcome to Nice Gadgets store!</h1>
        </div>
        <BannerSlider />
      </section>
      <section className="container">
        <ProductsSlider items={newModels} title="Brand new models" />
      </section>
      <section className="container">
        <Categories />
      </section>
      <section className="container">
        <ProductsSlider title="Hot prices" items={discountedModels} />
      </section>
    </>
  );
};

export default HomePage;
