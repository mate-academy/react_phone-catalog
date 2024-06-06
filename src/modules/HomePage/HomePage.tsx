import Heading from '../../UI/Heading/Heading';
import BrandNewModels from '../BrandNewModels/BrandNewModels';
import HotPrices from '../HotPrices/HotPrices';
import PicturesSlider from './components/PicturesSlider/PicturesSlider';
import s from './HomePage.module.css';

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
        <div className="container">
          <div>Shop by category</div>
        </div>
        <HotPrices />
      </section>
    </>
  );
};

export default HomePage;
