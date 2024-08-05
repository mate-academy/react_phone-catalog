import { Carousel } from '../../components/Carousel';
import { CategoryList } from '../../components/CategoryList';
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
          <CategoryList />
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
