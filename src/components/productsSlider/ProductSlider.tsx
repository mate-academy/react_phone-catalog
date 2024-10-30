import { useRef, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductSlider.module.scss';
import './Skick.scss';

import { useAppSelector } from '../../utils/hooks';

import { AllProduct } from '../../types/UnionType';

import { Card } from '../Card';
import { ArrowButton } from '../ArrowButton';
import { CardSkeleton } from '../CardSkeleton';

interface Props {
  products: AllProduct[];
  showSale?: boolean;
  title: string;
  loader?: boolean;
}

export const ProductSlider: React.FC<Props> = ({
  products,
  showSale = false,
  title,
  loader = false,
}) => {
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);

  const favoritesIds = useAppSelector(state => state.favorites.data).map(
    (item: AllProduct) => ('itemId' in item ? item.itemId : item.id),
  );

  const cartIds = useAppSelector(state => state.cart.data).map(
    ({ item }: { item: AllProduct }) =>
      'itemId' in item ? item.itemId : item.id,
  );

  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    adaptiveHeight: true,
    afterChange: (index: number) => {
      if (!disableLeft && index === 0) {
        setDisableLeft(true);
      }

      if (disableLeft && index !== 0) {
        setDisableLeft(false);
      }

      if (!disableRight && index === products.length - 1) {
        setDisableRight(true);
      }

      if (disableRight && index !== products.length - 1) {
        setDisableRight(true);
      }
    },
  };

  return (
    <div className={styles.productSlider}>
      <div className={styles.productSlider__header}>
        <h2 className={styles.productSlider__title}>{title}</h2>
        <div className={styles.productSlider__buttons}>
          <ArrowButton
            click={previous}
            diraction="left"
            disable={disableLeft}
          />
          <ArrowButton click={next} diraction="right" disable={disableRight} />
        </div>
      </div>
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {loader &&
          Array(16)
            .fill(0)
            .map((_, i) => <CardSkeleton key={i} />)}
        {!loader &&
          products.map(product => (
            <Card
              card={product}
              showSale={showSale}
              key={product.id}
              favorite={favoritesIds.includes(
                'itemId' in product ? product.itemId : product.id,
              )}
              cart={cartIds.includes(
                'itemId' in product ? product.itemId : product.id,
              )}
            />
          ))}
      </Slider>
    </div>
  );
};
