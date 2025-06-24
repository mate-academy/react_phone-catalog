import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomArrowProps } from 'react-slick';
import { FC } from 'react';
import classNames from 'classnames';
import styles from './NewModelsSlider.module.scss';
import { ProductCard } from '../ProductCard';

const product = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-7-32gb-black',
  name: 'Apple iPhone 7 32GB Black',
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: '32GB',
  color: 'black',
  ram: '2GB',
  year: 2016,
  image: 'img/phones/apple-iphone-7/black/00.webp',
};

const SampleNextArrow: FC<CustomArrowProps> = props => {
  const { onClick } = props;

  return (
    <img
      src="img/slider-button-next-small.png"
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

export const NewModelsSlider = () => {
  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
          // <CustomSlide key={image.id} image={image} />
          <ProductCard key={index} product={product} />
        ))}
      </Slider>
    </div>
  );
};
