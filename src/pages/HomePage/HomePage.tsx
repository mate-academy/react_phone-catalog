import { ProductSlider } from '../../components/ProductSlider';
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

        <section className="home-page__models">
          <ProductSlider title="Brand new models" />
        </section>

        <section className="home-page__categories home-page__section">
          <h2 className="home-page__section-title">Shop by category</h2>

          <div className="home-page__categories-container">
            <div className="home-page__categories-category">
              <img
                className="home-page__categories-category-photo"
                src="/categories/phones.png"
                alt="Phones category photo"
              />
              <h4 className="home-page__categories-category-title">
                Mobile phones
              </h4>
              <p className="body-text home-page__categories-category-subtitle">
                95 models
              </p>
            </div>

            <div className="home-page__categories-category">
              <img
                className="home-page__categories-category-photo"
                src="/categories/tablets.png"
                alt="Phones category photo"
              />
              <h4 className="home-page__categories-category-title">Tablets</h4>
              <p className="body-text home-page__categories-category-subtitle">
                24 models
              </p>
            </div>

            <div className="home-page__categories-category">
              <img
                className="home-page__categories-category-photo"
                src="/categories/accessories.png"
                alt="Phones category photo"
              />
              <h4 className="home-page__categories-category-title">
                Accessories
              </h4>
              <p className="body-text home-page__categories-category-subtitle">
                100 models
              </p>
            </div>
          </div>
        </section>

        <section className="home-page__hot-prices">
          <ProductSlider title="Hot prices" />
        </section>
      </main>
    </div>
  );
};
