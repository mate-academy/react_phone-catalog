import { HeroSlider } from '../../components/HeroSlider';
import { NewProductsSlider } from '../../components/NewProductsSlider';
import { Categories } from '../../components/Categories';
import { HotPricesSlider } from '../../components/HotPricesSlider';

export const HomePage = () => (
  <div className="container">
    <HeroSlider />
    <NewProductsSlider />
    <Categories />
    <HotPricesSlider />
  </div>
);
