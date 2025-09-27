import React, { useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './ProductsSlider.module.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';

interface Props {
  products: Product[];
  mode?: 'newest' | 'discount';
}

interface CustomArrowProps {
  className: string;
  onClick?: () => void;
  direction: string;
}

const CustomArrow = (props: CustomArrowProps) => {
  const { className, onClick, direction } = props;

  return (
    <button
      className={classNames(className, styles.arrow, styles[direction])}
      onClick={onClick}
    >
      <span
        className={classNames('icon', {
          'icon--arrow-left': direction === 'prev',
          'icon--arrow-right': direction === 'next',
        })}
      ></span>
    </button>
  );
};

const CustomSlider: React.FC<Props> = ({ products, mode }) => {
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
      <CustomArrow className={classNames(styles.arrow)} direction="next" />
    ),
    prevArrow: (
      <CustomArrow className={classNames(styles.arrow)} direction="prev" />
    ),
  };

  const preparedProducts = useMemo(() => {
    let result = [...products];

    if (mode === 'newest') {
      result = result.sort((a, b) => b.year - a.year);
    }

    if (mode === 'discount') {
      result = result
        .filter(p => p.fullPrice && p.price && p.fullPrice > p.price)
        .sort((a, b) => b.fullPrice! - b.price! - (a.fullPrice! - a.price!));
    }

    return result.slice(0, 20);
  }, [products, mode]);

  return (
    <Slider {...settings} className={styles.slider}>
      {preparedProducts.map(product => (
        <ProductCard key={product.id} product={product} mode={mode} />
      ))}
    </Slider>
  );
};

export const ProductsSlider = React.memo(CustomSlider);
