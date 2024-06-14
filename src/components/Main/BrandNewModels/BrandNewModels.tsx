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

  const containerWidthRef = useRef(0); //save width container
  const widthRef = useRef<HTMLLIElement>(null);
  const currentOffsetXRef = useRef(0); // save current off set X

  const startXRef = useRef(0); // initial x ref
  const minOffsetXRef = useRef(0); // -55549

  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onTouchMove = (e: MouseEvent | TouchEvent) => {
    let newOffsetX = // -946
      getRefValue(currentOffsetXRef) - //поточне зміщення наприклад 856 (тобто на скільки змістився контейнер)
      (getRefValue(startXRef) - getTouchEventData(e).clientX);
    const maxOffsetX = 0;

    if (newOffsetX > maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX < getRefValue(minOffsetXRef)) {
      newOffsetX = getRefValue(minOffsetXRef);
    }

    setOffsetX(newOffsetX);
  };

  const onTouchEnd = () => {
    const widthCard = getRefValue(widthRef).offsetWidth;
    const containerWidth = getRefValue(containerWidthRef); //container Width Actual 865
    let newOffSetX = getRefValue(offsetXRef); // -234
    const diff = getRefValue(currentOffsetXRef) - newOffSetX;
    const cardGap = Math.floor(containerWidth / widthCard) * 16;
    const card = Math.floor(containerWidth / widthCard);
    const contNew = widthCard * card + cardGap;

    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        newOffSetX = Math.floor(newOffSetX / contNew) * contNew;
      } else {
        newOffSetX = Math.ceil(newOffSetX / contNew) * contNew;
      }
    } else {
      newOffSetX = Math.round(newOffSetX / contNew) * contNew;
    }

    setOffsetX(newOffSetX);
    setCurrentIndex(Math.abs(containerWidth / widthCard));

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    currentOffsetXRef.current = getRefValue(offsetXRef); // current off set X
    startXRef.current = getTouchEventData(e).clientX; //initial x ref

    containerWidthRef.current = getRefValue(containerRef).offsetWidth; //save width container
    minOffsetXRef.current =
      getRefValue(containerRef).offsetWidth -
      getRefValue(containerRef).scrollWidth;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
  };

  const indicatorOnClick = (ind: number) => {
    setCurrentIndex(ind);
    setOffsetX(-(getRefValue(containerRef).offsetWidth * ind));
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
              <li
                className={style.brandNewModels__card}
                key={product.id}
                ref={widthRef}
              >
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
