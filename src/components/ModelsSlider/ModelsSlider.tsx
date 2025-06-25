import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ModelsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { CustomArrow } from '../CustomArrow';

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

const CustomSlide = () => {
  return <ProductCard product={product} />;
};

export const ModelsSlider = () => {
  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <CustomArrow direction="right" additionalClassName="modelsSliderArrow" />
    ),
    prevArrow: (
      <CustomArrow direction="left" additionalClassName="modelsSliderArrow" />
    ),
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <CustomSlide key={i} />
        ))}
      </Slider>
    </div>
  );
};
