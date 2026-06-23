import React, { useCallback, useEffect, useState } from 'react';
import { BannerSlider } from '../BannerSlider/BannerSlider';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import {
  getHotPriceProducts,
  getNewModelsProducts,
} from '../../utils/serviceData';
import { ProductDetails } from '../../types/ProductDetails';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

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
        <h1 className="title">{t('welcome')}</h1>

        <BannerSlider />

        <ProductsSlider products={newModelsProducts} title={t('new-models')} />

        <section className="categories">
          <h2 className="section__title">{t('shop-by-category')}</h2>

          <div className="categories__content">
            <article className="categories__category">
              <Link to="/phones">
                {' '}
                <img
                  src="./img/category-phones.png"
                  alt="phones-category"
                  className="categories__category__picture"
                />
              </Link>

              <Link to="/phones" className="categories__category__title">
                {t('mobile')}
              </Link>

              <p className="categories__category__description">
                95 {t('models')}
              </p>
            </article>

            <article className="categories__category">
              <Link to="/tablets">
                {' '}
                <img
                  src="./img/category-tablets.png"
                  alt="tablets-category"
                  className="categories__category__picture"
                />
              </Link>

              <Link to="/tablets" className="categories__category__title">
                {t('tablets')}
              </Link>

              <p className="categories__category__description">
                24 {t('models')}
              </p>
            </article>

            <article className="categories__category">
              <Link to="/accessories">
                {' '}
                <img
                  src="./img/category-accessories.png"
                  alt="accessories-category"
                  className="categories__category__picture"
                />
              </Link>

              <Link to="/accessories" className="categories__category__title">
                {t('accessories')}
              </Link>

              <p className="categories__category__description">
                100 {t('models')}
              </p>
            </article>
          </div>
        </section>

        <ProductsSlider products={hotPriceProducts} title={t('hot-prices')} />
      </div>
    </>
  );
};
