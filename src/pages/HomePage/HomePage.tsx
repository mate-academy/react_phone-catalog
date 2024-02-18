import { PicturesSlider } from '../../components/PicturesSlider';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1 hidden>Product Catalog</h1>
      <section className="home-page__about-section">
        <div className="container">
          <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
        </div>
        <PicturesSlider />
      </section>
    </div>
  );
};
