import { Categories } from '../../components/Categories';
import { ProductSlider } from '../../components/ProductsSlider';
import { ImageSlider } from '../../components/ImgSlider';

import { FullPriceProvider } from '../../storage/fulllPriceContext';

import './homeppage.scss';

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
        <FullPriceProvider full>
          <ProductSlider
            title="Brand new models"
          />
        </FullPriceProvider>
      </section>
    </div>
  );
};
