import { Categories } from '../components/Categories';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { HotPrices } from '../components/HotPrices';
import { NewModels } from '../components/NewModels';

export const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <NewModels />
      <Categories />
      <HotPrices />
      <Footer />
    </>
  );
};
