import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import { Products } from '../../../type/Products';
import { Card } from '../Card/Card';
import './Slick.module.scss';
import styles from './CardsCarusel.module.scss';

interface Props {
  products: Products[];
  discount?: boolean;
  name: string;
}

type SliderRef = {
  slickNext: () => void;
  slickPrev: () => void;
};

const Slick: React.FC<Props> = ({ products, discount, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
    afterChange: (index: number) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef<SliderRef>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>{name}</h2>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={previous}
            disabled={currentIndex === 0}
          >
            <span>
              <img src="img/icons/Arrow_Left.svg" alt="arrow_left" />
            </span>
          </button>
          <button
            className={styles.button}
            onClick={next}
            disabled={currentIndex >= products.length - settings.slidesToShow}
          >
            <span>
              <img src="img/icons/Arrow_Right.svg" alt="arrow_right" />
            </span>
          </button>
        </div>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {products.map((product, index) => (
          <div key={index}>
            <Card product={product} discount={discount} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Slick;
