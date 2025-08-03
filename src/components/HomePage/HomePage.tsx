import './HomePage.scss';
import { SliderSwiper } from '../Swiper/Swiper';
import { Category } from '../Category';
import { ProductSlider } from '../ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '../../types/ProductTipes';
import { fetchProducts } from '../../utils/api';
import { GlassyOrbLoader } from '../Loader';
import { NameSlider } from '../../types/nameslider';

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
        {
          /* some interesting idea */
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message === 'No internet connection') {
            setError('No internet connection. Please, check your network.');
          } else {
            setError('Server is not responding. Please, try again later.');
          }
        } else {
          setError('An unexpected error occured.');
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
        <div className="error__container">
          <p className="error-message">
            Something went wrong...
            <br>Please, check your connection and try again later.</br>
          </p>
        </div>
      )}

      {!error && (
        <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
      )}

      {loading && (
        <div className="loader-container">
          <GlassyOrbLoader />
        </div>
      )}

      {!loading && !error && (
        <>
          <SliderSwiper />
          <div className="homepage__product">
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
