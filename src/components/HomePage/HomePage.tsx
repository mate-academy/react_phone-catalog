import React, { useCallback, useEffect, useState } from 'react';
import { BannerSlider } from '../BannerSlider/BannerSlider';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../ProductSlider/ProductSlider';
import {
  getHotPriceProducts,
  getNewModelsProducts,
} from '../../utils/ServiceData';
import { ProductDetails } from '../../types/ProductDetails';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hotPriceProducts, setHotPriceProducts] = useState<ProductDetails[]>(
    [],
  );
  const [newModelsProducts, setNewModelsProducts] = useState<ProductDetails[]>(
    [],
  );

  const loadData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const hotPrice = await getHotPriceProducts();

      setHotPriceProducts(hotPrice);

      const newModels = await getNewModelsProducts();

      setNewModelsProducts(newModels);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage onRetry={loadData} />;
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Welcome to Nice Gadgets Store!</h1>

        <BannerSlider />

        <ProductsSlider products={newModelsProducts} title={'New models'} />

        <section className="categories">
          <h2 className="section__title">Shop by category</h2>

          <div className="categories__content">
            <article className="categories__category">
              <Link to="/phones">
                <img
                  src="./public/img/category-phones.png"
                  alt="phones-category"
                  className="categories__category__picture"
                />
              </Link>

              <Link to="/phones" className="categories__category__title">
                Mobile
              </Link>

              <p className="categories__category__description">95 Models</p>
            </article>

            <article className="categories__category">
              <Link to="/tablets">
                <img
                  src="./public/img/category-tablets.png"
                  alt="tablets-category"
                  className="categories__category__picture"
                />
              </Link>

              <Link to="/tablets" className="categories__category__title">
                Tablets
              </Link>

              <p className="categories__category__description">24 Models</p>
            </article>

            <article className="categories__category">
              <Link to="/accessories">
                <img
                  src="./public/img/category-accessories.png"
                  alt="accessories-category"
                  className="categories__category__picture"
                />
              </Link>

              <Link to="/accessories" className="categories__category__title">
                Accessories
              </Link>

              <p className="categories__category__description">100 Models</p>
            </article>
          </div>
        </section>

        <ProductsSlider products={hotPriceProducts} title={'Hot prices'} />
      </div>
    </>
  );
};
