import { HotPrices } from './components/HotPrices';
import { NewModels } from './components/NewModels';
import { ShopCategory } from './components/ShopCategory';
import { Slider } from './components/Slider';

export const HomePage = () => {
  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <Slider />
      <NewModels />
      <ShopCategory />
      <HotPrices />
    </>
  );
};
