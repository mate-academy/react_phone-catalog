import React, { useMemo } from 'react';
import './page.scss';
import { Product } from '../types/Product';

import { Header } from '../components/Header/Header';
import { HomePageSlider } from '../components/HomePageSlider/HomePageSlider';
import { HotPrices } from '../components/HotPrices/HotPrices';
import { ShopByCategory } from '../components/ShopByCategory/ShopByCategory';
import { BrandNew } from '../components/BrandNew/BrandNew';
import { Footer } from '../components/Footer/Footer';

type Props = {
  products: Product[];
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const productsWithDiscont = useMemo(() => {
    return products.filter(product => product.discount > 0);
  }, [products]);

  const productsWithoutDiscont = useMemo(() => {
    return products.filter(product => !product.discount);
  }, [products]);

  return (
    <div className="page">
      <Header />

      <div className="page__content">
        <HomePageSlider />

        <HotPrices products={productsWithDiscont} />

        <ShopByCategory products={products} />

        <BrandNew products={productsWithoutDiscont} />
      </div>

      <Footer />
    </div>
  );
};
