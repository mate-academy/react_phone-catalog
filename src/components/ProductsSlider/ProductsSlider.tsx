import Slider from 'react-slick';
import { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductsSlider.module.scss';
import classNames from 'classnames';

const images = [
  {
    id: 1,
    img: '/img/slider-1.png',
  },
  {
    id: 2,
    img: '/img/slider-22.png',
  },
  {
    id: 3,
    img: '/img/slider-33.png',
  },
];

type ImageData = {
  id: number;
  img: string;
};

type SlideProps = {
  image: ImageData;
};

const CustomSlide = ({ image }: SlideProps) => {
  const { id, img } = image;

  return (
    <img
      className={styles.customSlide}
      src={`${import.meta.env.BASE_URL}/${img}`}
      alt={`slider-img-${id}`}
    />
  );
};

type ArrowProps = {
  direction: 'right' | 'left';
} & CustomArrowProps;

const CustomArrow = ({ onClick, direction }: ArrowProps) => {
  return (
    <button
      className={classNames(styles.customArrow, styles[direction])}
      onClick={onClick}
    >
      <img
        src={`${import.meta.env.BASE_URL}/img/icons/arrow-${direction}.svg`}
      />
    </button>
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
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,

    customPaging: () => <div className={styles.customDot}></div>,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {images.map(image => (
          <CustomSlide key={image.id} image={image} />
        ))}
      </Slider>
    </div>
  );
};
