import {
  FC,
  useState,
  TouchEvent,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import classNames from 'classnames';
import { Button } from '../Button/Button';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';

import './ProductsSlider.scss';

type Props = {
  title: string;
  itemsLength: number;
};

export const ProductsSlider: FC<Props> = ({ children, title, itemsLength }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const { width, isMobile } = useContext(PhoneCatalogContext);

  useEffect(() => {
    if (width < 768) {
      setItemsPerSlide(1);
    } else if (width < 1024) {
      setItemsPerSlide(2);
    } else if (width < 1440) {
      setItemsPerSlide(3);
    } else {
      setItemsPerSlide(4);
    }
  }, [width]);

  const calculateMaxEndIndex = useCallback(() => {
    return itemsLength - itemsPerSlide;
  }, [itemsPerSlide, itemsLength]);

  const isLeftButtonDisabled = useMemo(() => currentIdx === 0, [currentIdx]);
  const isRightButtonDisabled = useMemo(
    () => currentIdx >= calculateMaxEndIndex(),
    [currentIdx],
  );

  const handleButtonClick = (step: number) => {
    const initialIdx = 0;
    const lastIdx = itemsLength - 1;

    let newIdx = currentIdx + step;

    if (step < 0) {
      if (currentIdx === initialIdx) {
        newIdx = lastIdx;
      } else if (newIdx < initialIdx) {
        newIdx = initialIdx;
      }
    }

    if (step > 0) {
      if (currentIdx === lastIdx) {
        newIdx = initialIdx;
      } else if (newIdx > lastIdx) {
        newIdx = lastIdx;
      }
    }

    setCurrentIdx(newIdx);
  };

  const handleTouchStart = useCallback((event: TouchEvent) => {
    setTouchStartX(event.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;

    if (touchStartX - touchEndX > 50 && !isRightButtonDisabled) {
      handleButtonClick(1);
    } else if (touchEndX - touchStartX > 50 && !isLeftButtonDisabled) {
      handleButtonClick(-1);
    }
  }, [isRightButtonDisabled, isLeftButtonDisabled, handleButtonClick]);

  return (
    <div className="products-slider">

      <div className="products-slider__top">
        <h1 className="products-slider__title">{title}</h1>
        <div className="products-slider__buttons">
          <Button
            content="icon"
            iconType={isLeftButtonDisabled
              ? 'arrow-left-disabled'
              : 'arrow-left'}
            className={classNames('slider-arrow', {
              'button--slider-arrow--disabled': isLeftButtonDisabled,
            })}
            disabled={isLeftButtonDisabled}
            event={() => handleButtonClick(-1)}
          />
          <Button
            content="icon"
            iconType={isRightButtonDisabled
              ? 'arrow-right-disabled'
              : 'arrow-right'}
            className={classNames('slider-arrow', {
              'button--slider-arrow--disabled': isRightButtonDisabled,
            })}
            disabled={isRightButtonDisabled}
            event={() => handleButtonClick(1)}
          />
        </div>
      </div>

      <div
        className="products-slider__carousel"
        style={{
          transform: `translateX(${-currentIdx * (isMobile ? 280 : 288)}px)`,
          transition: 'transform 500ms',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};
