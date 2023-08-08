import { Phone } from '../../../types/phone';
import { ProductCard } from '../../ProductCard';

type Props = {
  slideNumber: number,
  items: Phone[],
  discount?: boolean,
};

export const SliderList: React.FC<Props> = ({
  slideNumber,
  items,
  discount = true,
}) => {
  return (
    <div
      className="slider__list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
      data-cy="cardsContainer"
    >
      {items.map((slide) => (
        <div className="slider__item" key={slide.id}>
          <ProductCard data={slide} discount={discount} />
        </div>
      ))}
    </div>
  );
};
