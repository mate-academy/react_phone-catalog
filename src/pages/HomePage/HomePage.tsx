import './HomePage.scss';

import { ProductsSlide } from '../../Components/ProductsSlide/ProductsSlide';
import { Category } from '../../Components/Category/Category';
import { HomePageSlider } from '../../Components/HomePageSlider/HomePageSlider';

export const HomePage = () => {
  return (
    <div className="homePage">
      <section className="homePageSlider homePage__section">
        <HomePageSlider />
      </section>

      <section className="hotPrices homePage__section">
        <ProductsSlide sectionType="hotPrices" />
      </section>

      <section
        className="shopByCategory homePage__section"
        data-cy="categoryLinksContainer"
      >
        <Category />
      </section>

      <section className="brandNew homePage__section">
        <ProductsSlide sectionType="brandNew" />
      </section>
    </div>
  );
};
