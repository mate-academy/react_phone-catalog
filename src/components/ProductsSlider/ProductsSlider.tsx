import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomArrowProps } from 'react-slick';
import { FC } from 'react';
import classNames from 'classnames';
import styles from './ProductsSlider.module.scss';

const images = [
  {
    id: 1,
    img: '/img/slider-1.png',
  },
  {
    id: 2,
    img: '/img/slider-2.png',
  },
  {
    id: 3,
    img: '/img/slider-3.png',
  },
];

type ImageData = {
  id: number;
  img: string;
};

type Props = {
  image: ImageData;
};

const CustomSlide = ({ image }: Props) => {
  const { id, img } = image;

  return (
    <div className={styles.customSlide}>
      <img src={img} alt={`slider-img-${id}`} />
    </div>
  );
};

const SampleNextArrow: FC<CustomArrowProps> = props => {
  const { onClick } = props;

  return (
    <img
      src="img/slider-button-next.png"
      className={classNames(styles.customArrow, styles.next)}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: FC<CustomArrowProps> = props => {
  const { onClick } = props;

  return (
    <img
      src="img/slider-button-prev.png"
      className={classNames(styles.customArrow, styles.prev)}
      onClick={onClick}
    />
  );
};

export const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnDotsHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: () => <div className={styles.customDot}></div>,
  };

  return (
    <Slider {...settings}>
      {images.map(image => (
        <CustomSlide key={image.id} image={image} />
      ))}
    </Slider>
  );
};
