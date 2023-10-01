import Slider from 'react-slick';
import styles from './ProductsSlider.module.scss';

import { Icon } from '../Icon/Icon';
import arrowRight from '../../img/icons/ArrowRight.svg';
import arrowLeft from '../../img/icons/ArrowLeft.svg';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const sliderSettings = {
    infinite: false,
    swipe: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <Icon stylesName={`${styles.arrow} ${styles.arrowNext}`} icon={arrowRight} isCarousel />
    ),
    prevArrow: (
      <Icon stylesName={`${styles.arrow} ${styles.arrowPrev}`} icon={arrowLeft} isCarousel />
    ),
  };

  return (
    <div className={styles.wrapper}>
      {products.length && (
        <>
          <h1 className={styles.title}>{title}</h1>
          <Slider {...sliderSettings}>
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};
