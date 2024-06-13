import style from './BrandNewModels.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { useContext, useRef, useState } from 'react';
import { ArrowRight } from '../../Logos/ArrowRight';
import { ArrowLeft } from '../../Logos/ArrowLeft';
import { ThemeContext } from '../../../store/ThemeProvider';
import classNames from 'classnames';
import { LogoFavorites } from '../../Logos/LogoFavorites';
import { PhoneContext } from '../../../store/PhoneProvider';
import { getRefValue, useStateRef } from '../../../utils/hooks/hooks';
import { getTouchEventData } from '../../../utils/hooks/dom';
const MIN_SWIPE_REQUIRED = 20;

export const BrandNewModels = () => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { products } = useContext(PhoneContext);
  const lengthImgList = products.length - 1;
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);

  const onTouchMove = (e: MouseEvent | TouchEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onTouchEnd = () => {
    const containerWidth = getRefValue(containerWidthRef);
    const currentOffsetX = getRefValue(currentOffsetXRef);
    let newOffSetX = getRefValue(offsetXRef);

    const diff = currentOffsetX - newOffSetX;

    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        newOffSetX = Math.floor(newOffSetX / containerWidth) * containerWidth;
      } else {
        newOffSetX = Math.ceil(newOffSetX / containerWidth) * containerWidth;
      }
    } else {
      newOffSetX = Math.round(newOffSetX / containerWidth) * containerWidth;
    }

    setOffsetX(newOffSetX);
    setCurrentIndex(Math.abs(newOffSetX / containerWidth));

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    currentOffsetXRef.current = getRefValue(offsetXRef);

    startXRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    containerWidthRef.current = containerWidth;
    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
  };

  const indicatorOnClick = (ind: number) => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    setCurrentIndex(ind);
    setOffsetX(-(containerWidth * ind));
  };

  function handleNext() {
    if (currentIndex < lengthImgList) {
      indicatorOnClick(currentIndex + 1);
    } else if (currentIndex === lengthImgList) {
      indicatorOnClick(0);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      indicatorOnClick(currentIndex - 1);
    } else if (currentIndex === 0) {
      indicatorOnClick(2);
    }
  }

  return (
    <section
      className={classNames(style.brandNewModels, {
        [style.brandNewModels__darkTheme]: theme,
      })}
    >
      <div className={style.brandNewModels__slider}>
        <div className={style.brandNewModels__cardHeader}>
          <h2 className={style.brandNewModels__cardTitle}>{t('newModels')}</h2>
          <div className={classNames(style.brandNewModels__cardNavBtns)}>
            <button
              className={style.brandNewModels__icons}
              onClick={handlePrev}
            >
              <ArrowLeft />
            </button>
            <button
              className={style.brandNewModels__icons}
              onClick={handleNext}
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          className={style.brandNewModels__cardContainer}
          ref={containerRef}
          style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
          onTouchStart={onTouchStart}
          onMouseDown={onTouchStart}
        >
          <ul className={style.brandNewModels__cardsList}>
            {products.map(product => (
              <li className={style.brandNewModels__card} key={product.id}>
                <a href="#" className={style.brandNewModels__cardLink}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={style.brandNewModels__cardImg}
                  />
                </a>
                <div className={style.brandNewModels__cardContent}>
                  <div className={style.brandNewModels__containerCardName}>
                    <h2 className={style.brandNewModels__cardName}>
                      {product.name}
                    </h2>
                  </div>

                  <p className={style.brandNewModels__phonePrice}>
                    &#36;{product.price}
                  </p>
                  <span className={style.brandNewModels__cardLine} />

                  <div className={style.brandNewModels__cardDescription}>
                    <p className={style.brandNewModels__key}>{t('screen')}</p>
                    <p className={style.brandNewModels__value}>
                      {product.screen}
                    </p>
                  </div>
                  <div className={style.brandNewModels__cardDescription}>
                    <p className={style.brandNewModels__key}>{t('capacity')}</p>
                    <p className={style.brandNewModels__value}>
                      {product.capacity}
                    </p>
                  </div>
                  <div className={style.brandNewModels__cardDescription}>
                    <p className={style.brandNewModels__key}>{t('ram')}</p>
                    <p className={style.brandNewModels__value}>{product.ram}</p>
                  </div>
                </div>

                <div className={style.brandNewModels__cardActions}>
                  <button className={style.brandNewModels__addToCard}>
                    {t('addToCart')}
                  </button>
                  <button className={style.brandNewModels__CardfavBtn}>
                    <LogoFavorites />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
