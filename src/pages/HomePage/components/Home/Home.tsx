import { PicturesSlider } from '../PicturesSlider';
import { ProductSlider } from '../ProductSlider';
import './Home.scss';
import '../../../../styles/main.scss';
import { Categories } from '../Categories';

export const Home: React.FC = () => {
  return (
    <main className="main">
      <section className="section main__section">
        <div className="title-container">
          <h1 className="title title--1 section__title title-container__title">
            Welcome to Nice Gadgets store!
          </h1>
        </div>
        <div className="section__content">
          <PicturesSlider />
        </div>
      </section>

      <section className="main__section">
        <ProductSlider />
      </section>

      <section className="category-section main__section">
        <h2 className="category-section__title">Shop by category</h2>

        <div className="category-section__content">
          <Categories />
        </div>
      </section>
    </main>
  );
};
