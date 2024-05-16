import './HomePage.scss';
import { Banner } from '../../components/Banner/Banner';
import { CarouselProductCards } from '../../components/CarouselProductCards';
import { ShopByCategory } from '../../components/ShopByCategory';
import { useContext } from 'react';
import { getBiggestSaleProducts, getNewestYearProducts } from '../../utils';
import { StoreContext } from '../../context/StoreContext';

export const HomePage = () => {
  const { allProducts } = useContext(StoreContext);

  return (
    <div className="home-page">
      <div className="home-page__title text_h1">
        Welcome to Nice Gadgets store!
      </div>

      <Banner />

      <CarouselProductCards
        title={'Brand new models'}
        isDiscount={false}
        products={getNewestYearProducts(allProducts)}
      />

      <ShopByCategory products={allProducts} />

      <CarouselProductCards
        title={'Hot prices'}
        isDiscount
        products={getBiggestSaleProducts(allProducts)}
      />
    </div>
  );
};
