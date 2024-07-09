import React, { useEffect, useState } from 'react';

import './HomePage.scss';
import { ShopByCategory } from './ShopByCategory';
import { HeaderSlider } from '../Slider/HeaderSlider';
import { NewModelsSlider } from '../Slider/NewModelsSlider';
import { HotPricesSlider } from '../Slider/HotPricesSlider';
import { Product } from '../../types/product';
import { getProducts } from '../../api/api';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Home';
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="homePage">
        <header className="homePage__header">
          <div className="container">
            <h1 className="homePage__title">{t('Welcome to Store')}</h1>
            <div className="header__slider">
              <HeaderSlider />
            </div>
          </div>
        </header>
        <main className="main">
          <div className="container">
            <div className="main__content">
              <section className="homePage__newModels-block">
                <NewModelsSlider products={products} isLoading={isLoading} />
              </section>

              <section className="homePage__shop-by-category">
                <ShopByCategory />
              </section>

              <section className="homePage__hot-prices">
                <HotPricesSlider products={products} isLoading={isLoading} />
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
