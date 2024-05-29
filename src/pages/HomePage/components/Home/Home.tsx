import { PicturesSlider } from '../PicturesSlider';
import { ProductSlider } from '../ProductSlider';
import { Categories } from '../Categories';
import './Home.scss';
import '../../../../styles/main.scss';

export const Home: React.FC = () => {
  return (
    <main className="main">
      <section className="main-section main__section">
        <div className="title-container main-section__title">
          <h1 className="title title--1 title-container__title">
            Welcome to Nice Gadgets store!
          </h1>
        </div>
        <div className="main-section__slider">
          <PicturesSlider />
        </div>
      </section>

      <section className="main__section section section--full-width">
        <ProductSlider hasNewestProducts={true} title="Brand new models" />
      </section>

      <section className="category-section main__section section">
        <h2 className="category-section__title">Shop by category</h2>

        <div className="category-section__content">
          <Categories />
        </div>
      </section>

      <section className="main__section section section--full-width">
        <ProductSlider title="Hot prices" hasDiscount={true} />
      </section>
    </main>
  );
};
