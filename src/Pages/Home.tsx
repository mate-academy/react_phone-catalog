import { NewModels } from '../Components/NewModels';
import { HotPrices } from '../Components/HotPrices';
import { Categories } from '../Components/Categories';
import { Slider } from '../Components/Slider';
import { TestSwiper } from '../Components/TestSwiper';

export const HomePage = () => {
  return (
    <main>

      <Slider />

      <TestSwiper />

      <HotPrices />

      <Categories />

      <NewModels />

    </main>
  );
};
