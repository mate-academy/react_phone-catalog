import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StatesContext } from '../../../store/GlobalStateProvider';
import { ProductCard } from '../ProductCard/ProductCard.component';
import { Icon } from '../Icon/Icon.component';

type Props = {
  title: string;
};
const cardGap = 8;

export const ProductSlider: React.FC<Props> = ({ title }) => {
  const { products } = useContext(StatesContext);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [onScreenCount, setOnScreenCount] = useState<number>(0);
  const [scrollSteps, setScrollSteps] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const configureSlider = useCallback(() => {
    const { current: card } = cardRef;
    const { current: frame } = frameRef;
    const { current: slider } = sliderRef;

    if (card && frame && slider) {
      setCardWidth(card.offsetWidth + cardGap * 2);
      setOnScreenCount(Math.floor(frame.offsetWidth / cardWidth));
      setScrollSteps(Math.floor(slider.offsetWidth / cardWidth));
    }
  }, [cardRef, sliderRef, frameRef, cardWidth]);

  const prev = () => {
    if (index < 0) {
      setIndex(index + scrollSteps);
    }
  };

  const next = () => {
    if (index > -(products.length - 1 - onScreenCount)) {
      setIndex(index - scrollSteps);
    }
  };

  useEffect(() => {
    setTimeout(() => configureSlider(), 300);
  });

  return (
    <section className="productSlider">
      <div className="productSlider__header">
        <h2 className="productSlider__title">{title}</h2>
        <div className="productSlider__header-icons">
          <Icon
            iconType="chevron-left"
            iconUse="button-size32"
            onClick={prev}
            disabled={index === 0}
          />
          <Icon
            iconType="chevron-right"
            iconUse="button-size32"
            onClick={next}
            disabled={index <= -(products.length - scrollSteps)}
          />
        </div>
      </div>
      <div className="productSlider__frame" ref={frameRef}>
        <div
          className="productSlider__list"
          style={{
            transform: `translate(${cardWidth * index}px)`,
          }}
          ref={sliderRef}
        >
          {products
            .sort((a, b) => b.year - a.year)
            .map((product, idx) => (
              <div
                className={`productSlider__card`}
                key={product ? product.id : idx}
                ref={cardRef}
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
