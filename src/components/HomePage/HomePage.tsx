import { useEffect, useState } from 'react';
import './HomePage.module.scss';
import { Product } from '../../types/ProductTypes';
import { fetchProducts } from '../../utils/api';
import { Loader } from '../Loader';
import { ProductSlider } from '../ProductCard';
import { NameSlider } from '../../types/namesSlider';
import { Category } from '../Category';
import { SliderSwiper } from '../Swiper';

export const HomePage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();

        setPhones(
          data.filter((product: Product) => product.category === 'phones'),
        );
        setError(null);
      } catch (err: any) {
        if (err.message === 'No internet connection') {
          setError('No internet connection. Please, check your network.');
        } else {
          setError('Server in not responding. Please, try again later');
        }
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="main__homepage">
      {error && (
        <div className="error_container">
          <p className="error-message">
            Something went wrong... Please, check your connection and try later.
          </p>
        </div>
      )}

      {!error && (
        <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
      )}

      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      {!loading && !error && (
        <>
          <SliderSwiper />
          <div className="homepaage__product">
            <ProductSlider products={phones} title={NameSlider.Brand} />
          </div>
          <div className="homepage__category">
            <div className="category__wrapper">
              <h2 className="category__title">Shop by category</h2>
              <Category />
            </div>
          </div>
          <div className="homepage__hotproduct">
            <ProductSlider
              products={phones}
              AdditionalPrice={true}
              title={NameSlider.Hot}
            />
          </div>
        </>
      )}
    </main>
  );
};
