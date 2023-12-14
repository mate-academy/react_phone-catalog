import { useEffect, useState } from 'react';
import { Slider } from '../components/Slider/Slider';
import { Product } from '../types/Product';

import '../styles/HomePage.scss';
import { Loader } from '../components/Loader';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { ShopCategory } from '../components/ShopCategory/ShopCategory';
import { getProducts } from '../services/getProducts';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(visibleProducts => {
        const hotModel = [...visibleProducts]
          .sort((a, b) => ((b.fullPrice - b.price) - (a.fullPrice - a.price)));

        const newModel = [...visibleProducts]
          .sort((a, b) => b.price - a.price);

        setHotProducts(hotModel);
        setNewProducts(newModel);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const count = hotProducts.length;

  return (
    <>
      <div className="home-page">
        <section className="home-page__section">
          <Slider />
        </section>

        <section className="home-page__section">
          {!error && !loading && (
            <ProductsSlider product={hotProducts} title="Hot prices" />
          )}

          {loading && (
            <Loader />
          )}
        </section>

        <section className="home-page__section">
          <ShopCategory count={count} />
        </section>

        <section className="home-page__section">
          {!error && !loading && (
            <ProductsSlider product={newProducts} title="Brand new models" />
          )}

          {loading && (
            <Loader />
          )}
        </section>
      </div>
    </>
  );
};
