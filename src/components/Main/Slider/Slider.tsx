import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.scss';

import image1 from './images/banner-phones.png';
import image2 from './images/banner-tablets.png';
import image3 from './images/banner-accessories.png';

const images = [{ src: image1 }, { src: image2 }, { src: image3 }];

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    centerMode: false,
  };

  return (
    <div className="slider__container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide__content">
            <img src={image.src} alt={`Slide ${index}`} className="slider__image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
