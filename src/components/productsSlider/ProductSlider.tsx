import { Product } from '../../types/Product';
import { Card } from '../card/Card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './ProductSlider.scss';
import { ArrowButton } from '../arrowButton/ArrowButton';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { AllProduct } from '../../types/UnionType';

interface Props {
  products: Product[];
  showSale?: boolean;
  title: string;
}

export const ProductSlider: React.FC<Props> = ({
  products,
  showSale = false,
  title,
}) => {
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);

  const favoritesIds = useAppSelector(state => state.favorites.data).map(
    (item: AllProduct) => ('itemId' in item ? item.itemId : item.id),
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
    className: 'productSlider',
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
    <div className="productSlider">
      <div className="productSlider__header">
        <h2 className="productSlider__title">{title}</h2>
        <div className="productSlider__buttons">
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
        {products.map(product => (
          <Card
            card={product}
            showSale={showSale}
            key={product.id}
            favorite={favoritesIds.includes(product.itemId)}
          />
        ))}
      </Slider>
    </div>
  );
};
