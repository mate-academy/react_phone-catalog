import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { throttle } from 'lodash';
import { useSwipeable } from 'react-swipeable';
import { getWidthHandler } from '../../helpers/getWidthHandler';

import { Product } from '../../types/Product';
import { Button } from '../Button/Button';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';
import { NoResults } from '../NoResults/NoResults';
import { Loader } from '../Loader';

type Props = {
  products: Product[];
};

enum ItemsScrolled {
  Fisrt = 0,
}

enum ContainerWidth {
  Small = 460,
  Medium = 800,
  Large = 1000,
}

export const ProductSlider: React.FC<Props> = ({
  products,
}) => {
  const [itemsScrolled, setItemsScrolled] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [transition, setTransition] = useState('transform 1s ease');
  const containerRef = useRef<HTMLDivElement>(null);

  const gap = 16;
  const itemsCount = products.length;

  const itemsInFrame = useMemo(() => {
    if (containerWidth < ContainerWidth.Small) {
      return 1;
    }

    if (containerWidth < ContainerWidth.Medium) {
      return 2;
    }

    if (containerWidth < ContainerWidth.Large) {
      return 3;
    }

    return 4;
  }, [containerWidth]);

  const itemWidth = useMemo(() => {
    return (containerWidth - (gap * (itemsInFrame - 1))) / itemsInFrame;
  }, [containerWidth, itemsInFrame]);

  const carouselWidth = useMemo(() => {
    return itemsCount * itemWidth + gap * (itemsCount - 1);
  }, [itemWidth]);

  const scrolledWidth = useMemo(() => {
    if (itemsCount - itemsScrolled < itemsInFrame) {
      setItemsScrolled(items => items - 1);
    }

    return itemsScrolled * itemWidth + itemsScrolled * gap;
  }, [itemsScrolled, itemWidth, itemsInFrame]);

  useEffect(() => {
    const widthHandler = getWidthHandler(
      containerRef,
      setContainerWidth,
      setTransition,
    );
    const throttledWidthHandler = throttle(widthHandler, 200);

    throttledWidthHandler();

    window.addEventListener('resize', throttledWidthHandler);

    return () => window.removeEventListener('resize', throttledWidthHandler);
  }, []);

  const handleSlideLeft = () => {
    setItemsScrolled((items) => {
      if (items - itemsInFrame < ItemsScrolled.Fisrt) {
        return ItemsScrolled.Fisrt;
      }

      return items - itemsInFrame;
    });
  };

  const handleSlideRight = () => {
    setItemsScrolled((items) => {
      if (items + itemsInFrame > itemsCount - itemsInFrame) {
        return itemsCount - itemsInFrame;
      }

      return items + itemsInFrame;
    });
  };

  const mobileHandlers = useSwipeable({
    onSwipedLeft: () => handleSlideRight(),
    onSwipedRight: () => handleSlideLeft(),
    trackMouse: true,
  });

  if (!products.length) {
    return <NoResults category="Products" />;
  }

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__buttons">
        <Button
          disabled={itemsScrolled === ItemsScrolled.Fisrt}
          variant="arrow"
          arrowDirection="left"
          aria-label="slide-left"
          onClick={handleSlideLeft}
        />

        <Button
          disabled={itemsScrolled >= itemsCount - itemsInFrame}
          variant="arrow"
          aria-label="slide-right"
          onClick={handleSlideRight}
        />
      </div>

      <div ref={containerRef} className="ProductsSlider__content">
        {!containerWidth
          ? <Loader />
          : (
            <ul
              className="ProductsSlider__content-list"
              data-cy="cardsContainer"
              style={{
                width: carouselWidth,
                transition,
                transform: `translate(-${scrolledWidth}px, 0)`,
              }}
              {...mobileHandlers}
            >
              {products.map(product => (
                <li key={product.id} style={{ width: itemWidth }}>
                  <ProductCard
                    product={product}
                  />
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};
