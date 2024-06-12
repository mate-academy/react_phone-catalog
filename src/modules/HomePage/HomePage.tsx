import BrandNewModels from './components/BrandNewModels/BrandNewModels';
import { Categories } from './components/Categories/Categories';
import Heading from '../../UI/Heading/Heading';
import HotPrices from './components/HotPrices/HotPrices';
import PicturesSlider from './components/PicturesSlider/PicturesSlider';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className="container">
        <Heading as="h1" className={s.title}>
          Welcome to Nice Gadgets store!
        </Heading>
      </div>

      <section className={s.picturesSlider}>
        <PicturesSlider />
      </section>

      <section>
        <BrandNewModels />
      </section>

      <section>
        <Categories />
      </section>

      <section>
        <HotPrices />
      </section>
    </>
  );
};

export default HomePage;
