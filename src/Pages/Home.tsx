import { BrandNewModels } from '../Components/BrandNewModels';
import { HotPrices } from '../Components/HotPrices';
import { ShopByCategory } from '../Components/ShopByCategory';
import { Banner } from '../Components/Slider';

export const HomePage = () => {
  return (
    <div className="main">
      <div className="container">

        <Banner />

        <HotPrices />

        <ShopByCategory />

        <BrandNewModels />
      </div>
    </div>
  );
};
