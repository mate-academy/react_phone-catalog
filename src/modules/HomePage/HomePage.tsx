import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import './HomePage.scss';
import { PicturesSlider } from './components/PicturesSlider';

export const HomePage: React.FC = () => {
  return (
    <div className="homePage">
      <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />

      {/* <ProductsSlider title={'Brand new models'} /> */}
    </div>
  );
};
