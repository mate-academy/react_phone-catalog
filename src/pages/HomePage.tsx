import { HotPrices } from '../componets/hotPrices/HotPrices';
import { NewModels } from '../componets/newModels/NewModels';
import { ShopByCategory } from '../componets/shopByCategory/ShopByCategory';
import { MainSlider } from '../componets/mainSlider/MainSlider';

export const HomePage = () => {
  return (
    <div className="page__container">
      <MainSlider />
      <HotPrices />
      <ShopByCategory />
      <NewModels />
    </div>
  );
};
