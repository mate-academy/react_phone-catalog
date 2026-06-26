/* eslint-disable no-console */

import styles from './CatalogSlider.module.scss';
import { ProductCatalogItem } from '../../../types/ProductCatalogItem';
import ProductCard from '../ProductCard';
import Icon from '../Icon';
import { useEffect, useRef, useState } from 'react';

interface Props {
  title: string;
  products: ProductCatalogItem[];
  additionalStyles?: string;
}

const CatalogSlider: React.FC<Props> = ({
  title,
  products,
  additionalStyles = '',
}) => {
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  function getVisibleSlidesCount() {
    if (!sliderRef.current) {
      return 0;
    }

    return Math.floor(
      sliderRef.current.getBoundingClientRect().width /
        sliderRef.current.children[0].getBoundingClientRect().width,
    );
  }

  const scrollTo = (slideNumber: number) => {
    if (!sliderRef.current) {
      return;
    }

    const slides = sliderRef.current.children;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const inline = slideNumber === slides.length - 1 ? 'center' : 'end';

    setLeftButtonDisabled(true);
    setRightButtonDisabled(true);
    setCurrentSlide(slideNumber);

    slides[slideNumber].scrollIntoView({
      behavior: 'smooth',
      inline,
      block: 'nearest',
    });

    window.scrollTo({
      top: scrollY,
      behavior: 'instant',
    });
  };

  const scrollLeft = () => {
    scrollTo(Math.max(0, currentSlide - getVisibleSlidesCount()));
  };

  const scrollRight = () => {
    scrollTo(
      Math.min(products.length - 1, currentSlide + getVisibleSlidesCount()),
    );
  };

  useEffect(() => {
    let handleScrollEnd = null;
    let slider: HTMLDivElement;

    if (sliderRef.current) {
      slider = sliderRef.current;
      const slides = slider.children;

      const isFirstVisible = () => {
        return (
          slides[0].getBoundingClientRect().x -
            slider.getBoundingClientRect().x >=
          0
        );
      };

      const isLastVisible = () => {
        const num = slides.length - 1;

        const lastBlockRect = slides[num].getBoundingClientRect();
        const containerRect = slider.getBoundingClientRect();
        const leftPadding = parseFloat(
          window.getComputedStyle(slider).getPropertyValue('padding-right'),
        );

        return (
          containerRect.x +
            containerRect.width -
            (lastBlockRect.x + lastBlockRect.width + leftPadding) >=
          0
        );
      };

      const updateButtonsStatus = () => {
        setLeftButtonDisabled(isFirstVisible());
        setRightButtonDisabled(isLastVisible());
      };

      updateButtonsStatus();
      setCurrentSlide(getVisibleSlidesCount() - 1);

      handleScrollEnd = () => {
        if (!sliderRef.current) {
          return;
        }

        if (isFirstVisible()) {
          setCurrentSlide(getVisibleSlidesCount() - 1);
        } else {
          const containerRect = slider.getBoundingClientRect();
          const lastSlideRect =
            slides[slides.length - 1].getBoundingClientRect();

          if (
            containerRect.x + containerRect.width - lastSlideRect.x >=
            lastSlideRect.width
          ) {
            setCurrentSlide(slides.length - 1);
          } else {
            for (let num = 0; num < slides.length; num++) {
              const currentSlideRect = slides[num].getBoundingClientRect();

              if (
                containerRect.x + containerRect.width - currentSlideRect.x <
                currentSlideRect.width
              ) {
                setCurrentSlide(--num);
                break;
              }
            }
          }
        }

        updateButtonsStatus();
      };

      slider.addEventListener('scrollend', handleScrollEnd);
    }

    return () => {
      if (slider && handleScrollEnd) {
        slider.removeEventListener('scrollend', handleScrollEnd);
      }
    };
  }, []);

  return (
    <div className={styles.catalog + ' ' + additionalStyles}>
      <div className={styles.catalog__top}>
        <h2 className={styles.catalog__title}>{title}</h2>
        <div className={styles.catalog__buttons}>
          <Icon
            onClick={scrollLeft}
            /* eslint-disable @typescript-eslint/indent */
            iconStyles={
              leftButtonDisabled
                ? {
                    icon: ['type_slider__disabled'],
                    image: ['arrowLeft', 'disabled'],
                  }
                : { icon: ['type_slider'], image: 'arrowLeft' }
            }
            /* eslint-enable @typescript-eslint/indent */
            disabled={leftButtonDisabled}
          />
          <Icon
            onClick={scrollRight}
            /* eslint-disable @typescript-eslint/indent */
            iconStyles={
              rightButtonDisabled
                ? {
                    icon: ['type_slider__disabled'],
                    image: ['arrowRight', 'disabled'],
                  }
                : { icon: ['type_slider'], image: 'arrowRight' }
            }
            disabled={rightButtonDisabled}
            /* eslint-enable @typescript-eslint/indent */
          />
        </div>
      </div>
      <div ref={sliderRef} className={styles.catalog__slider}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogSlider;
