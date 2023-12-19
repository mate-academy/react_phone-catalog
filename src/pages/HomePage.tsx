import { useContext } from 'react';
import { Slider } from '../components/Slider/Slider';

import '../styles/HomePage.scss';
import { Loader } from '../components/Loader';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { ShopCategory } from '../components/ShopCategory/ShopCategory';

import { StorContext } from '../context/StorContext';

export const HomePage = () => {
  const { product, loading, error } = useContext(StorContext);
  const count = product.length;

  const hotModel = [...product]
    .sort((a, b) => ((b.fullPrice - b.price) - (a.fullPrice - a.price)));

  const newModel = [...product]
    .sort((a, b) => b.price - a.price);

  return (
    <>
      <div className="home-page">
        <section className="home-page__section">
          <Slider />
        </section>

        <section className="home-page__section">
          {!error && !loading && (
            <ProductsSlider product={hotModel} title="Hot prices" />
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
            <ProductsSlider product={newModel} title="Brand new models" />
          )}

          {loading && (
            <Loader />
          )}
        </section>
      </div>
    </>
  );
};
