/* eslint-disable no-console */

import styles from './HomeCatalog.module.scss';
import { Product } from '../../../types/Product';
import ProductCard from '../../shared/ProductCard';
import Icon from '../../shared/Icon';
import { useEffect, useRef, useState } from 'react';

interface Props {
  title: string;
  products: Product[];
}

const HomeCatalog: React.FC<Props> = ({ title, products }) => {
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
    const inline = currentSlide === slides.length - 1 ? 'center' : 'end';

    setCurrentSlide(slideNumber);

    slides[slideNumber].scrollIntoView({
      behavior: 'smooth',
      inline,
      block: 'nearest',
    });
  };

  const scrollLeft = () => {
    scrollTo(Math.max(0, currentSlide - getVisibleSlidesCount()));
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const slidesAmount = sliderRef.current.children.length - 1;
      const newCurrentSlide = Math.min(
        slidesAmount,
        currentSlide + getVisibleSlidesCount(),
      );

      scrollTo(newCurrentSlide);
    }
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

        return (
          containerRect.x +
            containerRect.width -
            (lastBlockRect.x + lastBlockRect.width) >=
          0
        );
      };

      const updateButtonsStatus = () => {
        setLeftButtonDisabled(isFirstVisible());
        setRightButtonDisabled(isLastVisible());
      };

      updateButtonsStatus();
      console.log('count', getVisibleSlidesCount());
      setCurrentSlide(getVisibleSlidesCount() - 1);

      handleScrollEnd = () => {
        updateButtonsStatus();
        console.log('Scrolling has ended!');
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
    <div className={styles.catalog}>
      <div className={styles.catalog__top}>
        <h2 className={styles.catalog__title}>{title}</h2>
        <div className={styles.catalog__buttons}>
          <Icon
            onClick={scrollLeft}
            iconStyles={
              leftButtonDisabled
                ? { image: ['arrowLeft', 'disabled'] }
                : { icon: 'border', image: ['arrowLeft'] }
            }
            disabled={leftButtonDisabled}
          />
          <Icon
            onClick={scrollRight}
            iconStyles={
              rightButtonDisabled
                ? { image: ['arrowRight', 'disabled'] }
                : { icon: 'border', image: ['arrowRight'] }
            }
            disabled={rightButtonDisabled}
          />
        </div>
      </div>
      <div ref={sliderRef} className={styles.catalog__slider}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={{ ...product, name: product.id + ' | ' + product.name }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCatalog;
