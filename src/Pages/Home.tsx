import { NewModels } from '../Components/NewModels';
import { HotPrices } from '../Components/HotPrices';
import { Categories } from '../Components/Categories';
import { Slider } from '../Components/Slider';

export const HomePage = () => {
  return (
    <div className="container">

      <Slider />

      <HotPrices />

      <Categories />

      <NewModels />

    </div>
  );
};
