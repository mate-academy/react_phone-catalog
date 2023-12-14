import { BrandNew } from '../BrandNew/BrandNew';
import { Carousel } from '../Carousel/Carousel';
import { HotPrice } from '../HotPrice/HotPrice';
import { ShopCategory } from '../ShopCategory/ShopCategory';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home">
      <Carousel />
      <HotPrice />
      <ShopCategory />
      <BrandNew />
    </div>
  );
};
