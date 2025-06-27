import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductsSlider.module.scss';
import { CustomArrow } from '../CustomArrow';

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
    <img className={styles.customSlide} src={img} alt={`slider-img-${id}`} />
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
    nextArrow: (
      <CustomArrow direction="right" arrowClassName="welcomeSliderArrow" />
    ),
    prevArrow: (
      <CustomArrow direction="left" arrowClassName="welcomeSliderArrow" />
    ),

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
