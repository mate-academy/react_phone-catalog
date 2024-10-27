import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './WelcomeSlider.scss';

import image1 from './images/banner-phones.png';
import image2 from './images/banner-tablets.png';
import image3 from './images/banner-accessories.png';
import { CSSProperties, useEffect, useState } from 'react';

const images = [{ src: image1 }, { src: image2 }, { src: image3 }];

export default function SimpleSlider() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const getStyles = (index: number): CSSProperties => {
    if (windowWidth <= 680) {
      return {
        width: index === 2 ? '150%' : '100%',
      };
    } else if (windowWidth >= 680 && windowWidth < 800) {
      return {
        width: index === 2 ? '80%' : '100%',
      };
    } else if (windowWidth >= 800 && windowWidth < 880) {
      return {
        width: index === 1 ? '95%' : index === 2 ? '80%' : '100%',
      };
    } else if (windowWidth >= 880 && windowWidth < 1000) {
      return {
        width: index === 1 ? '60%' : index === 2 ? '70%' : '100%',
      };
    } else if (windowWidth >= 1000 && windowWidth < 1200) {
      return {
        width: index === 1 ? '70%' : index === 2 ? '60%' : '100%',
      };
    } else if (windowWidth >= 1200) {
      return {
        width: index === 1 ? '100%' : index === 2 ? '100%' : '100%',
      };
    }

    return {};
  };

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
              style={getStyles(index)}
              className="slider__image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
