import './HomePage.scss';
import { MainSlider } from '../MainSlider';
import { SliderCards } from '../SliderCards';
import { Product } from '../../../../constants/common';
import { Category } from '../Category';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../../../utils/fetchProducts';
import { withMinDelay } from '../../../../utils/delay';
import { Loader } from '../../../../components/Loader';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const category = 'phones';

  useEffect(() => {
    if (category) {
      setIsLoading(true);
      setHasError(false);

      withMinDelay(fetchProducts(category), 1000)
        .then(setProducts)
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="home-page__error">
        <p>Oops! Something went wrong 😢</p>
        <button
          className="reload-button"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-page__container">
        <section className="main-slider">
          <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
          <MainSlider />
        </section>

        <section className="new-models">
          <SliderCards
            products={products.filter(product => product.year >= 2022)}
            title="Brand new models"
            discountPrice={false}
          />
        </section>

        <section className="shop-by-category">
          <Category />
        </section>

        <section className="hot-prices">
          <SliderCards
            products={products}
            title="Hot prices"
            discountPrice={true}
          />
        </section>
      </div>
    </div>
  );
};
