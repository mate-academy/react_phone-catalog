import Heading from '../../UI/Heading/Heading';
import BrandNewModels from '../shared/BrandNewModels/BrandNewModels';
import HotPrices from '../shared/HotPrices/HotPrices';
import s from './HomePage.module.css';
import { Categories } from './components/Categories/Categories';
import PicturesSlider from './components/PicturesSlider/PicturesSlider';

const HomePage = () => {
  return (
    <>
      <section className={s.banner}>
        <div className="container">
          <Heading as="h1" className={s.title}>
            Welcome to Nice Gadgets store!
          </Heading>
        </div>
        <PicturesSlider />
        <BrandNewModels />
        <Categories />
        <HotPrices />
      </section>
    </>
  );
};

export default HomePage;
