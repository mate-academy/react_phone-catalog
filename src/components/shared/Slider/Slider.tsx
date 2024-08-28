import styles from './Slider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '../../../type/Product';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../Arrows/Arrows';
import { Card } from '../Card/Card';
import { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContext/GlobalContext';

type SliderProps = {
  titleName: string;
  products: Product[];
  discount?: boolean;
};

export const Sliders: React.FC<SliderProps> = ({ titleName, products }) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const { isSunSelected } = useContext(GlobalContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow disabled={isNextDisabled} />,
    prevArrow: <PrevArrow disabled={isPrevDisabled} />,
    afterChange: (current: number) => {
      setIsPrevDisabled(current === 0);
      setIsNextDisabled(current >= products.length - 4);
    },

    variableWidth: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          variableWidth: true,
        },
      },
      {
        breakpoint: 655,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
      {
        breakpoint: 240,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__wrapper}>
        <h2
          className={classNames(styles.slider__title, {
            [styles.slider__title_dark]: !isSunSelected,
          })}
        >
          {titleName}
        </h2>
        <div className={styles.slider__button_container}>
          <PrevArrow />

          <NextArrow />
        </div>

        <div className={styles.slider__container}>
          <Slider ref={sliderRef} {...settings}>
            {products.map(product => (
              <Card
                key={product.id}
                product={product}
                category={product.category}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
