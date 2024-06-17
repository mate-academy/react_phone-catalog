import style from './BrandNewModels.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { useContext, useRef, useState } from 'react';
import { ArrowRight } from '../../Logos/ArrowRight';
import { ArrowLeft } from '../../Logos/ArrowLeft';
import { ThemeContext } from '../../../store/ThemeProvider';
import classNames from 'classnames';
import { LogoFavorites } from '../../Logos/LogoFavorites';
import { ProductsContext } from '../../../store/ProductsProvider';
import { getRefValue, useStateRef } from '../../../utils/hooks/hooks';
import { getTouchEventData } from '../../../utils/hooks/dom';
const MIN_SWIPE_REQUIRED = 20;

export const BrandNewModels = () => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { products } = useContext(ProductsContext);
  const lengthImgList = products.length - 1;

  const containerWidthRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLLIElement>(null);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const minOffsetXRef = useRef(0);

  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const indicatorOnClick = (ind: number) => {
    setCurrentIndex(ind);
    setOffsetX(-((getRefValue(widthRef).offsetWidth + 16) * ind));
  };

  const onTouchMove = (e: MouseEvent | TouchEvent) => {
    let newOffsetX =
      getRefValue(currentOffsetXRef) -
      (getRefValue(startXRef) - getTouchEventData(e).clientX); //старт Х (getRefValue(startXRef) віднімаємо client.X там де ми закінчили клік тобто клікнули на 377 свайпнули до 30
    const maxOffsetX = 0;

    if (newOffsetX > maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX < getRefValue(minOffsetXRef)) {
      newOffsetX = getRefValue(minOffsetXRef);
    }

    setOffsetX(newOffsetX);

    // new of set X це резульати віднімання поточного зміщення на початку він 0 ПІСЛЯ першого разу він стає якраз тим резульатом зміщення а саме
    // new of set x тобто на скільки було зміщено попереднього разу наш контейнер !! НА СКІЛЬКИ ВІДБУВСЯ СРОЛЛ!!!!
    //останній if спрацьовує тоді коли ми наблизились до кінця контейнера і щоб далі не було скролу!
  };

  const onTouchEnd = () => {
    const widthCard = getRefValue(widthRef).offsetWidth;
    const containerWidth = getRefValue(containerWidthRef);

    let newOffSetX = getRefValue(offsetXRef); // на скільки відбувся новий скрол

    const diff = getRefValue(currentOffsetXRef) - newOffSetX; // це різниця яка береться з попереднього скролу currentOffsetXRef і поточного що щойно відбувся newOffSetX
    //це нам потрібно щоб зрозуміти чи свайп більший чим мінімальний 20!

    const cardWidthGap = Math.floor(containerWidth / widthCard) * 16;
    const cardsPerScroll = Math.floor(containerWidth / widthCard);
    const widthVisibleCards = widthCard * cardsPerScroll + cardWidthGap;

    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (
        diff > 0 &&
        newOffSetX > getRefValue(minOffsetXRef) - widthVisibleCards
      ) {
        newOffSetX =
          Math.floor(newOffSetX / widthVisibleCards) * widthVisibleCards;
      } else {
        newOffSetX =
          Math.ceil(newOffSetX / widthVisibleCards) * widthVisibleCards;
      }
    } else {
      newOffSetX =
        Math.round(newOffSetX / widthVisibleCards) * widthVisibleCards;
    }

    setOffsetX(newOffSetX);

    const quantityCard = Math.floor(
      getRefValue(containerRef).offsetWidth / getRefValue(widthRef).offsetWidth,
    );

    const newFormuls = (quantityCard * widthCard + cardWidthGap) / quantityCard;

    indicatorOnClick(Math.floor(Math.abs(newOffSetX / newFormuls)));

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);

    // на End ми беремо ширину картки і ширину контенера
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    currentOffsetXRef.current = getRefValue(offsetXRef); // тут ми записуємо попереднє значення на скільки було зроблено скрол минулого разу!

    startXRef.current = getTouchEventData(e).clientX; // це там де відбувся клік в якій області контейнера
    containerWidthRef.current = getRefValue(containerRef).offsetWidth;

    minOffsetXRef.current =
      getRefValue(containerRef).offsetWidth -
      getRefValue(containerRef).scrollWidth;
    // getRefValue(containerRef).scrollWidth; //scroll це виявляється довжина контейнера мого!!!!
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);

    //при кліку ми на Start записуємо попереднє зміщення X
    // Записуємо координату де ми клікнули
    // Записуємо також поточну ширину контейнера!

    //Далі ми віднімаємо ширину контейнера від довжини його скролу!
  };

  function handleNext() {
    const quantityCard = Math.floor(
      getRefValue(containerRef).offsetWidth / getRefValue(widthRef).offsetWidth,
    );
    const pureLen = lengthImgList - quantityCard;

    if (currentIndex < pureLen && currentIndex !== pureLen - 1) {
      indicatorOnClick(currentIndex + quantityCard);
    } else if (currentIndex === pureLen + 1) {
      indicatorOnClick(currentIndex - quantityCard);
    } else {
      indicatorOnClick(pureLen + 1);
    }
  }

  function handlePrev() {
    const quantityCard = Math.floor(
      getRefValue(containerRef).offsetWidth / getRefValue(widthRef).offsetWidth,
    );

    if (currentIndex > quantityCard) {
      indicatorOnClick(currentIndex - quantityCard);
    } else if (currentIndex === quantityCard) {
      indicatorOnClick(0);
    } else if (currentIndex === 0) {
      indicatorOnClick(quantityCard);
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
                  <div className={style.brandNewModels__price}>
                    <p className={style.brandNewModels__discountPrice}>
                      &#36;{product.price}
                    </p>
                    <p className={style.brandNewModels__fullPrice}>
                      &#36;{product.fullPrice}
                    </p>
                  </div>

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
