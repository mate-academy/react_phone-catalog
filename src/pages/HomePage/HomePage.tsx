import { Categories } from '../../components/Categories';
import { ProductSlider } from '../../components/ProductsSlider';
import { ImageSlider } from '../../components/ImageSlider';

import './homepage.scss';

export const HomePage:React.FC = () => {
  return (
    <div className="home-page">
      <section className="home-page__section">
        <ImageSlider />
      </section>

      <section className="home-page__section">
        <ProductSlider
          title="Hot prices"
        />
      </section>

      <section className="home-page__section">
        <Categories />
      </section>

      <section className="home-page__section">
        <ProductSlider
          title="Brand new models"
        />
      </section>
    </div>
  );
};
