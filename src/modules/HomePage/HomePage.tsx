import { useEffect, useState } from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import './HomePage.scss';
import { getProducts } from '../../api/functionsRequestsApi';
import { Product } from '../../types/Product';
import { Categories } from './components/Categories';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useLanguage } from '../../context/LanguageContext';

export const HomePage = () => {
  const [newPhones, setNewPhones] = useState<Product[]>([]);
  const [hotPricePhones, setHotPricePhones] = useState<Product[]>([]);
  const { texts } = useLanguage();

  useEffect(() => {
    getProducts()
      .then(phones => {
        setNewPhones(
          phones
            .sort((firstItem, secondItem) => secondItem.year - firstItem.year)
            .slice(0, 10),
        );
        setHotPricePhones(
          phones
            .sort(
              (firstItem, secondItem) =>
                secondItem.fullPrice - firstItem.fullPrice,
            )
            .slice(0, 10),
        );
      })
      .catch(error => error)
      .finally(() => {});
  }, []);

  return (
    <div className="home-page">
      <div className="container container--home">
        <section className="hero section section--hero">
          <h1 className="hero__title">{texts.welcomeToNiceGadgetsStore}</h1>
          <PicturesSlider className="hero__pictures-slider" />
        </section>
        <section className="section section--products-slider">
          <ProductsSlider
            title={texts.brandNewModels}
            className="home-page__products-slider"
            items={newPhones}
            showDiscount={false}
          />
        </section>
        <section className="section section--categories">
          <Categories className="home-page__categories" />
        </section>
        <section className="section section--products-slider">
          <ProductsSlider
            title={texts.hotPrices}
            items={hotPricePhones}
            showDiscount={true}
            className="home-page__products-slider"
          />
        </section>
      </div>
    </div>
  );
};
