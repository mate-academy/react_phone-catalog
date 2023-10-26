import './HomePage.scss';
import { ImageSlider } from '../../components/ImageSlider';
import { ProductSlider } from '../../components/ProductSlider';
import { FullPriceProvider } from '../../storage/fullPriceContext';
import { Categories } from '../../components/Categories/Categories';

export const HomePage = () => {
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
        <FullPriceProvider full>
          <ProductSlider
            title="Brand new models"
          />
        </FullPriceProvider>
      </section>
    </div>
  );
};
