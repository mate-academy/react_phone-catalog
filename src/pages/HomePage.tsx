import React, { useMemo } from 'react';
import { BrandNew } from '../components/BrandNew';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HomePageSlider } from '../components/HomePageSlider';
import { HotPrices } from '../components/HotPrices';
import { ShopByCategory } from '../components/ShopByCategory';
import { Product } from '../types/Product';

type Props = {
  products: Product[];
  // addProductToCart: (product: Product) => void;
  // addProductToFavourites: (product: Product) => void;
};

export const HomePage: React.FC<Props> = ({
  products,
  // addProductToCart,
  // addProductToFavourites,
}) => {
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

        <HotPrices
          products={productsWithDiscont}
          // addProductToCart={addProductToCart}
          // addProductToFavourites={addProductToFavourites}
        />

        <ShopByCategory products={products} />

        <BrandNew
          products={productsWithoutDiscont}
          // addProductToCart={addProductToCart}
          // addProductToFavourites={addProductToFavourites}
        />
      </div>

      <Footer />
    </div>
  );
};
