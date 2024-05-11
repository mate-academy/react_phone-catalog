import './HomePage.scss';
import { Banner } from '../../components/Banner/Banner';
import { CarouselProductCards } from '../../components/CarouselProductCards';
import { ShopByCategory } from '../../components/ShopByCategory';
import { useEffect, useState } from 'react';
import { Product } from '../../types/products';
import { getProducts } from '../../utils/api';
import { getBiggestSaleProducts, getNewestYearProducts } from '../../utils';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__title text_h1">
        Welcome to Nice Gadgets store!
      </div>

      <Banner />

      <CarouselProductCards
        title={'Brand new models'}
        isDiscount={false}
        products={getNewestYearProducts(products)}
      />

      <ShopByCategory products={products} />

      <CarouselProductCards
        title={'Hot prices'}
        isDiscount
        products={getBiggestSaleProducts(products)}
      />
    </div>
  );
};
