/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Slider from 'react-slick';
import { Product } from '../types/Product';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/blocks/slider.scss';

type Props = {
  products: Product[],
};

export const ProductSlider: React.FC<Props> = (
  { products },
) => {
  function SampleNextArrow(
    props: { className: string; style: any; onClick: () => void; },
  ) {
    const { className, style, onClick } = props;

    return (
      <div
        className={`${className} slider__navigation--top`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(
    props: { className: string; style: any; onClick: () => void; },
  ) {
    const { className, style, onClick } = props;

    return (
      <div
        className={`${className} slider__navigation--top`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: true,
    nextArrow: <SampleNextArrow
      className="slider__button"
      style={{}}
      onClick={() => {}}
    />,
    prevArrow: <SamplePrevArrow
      className="slider__button"
      style={{}}
      onClick={() => {}}
    />,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div style={{ margin: 30 }}>
        <Slider {...settings} className="slider">
          {products.map(item => (
            <div className="slider__card--top-slider" key={item.id}>
              <img
                className="slider__img slider__img--top"
                src={item.imageUrl}
                alt={item.name}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
