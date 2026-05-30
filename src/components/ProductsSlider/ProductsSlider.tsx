import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import React, { useMemo } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';
import classNames from 'classnames';

interface Props {
  products: Product[];
}

type ArrowButton = {
  className: string;
  onClick?: () => void;
  direction: string;
};

const CustomArrow = (props: ArrowButton) => {
  const { className, onClick, direction } = props;

  return (
    <div
      className={`${className} ${styles.arrow} ${styles[direction]}`}
      onClick={onClick}
    />
  );
};

const CustomSlider: React.FC<Props> = ({ products }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: (
      <CustomArrow
        className={classNames(styles.arrow, styles.next)}
        direction="next"
      />
    ),
    prevArrow: (
      <CustomArrow
        className={classNames(styles.arrow, styles.prev)}
        direction="prev"
      />
    ),
  };

  const filteredProducts = useMemo(() => {
    return products.filter((_, index) => index < 5);
  }, [products]);

  return (
    <Slider {...settings} className={styles.slider}>
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          classNameProp={styles.slide}
        />
      ))}
    </Slider>
  );
};

export const ProductsSlider = React.memo(CustomSlider);
