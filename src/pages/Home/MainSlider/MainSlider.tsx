import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import './MainSlider.scss';

import { Buttons } from '../../../types/Buttons';
import MainSliderButton from '../MainSliderButton.txs/MainSliderButton';
import { images } from './constants';

const settings = {
  dots: true,
  dotsClass: 'main-slider-dots',
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <MainSliderButton type={Buttons.next} />,
  prevArrow: <MainSliderButton type={Buttons.prev} />,
  customPaging: () => (
    <button type="button" aria-label="paging" />
  ),
};

const MainSlider = () => (
  <section className="page__section main-slider">
    <div className="container">
      <Slider {...settings}>
        {images.map((img) => (
          <img
            key={img}
            className="main-slider__img"
            src={img}
            alt="banner"
          />
        ))}
      </Slider>
    </div>
  </section>
);

export default MainSlider;
