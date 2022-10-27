/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Carousel } from '../components/Carousel/Carousel';
import { images } from '../components/Carousel/images';
import { getProducts } from '../helpers/api';
import { Product } from '../types/Product';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error/Error';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory/ShopByCategory';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const noError = !loadingError && !isLoading;

  async function loadProducts() {
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
    const abortController = new AbortController();

    loadProducts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {!isLoading && loadingError && (
        <div className="page__notification">
          <Error />
        </div>
      )}

      {isLoading && (
        <div className="page__notification">
          <Loader />
        </div>
      )}

      {noError && (
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
          <section className="page__section ProductsSlider">
            <ProductsSlider
              products={products}
              filter="hotPrice"
              title="Hot prices"
            />
          </section>
          <section className="page__section ProductsSlider">
            <ProductsSlider
              products={products}
              filter="hotPrice"
              title="Hot prices"
            />
          </section>
          <section
            className="page__shopByCategory ShopByCategory"
            data-cy="categoryLinksContainer"
          >
            <ShopByCategory products={products} />
          </section>
          <section className="page__section ProductsSlider">
            <ProductsSlider
              products={products}
              filter="newModels"
              title="Brand new models"
            />
          </section>
        </>
      )}
    </>
  );
};
