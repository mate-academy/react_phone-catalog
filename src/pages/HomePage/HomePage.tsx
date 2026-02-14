import './HomePage.scss';
import React, { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { Slider } from '../../components/Slider';
import { useAppDispatch, useAppSelector } from '../../customHooks/customHooks';
import { getProducts } from '../../utils/getProducts';
import { setProducts } from '../../expansions/products';
import { CategoryBlock } from '../../components/CategoryBlock';

export const HomePage: React.FC = () => {
  const { products } = useAppSelector(state => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(resolve => {
        dispatch(setProducts(resolve));
      })
      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const hotPricesProducts = products
    .filter(product => product.fullPrice - product.price > 80)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const newestProducts = products
    .filter(product => product.year >= 2021)
    .sort((a, b) => a.year - b.year);

  return (
    <div className="homePage" id="/">
      <div className="homePage__title">
        <h1 className="homePage__title_text">Welcome to Nice Gadgets store!</h1>
      </div>

      <Banner />

      <Slider
        products={newestProducts}
        title="Brand new models"
        isLoading={isLoading}
      />

      <CategoryBlock />

      <Slider
        products={hotPricesProducts}
        title="Hot prices"
        isLoading={isLoading}
      />
    </div>
  );
};
