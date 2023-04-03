import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CatalogProduct } from '../../types/CatalogProduct';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type Props = {
  title: string;
  products: CatalogProduct[];
};

const gap = 16;

export const ProductsSlider: FC<Props> = ({
  title,
  products,
}) => {
  const currentSlider = useRef<HTMLDivElement>(null);

  const [isSlider] = useState(true);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const getScrollValue = () => {
    const card = document.querySelector('.card');
    const windowWidth = window.innerWidth;

    const cardWidth = (card?.getBoundingClientRect().width ?? 0);

    if (windowWidth >= 1161) {
      return cardWidth * 4 + gap * 4;
    }

    if (windowWidth >= 870 && windowWidth <= 1160) {
      return Math.round((cardWidth * 3 + gap * 3) * 10) / 10;
    }

    if (windowWidth <= 869 && windowWidth > 580) {
      return cardWidth * 2 + gap * 2;
    }

    return 0;
  };

  const handleShowPrevious = (carousel: HTMLDivElement | null) => {
    if (!carousel) {
      return;
    }

    carousel.scrollBy({
      left: getScrollValue() * -1,
      behavior: 'smooth',
    });
  };

  const handleShowNext = (carousel: HTMLDivElement | null) => {
    if (!carousel) {
      return;
    }

    carousel.scrollBy({
      left: getScrollValue(),
      behavior: 'smooth',
    });
  };

  const handleSliderScroll = (
    event: React.UIEvent<HTMLDivElement, UIEvent>,
  ) => {
    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = event.currentTarget;

    const maxWidth = (scrollWidth - clientWidth);

    switch (Math.round(scrollLeft)) {
      case maxWidth:
        setIsNextDisabled(true);
        break;

      case 0:
        setIsPrevDisabled(true);
        break;

      default:
        setIsPrevDisabled(false);
        setIsNextDisabled(false);
        break;
    }
  };

  const [swipe, setSwipe] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    setSwipe(touch.clientX);
    setIsSwiped(false);
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (event.changedTouches && event.changedTouches.length) {
      setIsSwiped(true);
    }
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>,
    carousel: HTMLDivElement | null,
  ) => {
    if (!carousel || !isSwiped) {
      return;
    }

    const touch = event.changedTouches[0];

    if (touch.clientX > swipe) {
      carousel.scrollBy({
        left: getScrollValue() * -1,
        behavior: 'smooth',
      });
    } else {
      carousel.scrollBy({
        left: getScrollValue(),
        behavior: 'smooth',
      });
    }

    setIsSwiped(false);
    setSwipe(0);
  };

  useEffect(() => {
    if (currentSlider.current) {
      setIsNextDisabled(
        currentSlider.current.scrollWidth === currentSlider.current.clientWidth,
      );
    }
  }, [products.length]);

  return (
    <div className="slider home-page__slider">
      <div className="slider__header-block">
        <h2 className="slider__title">{title}</h2>

        <div className="slider__buttons-container">
          <button
            type="button"
            name="Prev"
            aria-label="buttonPrev"
            onClick={() => handleShowPrevious(currentSlider.current)}
            className="pagination-button pagination-button--prev slider__button"
            disabled={isPrevDisabled}
          />

          <button
            type="button"
            name="Next"
            aria-label="buttonNext"
            onClick={() => handleShowNext(currentSlider.current)}
            className="pagination-button slider__button slider__button--next"
            disabled={isNextDisabled}
          />
        </div>
      </div>

      <div
        className="slider__cards-block"
        onScroll={handleSliderScroll}
        ref={currentSlider}
        data-cy="cardsContainer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={(event) => handleTouchEnd(event, currentSlider.current)}
      >
        {!products.length
          ? (
            <Loader />
          ) : (
            <>
              {products.map(product => (
                <ProductCard
                  product={product}
                  key={product.id}
                  isSlider={isSlider}
                  isProductsList={false}
                />
              ))}
            </>
          )}
      </div>
    </div>
  );
};
