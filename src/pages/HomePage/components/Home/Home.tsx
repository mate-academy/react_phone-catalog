import { PicturesSlider } from '../PicturesSlider';
import { ProductSlider } from '../ProductSlider';
import './Home.scss';
import '../../../../styles/main.scss';

export const Home: React.FC = () => {
  return (
    <main className="main">
      <section className="section">
        <div className="title-container">
          <h1 className="title title--1 section__title title-container__title">
            Welcome to Nice Gadgets store!
          </h1>
        </div>
        <div className="section__picture-slider">
          <PicturesSlider />
        </div>
        {/* <img src="./img/new-phone.png" /> */}
        <div className="section__product-slider">
          <ProductSlider />
        </div>
      </section>
    </main>
  );
};
