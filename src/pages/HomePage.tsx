import { Categories } from '../components/Categories';
import { Hero } from '../components/Hero';
import { HotPrices } from '../components/SliderProducts/HotPrices';
import { NewModels } from '../components/SliderProducts/NewModels';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <NewModels />
      <Categories />
      <HotPrices />
    </>
  );
};
