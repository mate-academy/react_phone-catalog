import React, { useEffect, useState } from 'react';
import './HomePage.scss';

import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { CarouselSlider } from '../../components/CarouselSlider/CarouselSlider';
import { CategoryTabs } from '../../components/CategoryTabs/CategoryTabs';
import { Product } from '../../types/Product';
import { getProductsWithoutDeley } from '../../api/fetchClient';

export const HomePage: React.FC = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getProductsWithoutDeley()
      .then(productsFromServer => {
        const hot = [...productsFromServer]
          .sort((a, b) => ((b.fullPrice - b.price) - (a.fullPrice - a.price)));

        const newOnes = [...productsFromServer]
          .sort((a, b) => b.price - a.price);

        setHotProducts(hot);
        setNewProducts(newOnes);
      })
      .catch(() => setIsError(true));
  }, []);

  return (
    <>
      {isError && (
        <div className="error__message">Error</div>
      )}
      {!isError
        && (
          <>
            <section className="home__slider">
              <CarouselSlider />
            </section>
            <section className="home__hot">
              <ProductSlider name="Hot prices" data={hotProducts} />
            </section>
            <section className="home__categories">
              <CategoryTabs />
            </section>
            <section className="home__new">
              <ProductSlider name="Brand new models" data={newProducts} />
            </section>
          </>
        )}
    </>
  );
};
