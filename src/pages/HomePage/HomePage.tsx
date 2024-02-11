import { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductsSlider';
import { Slider } from '../../components/Slider';
import './HomePage.scss';
import { Product } from '../../types/product';
import { getHotPriceProducts } from '../../api/productApi';
import { MyLoader } from '../../components/UI/MyLoader';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getHotPriceProducts()
      .then(setHotProducts)
      .catch(() => setErrorMessage('Something went wrong...'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="homepage">
      <h1 className="visually-hidden">Home Page</h1>

      <section className="homepage__slider">
        <Slider />
      </section>

      <section
        className="homepage__hot"
      >
        <h2 className="homepage__section-title">Hot prices</h2>
        {loading
          ? <MyLoader />
          : (
            <>
              {errorMessage
                ? <h3>{errorMessage}</h3>
                : <ProductSlider hotProducts={hotProducts} />}
            </>
          )}
      </section>

    </div>
  );
};
