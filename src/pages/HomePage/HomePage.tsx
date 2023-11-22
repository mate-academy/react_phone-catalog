import './HomePage.scss';
import { Categories } from '../../components/Categories/Categories';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Carousel } from '../../components/Carousel/Carousel';
import { NewModels } from '../../components/NewModels/NewModels';

export const HomePage = () => {
  return (
    <div>
      <div className="home__carousel">
        <Carousel />
      </div>
      <div className="home__slider">
        <ProductSlider />
      </div>
      <div className="home__categories">
        <Categories />
      </div>
      <div className="home__new">
        <NewModels />
      </div>
    </div>
  );
};
