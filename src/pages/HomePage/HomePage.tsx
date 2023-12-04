import './HomePage.scss';
import { Carousel } from '../../components/Carousel/Carousel';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { BrandNewModels } from '../../components/BrandNewModels/BrandNewModels';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

export const Homepage = () => {
  return (
    <div className="Homepage">
      <Carousel>
        <div className="carousel_image-1" />
        <div className="carousel_image-2" />
        <div className="carousel_image-3" />
      </Carousel>

      <HotPrices />

      <ShopByCategory />

      <BrandNewModels />
    </div>
  );
};
