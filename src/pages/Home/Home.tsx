/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';
import { SortFilter } from '../../types/SortFilter';

import { skeletonProduct } from '../../utils/Skeletons/skeletonProduct';
import { getSelectedProducts } from '../../utils/getSelectedProducts';

import { ProductCarouselSection } from '../../components/ProductCarouselSection';
import { ProductCategorySection } from '../../components/ProductCategorySection';
import { BannerCarouselSection } from '../../components/BannerCarouselSection';

import styles from './Home.module.scss';

export const Home = () => {
  const skeletons: Product[] = Array.from({ length: 5 }, () => skeletonProduct);

  const [newModels, setNewModels] = useState<Product[]>(skeletons);
  const [hotPrices, setHotPrices] = useState<Product[]>(skeletons);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

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
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="section home-page">
      <h1 className={styles['home-page__title-visualy-hidden']}>
        Product Catalog
      </h1>

      <div className="container">
        <div className="section-title-wrapper">
          <h1>Welcome to Silverino!</h1>
        </div>
      </div>
      <BannerCarouselSection />
      <ProductCarouselSection
        products={newModels}
        isLoading={isLoading}
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
