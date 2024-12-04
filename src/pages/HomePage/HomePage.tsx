import { ProductCard } from '../../components/ProductCard';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>

      <main className="home-page__container">
        <section className="home-page__banner">
          <div className="home-page__banner-container">
            <div className="button--arrow">
              <img src="/icons/arrow_left.svg" alt="Arrow left" />
            </div>

            <img src="/home_banner.png" alt="Banner" />

            <div className="button--arrow">
              <img src="/icons/arrow_right.svg" alt="Arrow right" />
            </div>
          </div>

          <div className="home-page__banner-pages">
            <div className="home-page__banner-page"></div>
            <div className="home-page__banner-page"></div>
            <div className="home-page__banner-page"></div>
          </div>
        </section>

        <section className="home-page__models home-page__section">
          <div className="home-page__section-top">
            <h2 className="home-page__section-title">Brand new models</h2>

            <div className="home-page__models-buttons">
              <div className="button--arrow button--arrow--disabled">
                <img src="/icons/arrow_left.svg" alt="Arrow left" />
              </div>
              <div className="button--arrow">
                <img src="/icons/arrow_right.svg" alt="Arrow right" />
              </div>
            </div>
          </div>

          <div className="home-page__models-container">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>
      </main>
    </div>
  );
};
