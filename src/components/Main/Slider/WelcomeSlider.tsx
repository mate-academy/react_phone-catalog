import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './WelcomeSlider.scss';

import image1 from './images/banner-phones.png';
import image2 from './images/banner-tablets.png';
import image3 from './images/banner-accessories.png';
import { useWindowWidth } from '../../../hooks/HooksSlider';
import getStyles from '../../../services/helpers/getStyles';

const images = [{ src: image1 }, { src: image2 }, { src: image3 }];

export default function SimpleSlider() {
  const windowWidth = useWindowWidth();

  const settings = {
    className: 'welcome-slider',
    dots: true,
    infinite: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider__container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide__content">
            <img
              src={image.src}
              alt={`Slide ${index}`}
              style={getStyles(index, windowWidth)}
              className="slider__image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
