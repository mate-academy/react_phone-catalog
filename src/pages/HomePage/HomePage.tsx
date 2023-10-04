import { Carousel } from '../../components/Carousel';
import { CategoryBanners } from '../../components/CategoryBanners';
import { ProductsSlider } from '../../components/ProductsSlider';

import './HomePage.scss';

export const HomePage = () => (
  <div className="HomePage">
    <div className="container">
      <div className="HomePage__content">
        <div className="HomePage__section">
          <Carousel />
        </div>
        <div className="HomePage__section">
          <ProductsSlider
            title="Hot prices"
            filter="discount"
            sortBy="discount"
          />
        </div>
        <div className="HomePage__section">
          <CategoryBanners />
        </div>
        <div className="HomePage__section">
          <ProductsSlider
            title="Brand new models"
            filter="no-discount"
            sortBy="age"
          />
        </div>
      </div>
    </div>
  </div>
);
