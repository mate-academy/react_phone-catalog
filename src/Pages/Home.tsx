import { NewModels } from '../Components/NewModels';
import { HotPrices } from '../Components/HotPrices';
import { Categories } from '../Components/Categories';
import { Slider } from '../Components/Slider';
import { Footer } from '../Components/Footer';

export const HomePage = () => {
  return (
    <>
      <div className="container">

        <Slider />

        <HotPrices />

        <Categories />

        <NewModels />

        <Footer />
      </div>
    </>
  );
};
