/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Carousel } from '../components/Carousel/Carousel';
import { images } from '../components/Carousel/images';
import { getProducts } from '../api';
import { Product } from '../types/Product';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error/Error';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory/ShopByCategory';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  async function loadProducts() {
    setIsLoading(true);
    try {
      setLoadingError(false);
      const response = await getProducts();

      setProducts(response);
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <section className="page__section Carousel">
        <Carousel
          infinite
          autoplay
          autoflow={5000}
          dots
        >
          {images.map((image) => {
            return (
              <img
                className="Carousel__img"
                key={image.id}
                src={image.url}
                alt={image.title}
              />
            );
          })}
        </Carousel>
      </section>

      {!isLoading && loadingError && (
        <Error />
      )}
      {isLoading && <Loader />}

      {!loadingError && !isLoading && (
        <section className="page__section ProductsSlider">
          <ProductsSlider
            products={products}
            filter="hotPrice"
            title="Hot prices"
          />
        </section>
      )}

      <section
        className="page__shopByCategory ShopByCategory"
        data-cy="categoryLinksContainer"
      >
        <ShopByCategory products={products} />
      </section>

      {!loadingError && !isLoading && (
        <section className="page__section ProductsSlider">
          <ProductsSlider
            products={products}
            filter="newModels"
            title="Brand new models"
          />
        </section>
      )}
    </>
  );
};
