/* eslint-disable max-len */
import styles from './ProductSlider.module.scss';
// eslint-disable-next-line max-len
import React, { useRef } from 'react';
import { ProductType } from '../../types/Product';
import Product from '../Product/Product';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  title: string;
  products: ProductType[];
};
const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const sliderRef = useRef<Slider | null>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    className: 'slider variable-width',
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
    variableWidth: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <section className={styles.products}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={previous}>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: 'rotate(180deg)',
                transformOrigin: 'center center',
              }}
              className={styles.arrowIcon}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
              ></path>
            </svg>
          </button>
          <button className={styles.arrow} onClick={next}>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: 'rotate(0deg)',
                transformOrigin: 'center center',
              }}
              className={styles.arrowIcon}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <Slider {...settings} className={styles.slider} ref={sliderRef}>
        {products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </Slider>
    </section>
  );
};

export default ProductSlider;
