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

  const containerWidthRef = useRef(0); //save width container
  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLLIElement>(null);
  const currentOffsetXRef = useRef(0); // save current off set X
  const startXRef = useRef(0); // initial x ref
  const minOffsetXRef = useRef(0);

  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onTouchMove = (e: MouseEvent | TouchEvent) => {
    let newOffsetX = // -946
      getRefValue(currentOffsetXRef) - //поточне зміщення 856 (тобто на скільки змістився контейнер)
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

    const cardsPerSwipe = Math.floor(
      Math.abs(getRefValue(currentOffsetXRef) / widthCard),
    );

    if (getRefValue(currentOffsetXRef) === 0) {
      setCurrentIndex(Math.floor(containerWidth / widthCard));
    } else {
      setCurrentIndex(Math.abs(cardsPerSwipe));
    }

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
    setOffsetX(-((getRefValue(widthRef).offsetWidth + 16) * ind));
  };

  function handleNext() {
    const quantityCard = Math.floor(
      getRefValue(containerRef).offsetWidth / getRefValue(widthRef).offsetWidth,
    );
    const pureLen = lengthImgList - quantityCard;

    if (currentIndex < pureLen && currentIndex !== pureLen - 1) {
      indicatorOnClick(currentIndex + quantityCard);
    } else {
      indicatorOnClick(pureLen + 1);
    }
  }
  console.log(currentIndex);
  function handlePrev() {
    const quantityCard = Math.floor(
      getRefValue(containerRef).offsetWidth / getRefValue(widthRef).offsetWidth,
    );

    if (currentIndex > quantityCard) {
      indicatorOnClick(currentIndex - quantityCard);
    } else if (currentIndex === quantityCard) {
      indicatorOnClick(0);
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
          <ul className={style.brandNewModels__cardsList} draggable={false}>
            {products.map(product => (
              <li
                className={style.brandNewModels__card}
                key={product.id}
                ref={widthRef}
              >
                <a
                  href="#"
                  className={style.brandNewModels__cardLink}
                  draggable={false}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={style.brandNewModels__cardImg}
                    draggable={false}
                  />
                </a>
                <div className={style.brandNewModels__cardContent}>
                  <h2 className={style.brandNewModels__cardName}>
                    {product.name}
                  </h2>
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
