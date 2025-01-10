import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { HotPrices } from '../components/SliderProducts/HotPrices';
import { NewModels } from '../components/SliderProducts/NewModels';

export const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <NewModels />
      <Categories />
      <HotPrices />
    </>
  );
};
