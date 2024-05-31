import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './PicturesSlider.scss';

// Import css files for the carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const PicturesSlider = () => {
  const imageArray = [
    {
      image: './img/banner-accessories.png',
      path: '/accessories',
    },
    {
      image: './img/banner-iphone-15.png',
      path: '/phones',
    },
    {
      image: './img/banner-ipad.png',
      path: '/tablets',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="banner-container">
      <Slider {...sliderSettings}>
        {imageArray.map(bannerPair => (
          <div key={bannerPair.path} className="image-container">
            <Link to={bannerPair.path}>
              <img
                src={bannerPair.image}
                alt="image"
                className="banner-container__image"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};
