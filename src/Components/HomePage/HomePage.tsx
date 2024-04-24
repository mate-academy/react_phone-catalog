import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <header className="home__header">
        <div className="home__header__top">
          <a href="#">
            <img src="/icons/nice_gadgets_logo.png" alt="Nice Gadgets Logo" />
          </a>

          <a href="#" className="home__header__top--icon--menu"></a>
        </div>

        <div className="home__header__bottom">
          <h1 className="home__header__bottom--title">
            Welcome to Nice Gadgets store!
          </h1>
          <a href="#">
            <img
              src="/homePage_banner.jpg"
              className="home__header__bottom--banner"
              alt="Home Page Banner"
            />
          </a>
          <img
            className="home__header__bottom--slider"
            src="/icons/dots_home-page_left.svg"
            alt="Slider"
          />
        </div>
      </header>

      <main>
        <section className="home__new__models">
          <h2 className="home__new__models--title">Brand new models</h2>
          <ul className="home__new__models--slider">
            <li className="home__new__models--slider--layout">
              <img src="/icons/slider_gray.svg" alt="Slider to the left" />
            </li>
            <li className="home__new__models--slider--layout">
              <img src="/icons/slider_black.svg" alt="Slider to the right" />
            </li>
          </ul>
        </section>
        <ProductCard />
      </main>
    </div>
  );
};

export default HomePage;
