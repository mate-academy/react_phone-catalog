import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.scss';
import { Categories } from '../components/Categories/Categories';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';

export const HomePage = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="carousel"
      >
        <Carousel.Item>
          <img
            className="carousel__inner"
            src="_new/img/banner-phones.png"
            alt="banner"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel__inner"
            src="_new/img/banner-tablets.png"
            alt="banner"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel__inner"
            src="_new/img/banner-accessories.png"
            alt="banner"
          />
        </Carousel.Item>
      </Carousel>
      <div className="home__slider">
        <ProductSlider />
      </div>
      <div className="home__categories">
        <Categories />
      </div>
    </div>
  );
};
