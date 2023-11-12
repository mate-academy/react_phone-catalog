/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import Slider from 'react-slick';
import styles from './Carousel.module.scss';

import { CustomNextArrow } from './CustomNextArrow';
import { CustomPrevArrow } from './CustomPrevArrow';

export const Carousel = () => {
  const indecator = (dots: any[]) => (
    <ul style={{ bottom: '-22px' }}>
      {dots.map(el => {
        return (
          <li
            key={el.key}
            className={classNames(styles.indicator, {
              [styles.active]: el.props.className === 'slick-active',
            })}
          />
        );
      })}
    </ul>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: (
      <CustomNextArrow stylesName={`${styles.arrow} ${styles.arrowNext}`} />
    ),
    prevArrow: (
      <CustomPrevArrow stylesName={`${styles.arrow} ${styles.arrowPrev}`} />
    ),
    appendDots: (dots: any[]) => indecator(dots),
  };

  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>
        <div>
          <img
            className={styles.img}
            src="./_new/img/banner-phones.png"
            alt="banner"
          />
        </div>
        <div>
          <img
            className={styles.img}
            src="./_new/img/banner-accessories.png"
            alt="banner"
          />
        </div>
        <div>
          <img
            className={styles.img}
            src="./_new/img/banner-tablets.png"
            alt="banner"
          />
        </div>
      </Slider>
    </div>
  );
};
