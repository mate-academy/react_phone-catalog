/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';
import { SortFilter } from '../../types/SortFilter';

import { getSelectedProducts } from '../../utils/getSelectedProducts';

import { ProductCarouselSection } from '../../components/ProductCarouselSection';
import { ProductCategorySection } from '../../components/ProductCategorySection';
import { BannerCarouselSection } from '../../components/BannerCarouselSection';

// import styles from './Home.module.scss';

export const Home = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(products => {
        setNewModels(
          getSelectedProducts(products, {
            amount: 12,
            category: Category.Phone,
            productFilter: SortFilter.Newest,
          }),
        );

        setHotPrices(
          getSelectedProducts(products, {
            amount: 8,
            productFilter: SortFilter.PriceAscending,
          }),
        );
      })
      .catch();
  }, []);

  return (
    <section className="section home-page">
      <div className="container">
        <div className="section-title-wrapper">
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>
      </div>
      <BannerCarouselSection />
      <ProductCarouselSection
        products={newModels}
        sectionTitle={'Brand new models'}
      />
      <ProductCategorySection />
      <ProductCarouselSection
        products={hotPrices}
        sectionTitle={'Hot prices'}
      />
    </section>
  );
};
