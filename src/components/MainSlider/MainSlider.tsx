import Slider from 'react-slick';

export const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const images = [
    {
      src: './img/main-slider/smartphones.jpeg',
      alt: 'The new line of SmartPhones',
    },
    { src: './img/main-slider/tablets.jpeg', alt: 'New powerful tablet' },
    {
      src: './img/main-slider/smart-watches.jpeg',
      alt: 'Smart watch is on your watch',
    },
  ];

  return (
    <div className="main-slider">
      <Slider {...settings}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="main-slider__slide"
          />
        ))}
      </Slider>
    </div>
  );
};
