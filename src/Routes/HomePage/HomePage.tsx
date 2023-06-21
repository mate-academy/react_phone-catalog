import { useState, useEffect } from 'react';

import { Banner } from '../../components/Banner/Banner';
import { Navbar } from '../../components/Navbar/Navbar';
import { getHotPriceProducts } from '../../helpers/requests';
import { Product } from '../../types/product';
// eslint-disable-next-line max-len
import { ProductCardSlider } from '../../components/ProductCardSlider/ProductCardSlider';
import './HomePage.scss';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  // const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts().then(setHotProducts);
    // getBrandNewProducts().then(setNewProducts);
  }, []);

  return (
    <>
      <Navbar />

      <main className="home-page">
        <div className="home-page__banner">
          <Banner />
        </div>

        <section className="home-page__section">
          <ProductCardSlider title="Hot prices" products={hotProducts} />
        </section>
      </main>
    </>
  );
};
