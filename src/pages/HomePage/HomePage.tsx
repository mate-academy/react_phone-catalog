import './HomePage.scss';
import { Categories } from '../../components/Categories/Categories';
import { Carousel } from '../../components/Carousel/Carousel';
import { BrandNew } from '../../components/BrandNew/BrandNew';
import { HotPrices } from '../../components/HotPrices/HotPrices';

export const HomePage = () => {
  return (
    <div>
      <div className="home__carousel">
        <Carousel />
      </div>
      <HotPrices />
      <div className="home__categories">
        <Categories />
      </div>
      <BrandNew />
    </div>
  );
};
