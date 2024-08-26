import Slider from 'react-slick';
import './MainSlider.scss';
// import { PrevArrow } from '../Arrows/PrevArrow';
// import { NextArrow } from '../Arrows/NextArrow';

const bannerPhotos = [
  { id: 1, image: '/img/banner-phones.png' },
  { id: 2, image: '/img/banner-tablets.png' },
  { id: 3, image: '/img/banner-accessories.png' },
];

export const MainSlider = () => {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slideToShow: 1,
    slideToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    className: 'slick__main-slider--width',
  };

  return (
    <div className="MainSlider__photos">
      <Slider {...settings}>
        {bannerPhotos.map(banner => (
          <img
            key={banner.id}
            className="MainSlider__photo"
            src={banner.image}
          />
        ))}
      </Slider>
    </div>
  );
};
