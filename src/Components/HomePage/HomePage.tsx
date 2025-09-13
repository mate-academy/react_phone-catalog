import { Home } from '../Home/Home';
// import { HotPrices } from '../HotPrices/HotPrices';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { SliderProducts } from '../SliderProducts/SliderProducts';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="home__page">
      <Home />
      <SliderProducts title={'brand new models'} />
      <ShopByCategory />
      <SliderProducts title={'Hot prices'} />
    </div>
  );
};
