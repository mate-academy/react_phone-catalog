import { useState, useMemo } from 'react';
import './CardSlider.scss';

import { Product } from '../../types/Product';

import Card from '../Card/Card';
import CardSliderButt from './CardSliderButt/CardSliderButt';

const width = 272 + 16;
const count = 4;

type Props = {
  products: Product[];
  title: string;
};

const CardSlider: React.FC<Props> = ({ products, title }) => {
  const [offset, setOffset] = useState(0);
  const isLeftDisabled = offset === 0;
  const isRightDisabled = useMemo(() => {
    return offset === -(width * (products.length - count));
  }, [offset, width, products, count]);

  const onClickRight = () => {
    setOffset(currOffset => currOffset - width);
  };

  const onClickLeft = () => {
    setOffset(currOffset => currOffset + width);
  };

  return (
    <section className="page__section card-slider">
      <div className="container">
        <div className="card-slider__wrapper">
          <h2 className="page__title">
            {title}
          </h2>

          <div
            className="card-slider__list"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {products.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>

          <div className="card-slider__butts">
            <CardSliderButt
              img="./icons/left.svg"
              isDis={isLeftDisabled}
              move={onClickLeft}
            />
            <CardSliderButt
              img="./icons/right.svg"
              isDis={isRightDisabled}
              move={onClickRight}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSlider;
