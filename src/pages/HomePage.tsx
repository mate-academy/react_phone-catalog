import { HotPrice } from '../components/HotPrice';
import { PictureSlider } from '../components/PictureSlider';
import { BrandNew } from '../components/BrandNew';
import { ShopByCategory } from '../components/ShopByCategory';
import '../styles/blocks/home-page.scss';

export const HomePage = () => {
  return (
    <div className="container">
      <div className="home-page App__home-page">
        <PictureSlider />
        <HotPrice />
        <BrandNew />
        <ShopByCategory />
      </div>
    </div>
  );
};
