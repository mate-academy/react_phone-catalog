import { Card } from '../Card/Card';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './RecommendedItemsSlider.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';
import { Product } from '../../api/type/ProductCart';
import { useTranslation } from 'react-i18next';

type Props = {
  recommendedPhones: Product[];
};

export const RecommendedItemsSlider: React.FC<Props> = ({ recommendedPhones }) => {
  const [sliderSettings, setSliderSettings] = useState({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    variableWidth: false,
    arrows: false,
  });
  const sliderRef = useRef<Slider>(null);
  const { theme } = useContext(FavoritesContext);
  const { t } = useTranslation();

  const updateSliderSettings = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1200) {
      setSliderSettings({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        variableWidth: true,
        arrows: false,
      });
    } else {
      setSliderSettings({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        variableWidth: false,
        arrows: false,
      });
    }
  };

  useEffect(() => {
    updateSliderSettings();
    window.addEventListener('resize', updateSliderSettings);

    return () => {
      window.removeEventListener('resize', updateSliderSettings);
    };
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className={styles.newPhoneModels__container}>
      <div className={styles.newPhoneModels__header}>
        <h2
          className={classNames(styles.newPhoneModels__title, {
            [styles.dark]: theme === 'dark',
          })}
        >
          {t('recommended')}
        </h2>
        <div className={styles.newPhoneModels__buttonsWrapper}>
          <button
            className={styles.arrowLeft}
            onClick={handlePrev}
            aria-label="Previous slide"
          ></button>
          <button
            className={styles.arrowRight}
            onClick={handleNext}
            aria-label="Next slide"
          ></button>
        </div>
      </div>
      <div className={styles.newPhoneModels__bottom}>
        <Slider ref={sliderRef} {...sliderSettings}>
          {recommendedPhones.map((phone) => (
            <Card key={phone.id} product={phone} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
