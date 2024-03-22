// eslint-disable-next-line max-len
import { ProductsCategory } from '../../components/ProductsCategory/ProductsCategory';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Slider } from '../../components/Slider/Slider';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage__section">
        <Slider />
      </div>

      <div className="homepage__section">
        <h1 className="homepage__section-title">Hot prices</h1>
        <ProductsSlider />
      </div>

      <div className="homepage__section">
        <h1 className="homepage__section-title">Shop by category</h1>
        <ProductsCategory />
      </div>

      <div className="homepage__section">
        <h1 className="homepage__section-title">Brand new models</h1>
        <ProductsSlider />
      </div>
    </div>
  );
};
