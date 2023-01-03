import { Carousel } from '../../components/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider';
import { CategoryNav } from '../../components/CategoryNav';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home">
      <div className="container container--with-min-height">
        <section className="home__section">
          <Carousel />
        </section>
        <section className="home__section">
          <ProductsSlider
            title="Hot prices"
            filterCriteria="discount"
            sortBy="discount-value"
          />
        </section>
        <section className="home__section">
          <CategoryNav />
        </section>
        <section className="home__section">
          <ProductsSlider
            title="Brand new models"
            filterCriteria="no-discount"
            sortBy="age"
          />
        </section>
      </div>
    </div>
  );
};
