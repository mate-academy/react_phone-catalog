import { Banner } from '../../components/banner/banner';
import { ShopByCategory } from '../../components/shopByCategory/shopByCategory';
import productsFromApi from '../../api/products.json';
import { Slider } from '../../components/slider/slider';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Home = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname])

  const hotPrices = productsFromApi
    .filter(product => product.category === 'phones')
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 8);
  const brandNew = productsFromApi
    .filter(product => product.category === 'phones')
    .sort((a, b) => b.fullPrice - a.fullPrice)
    .slice(0, 8);

  return (
    <main className="home">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      <div className="home__components">
        <Banner />
        <Slider
          products={brandNew}
          showOldPrice={false}
          title={'Brand new models'}
        />
        <ShopByCategory />
        <Slider products={hotPrices} showOldPrice={true} title={'Hot prices'} />
      </div>
    </main>
  );
};
