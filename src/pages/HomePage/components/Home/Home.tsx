import { PicturesSlider } from '../PicturesSlider';
import { ProductSlider } from '../ProductSlider';
import './Home.scss';
import '../../../../styles/main.scss';
import { Categories } from '../Categories';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <main className="main">
      <Link to="/cart">Cart</Link>
      <section className="section main__section">
        <div className="title-container">
          <h1 className="title title--1 title-container__title">
            Welcome to Nice Gadgets store!
          </h1>
        </div>
        <div className="section__content">
          <PicturesSlider />
        </div>
      </section>

      <section className="main__section">
        <ProductSlider title="Brand new models" />
      </section>

      <section className="category-section main__section">
        <h2 className="category-section__title">Shop by category</h2>

        <div className="category-section__content">
          <Categories />
        </div>
      </section>

      <section className="main__section">
        <ProductSlider title="Hot prices" hasDiscount={true} />
      </section>
    </main>
  );
};
