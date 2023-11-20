import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import banner from '../images/Banner.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HotPriceSlider } from '../components/HotPriceSlider/HotPriceSlider';
import './HomePage.scss';
import { Categories } from '../components/Categories/Categories';

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
          <img className="carousel__inner" src={banner} alt="banner" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel__inner" src={banner} alt="banner" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel__inner" src={banner} alt="banner" />
        </Carousel.Item>
      </Carousel>
      <div className="home__slider">
        <HotPriceSlider />
      </div>
      <div className="home__categories">
        <Categories />
      </div>
    </div>
  );
};
