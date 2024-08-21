import Slider from 'react-slick';
import './MainSlider.scss';

const bannerPhotos = [
  { id: 1, image: '/img/banner-phones.png' },
  { id: 2, image: '/img/banner-tablets.png' },
  { id: 3, image: '/img/banner-accessories.png' },
];

export const MainSlider = () => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slideToShow: 1,
    slideToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
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
