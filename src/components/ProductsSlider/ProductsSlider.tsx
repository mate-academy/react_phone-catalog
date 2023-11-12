import useMediaQuery from 'react-use-media-query-ts';
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
  const isSmallDesktop = useMediaQuery('(max-width: 1340px)');
  const isMobile = useMediaQuery('(max-width: 425px)');
  // eslint-disable-next-line no-nested-ternary
  const slidesToShow = isSmallDesktop
    ? isMobile ? 1 : 2
    : 4;
  const sliderSettings = {
    infinite: false,
    swipe: isMobile,
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: (
      <Icon stylesName={`${styles.arrow}`} icon={arrowRight} isCarousel />
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
          <Slider {...sliderSettings} className={styles.slider}>
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};
