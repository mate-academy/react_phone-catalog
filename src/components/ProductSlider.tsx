/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
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
          {products.map(product => (
            <Link
              to={`../${product.id}`}
              className="slider__card--top-slider"
              key={product.id}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="slider__img slider__img--top"
              />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};
