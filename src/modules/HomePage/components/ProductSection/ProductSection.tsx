import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
// eslint-disable-next-line max-len
import { ProductList } from '../../../shared/components/ProductList/ProductList';
import styles from './ProductSection.module.scss';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { arrowLeftIconMap } from '../../../shared/config/arrowLeftIconMap';
import { arrowRightIconMap } from '../../../shared/config/arrowRightIconMap';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

export const ProductSection: React.FC<Props> = ({
  title,
  products,
  showDiscount = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(228);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [slidesPerClick, setSlidesPerClick] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    const updateSliderSettings = () => {
      if (window.innerWidth >= 1200) {
        setStep(288);
        setCardsPerView(4);
        setSlidesPerClick(4);
      } else if (window.innerWidth >= 640) {
        setStep(253);
        setCardsPerView(2);
        setSlidesPerClick(2);
      } else {
        setStep(228);
        setCardsPerView(1);
        setSlidesPerClick(1);
      }
    };

    updateSliderSettings();
    window.addEventListener('resize', updateSliderSettings);

    return () => window.removeEventListener('resize', updateSliderSettings);
  }, []);

  const maxIndex = Math.max(0, products.length - cardsPerView);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - slidesPerClick, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + slidesPerClick, maxIndex));
  };

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  return (
    <section className={styles.productSection}>
      <div className={styles.sectionInner}>
        <div className={styles.top}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrowLeft}
              onClick={handlePrev}
              aria-label="Previous slide"
              disabled={isPrevDisabled}
            >
              <img
                src={
                  isPrevDisabled
                    ? arrowLeftIconMap[theme].disabled
                    : arrowLeftIconMap[theme].default
                }
                alt=""
              />
            </button>

            <button
              type="button"
              className={styles.arrowRight}
              onClick={handleNext}
              aria-label="Next slide"
              disabled={isNextDisabled}
            >
              <img
                src={
                  isNextDisabled
                    ? arrowRightIconMap[theme].disabled
                    : arrowRightIconMap[theme].default
                }
                alt=""
              />
            </button>
          </div>
        </div>

        <div className={styles.sliderWrapper}>
          <ProductList
            products={products}
            currentIndex={currentIndex}
            step={step}
            showDiscount={showDiscount}
            isSlider
          />
        </div>
      </div>
    </section>
  );
};
