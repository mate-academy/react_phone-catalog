import classNames from 'classnames';
import { IconButtonSVGOption } from '../../types/enums';
import { HandleSliderDragEvent, Product } from '../../types/types';
import { useLanguage } from '../Contexts/LanguageContext';
import { IconButton } from '../IconButton';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
import { useEffect, useRef, useState } from 'react';
import { getPageX } from '../../functions/functions';

enum DisabledButton {
  Left = 'Left',
  Right = 'Right',
  None = 'None',
}

type Props = {
  title: string;
  products: Product[];
  className?: string;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  className,
}) => {
  const { accessPrevious, accessNext } = useLanguage().localeTexts;
  const [isDragged, setIsDragged] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [disabledButton, setDisabledButton] = useState<DisabledButton>(
    DisabledButton.Left,
  );
  const listRef = useRef<HTMLUListElement>(null);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const handleSliderStartDrag = (event: HandleSliderDragEvent) => {
    const list = listRef.current;
    const eventList = event.currentTarget;

    if (list && eventList) {
      setIsDragged(true);
      setIsClicked(true);
      startX.current = getPageX(event);

      startScrollLeft.current = event.currentTarget.scrollLeft;
      list.scrollLeft = startScrollLeft.current;
    }
  };

  const buttonSwipe = (next: boolean) => {
    const list = listRef.current;

    if (list && list.firstElementChild) {
      const listStyles = getComputedStyle(list);
      const gap = parseFloat(listStyles.gap);
      const listWidth = parseFloat(listStyles.width);
      const productCardWidth =
        parseFloat(getComputedStyle(list.firstElementChild).width) || 0;

      const padding = (list.clientWidth - listWidth) / 2;
      const restOfListWidth = listWidth + padding;
      const cardSwipeWidth = productCardWidth + gap;

      if (next) {
        list.scrollLeft =
          cardSwipeWidth *
          Math.round(
            (list.scrollLeft + restOfListWidth + gap / 2) / cardSwipeWidth,
          );
      } else {
        list.scrollLeft =
          cardSwipeWidth *
          (Math.round((list.scrollLeft - padding + gap / 2) / cardSwipeWidth) -
            Math.floor((restOfListWidth + gap) / cardSwipeWidth));
      }
    }
  };

  const handlePrevSwipeButtonClick = () => {
    buttonSwipe(false);
  };

  const handleNextSwipeButtonClick = () => {
    buttonSwipe(true);
  };

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const list = event.currentTarget;

    if (list.scrollLeft === 0) {
      setDisabledButton(DisabledButton.Left);
    } else if (list.scrollLeft === list.scrollWidth - list.clientWidth) {
      setDisabledButton(DisabledButton.Right);
    } else {
      setDisabledButton(DisabledButton.None);
    }
  };

  useEffect(() => {
    const handleSliderDrag = (event: MouseEvent) => {
      const list = listRef.current;

      if (isDragged && list) {
        const distance = startX.current - event.pageX;

        list.scrollLeft = startScrollLeft.current + distance;

        if (Math.abs(distance) > 5) {
          setIsClicked(false);
        }
      }
    };

    const handleSliderStopDrag = () => {
      if (isDragged) {
        setIsDragged(false);
      }
    };

    document.addEventListener('mousemove', handleSliderDrag);
    document.addEventListener('mouseup', handleSliderStopDrag);

    return () => {
      document.removeEventListener('mousemove', handleSliderDrag);
      document.removeEventListener('mouseup', handleSliderStopDrag);
    };
  }, [isDragged]);

  return (
    <section
      className={classNames(
        styles.ProductsSlider,
        isDragged && styles.ProductsSlider_dragged,
        className,
      )}
    >
      <header className={styles.Header}>
        <h3 className={styles.Title}>{title}</h3>

        <div className={styles.Buttons}>
          <IconButton
            svgOption={IconButtonSVGOption.LeftArrow}
            disabled={disabledButton === DisabledButton.Left}
            onClick={handlePrevSwipeButtonClick}
            label={accessPrevious}
          />

          <IconButton
            svgOption={IconButtonSVGOption.RightArrow}
            disabled={disabledButton === DisabledButton.Right}
            onClick={handleNextSwipeButtonClick}
            label={accessNext}
          />
        </div>
      </header>

      <div className={styles.Wrapper}>
        <ul
          className={styles.List}
          ref={listRef}
          onMouseDown={handleSliderStartDrag}
          onScroll={handleScroll}
        >
          {products.map(product => (
            <li key={product.id} className={styles.Item}>
              <ProductCard
                key={product.id}
                product={product}
                isClicked={isClicked}
                draggable={false}
                className={styles.ProductCard}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
