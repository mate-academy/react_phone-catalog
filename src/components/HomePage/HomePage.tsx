import React, { useContext } from 'react';
import './HomeStyle.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import CardSlider from '../CardSlider/CardSlider';
import CategoryCard from './CategoryCard/CategoryCard';
import MainSwiper from './MainSwiper/MainSwiper';
import { PageType } from 'src/types/PageType';
import { StateContext } from 'src/store';

const HomePage = () => {
  const { brandNewModels, hotPrices } = useContext(StateContext);

  return (
    <div className="home">
      <div className="home__wrapper">
        <div className="home__title--wrapper container">
          <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
        </div>

        <div className="home-slider__main container">
          <MainSwiper />
        </div>
        <div className="home__slider-card">
          <CardSlider
            title={'Brand new models'}
            cards={brandNewModels.slice(0, 6)}
          />
        </div>
        <div className="home__categories--sections categories container">
          <h2 className="categories__title">Shop by category</h2>
          <div className="categories__wrapper">
            <CategoryCard
              title="Mobile phones"
              subTitle=""
              imgUrl="img/caregory-phones-main.png"
              UrlTo={PageType.Phones}
            />
            <CategoryCard
              title="Tablets"
              subTitle=""
              imgUrl="img/category-tablets-main.png"
              UrlTo={PageType.Tablets}
            />
            <CategoryCard
              title="Accessories"
              subTitle=""
              imgUrl="img/category-accessories-main.png"
              UrlTo={PageType.Accessories}
            />
          </div>
        </div>
        <div className="home__second-slider-card">
          <CardSlider title={'Hot prices'} cards={hotPrices.slice(7)} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
