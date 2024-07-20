/* eslint-disable */
import style from './CardsSlider.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { useContext, useRef, useState } from 'react';
import { IconRight } from '../../Icons/IconRight';
import { IconLeft } from '../../Icons/IconLeft';
import { ThemeContext } from '../../../store/ThemeProvider';
import classNames from 'classnames';
import { Product } from '../../../types/ContextType/Product';
import { useStateRef } from '../../../utils/hooks/hooks';
import { getRefValue } from '../../../utils/CardSlider';
import { getTouchEventData } from '../../../utils/hooks/dom';
import { Card } from '../../CardsContainer/Card/Card';
import { ProductsContext } from '../../../store/ProductsProvider';
import { Skeleton } from '../../Skeleton';
const MIN_SWIPE_REQUIRED = 20;

type Props = {
  products: Product[];
  title: string;
  discount?: boolean;
};

export const CardsSlider: React.FC<Props> = ({
  products,
  title,
  discount = true,
}) => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  const lengthImgList = products.length - 1;
  const containerWidthRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLDivElement>(null);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mouseTouch, setMouseTouch] = useState(false);
  const { isLoading } = useContext(ProductsContext);

  const indicatorOnClick = (ind: number) => {
    setCurrentIndex(ind);
    setOffsetX(-((getRefValue(widthRef).offsetWidth + 16) * ind));
  };

  const skeletonCartParams = Array(4).fill({ height: 400, width: 300 }, 0, 4);

  const onTouchMove = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    const startY = Math.abs(getRefValue(startYRef));
    const endY = Math.abs(getTouchEventData(e).clientY);
    const upY = startY > endY + MIN_SWIPE_REQUIRED;
    const downY = startY + MIN_SWIPE_REQUIRED < endY;

    const startX = Math.abs(getRefValue(startXRef));
    const endX = Math.abs(getTouchEventData(e).clientX);
    const leftX = startX - MIN_SWIPE_REQUIRED > endX;
    const rightX = startX + MIN_SWIPE_REQUIRED < endX;

    function preventDefault(event: { preventDefault: () => void }) {
      event.preventDefault();
    }

    if (upY || downY) {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    } else if (leftX || rightX) {
      document.body.style.overflowY = 'hidden';
      document.body.style.overflowX = 'auto';
      document.body.addEventListener('touchmove', preventDefault, {
        passive: false,
      });

      let newOffsetX =
        getRefValue(currentOffsetXRef) -
        (getRefValue(startXRef) - getTouchEventData(e).clientX);
      const maxOffsetX = 0;

      if (newOffsetX > maxOffsetX) {
        newOffsetX = 0;
      }

      if (newOffsetX < getRefValue(minOffsetXRef)) {
        newOffsetX = getRefValue(minOffsetXRef);
      }

      setOffsetX(newOffsetX);
      document.body.removeEventListener('touchmove', preventDefault);
    }
  };

  const onTouchEnd = () => {
    const widthCard = getRefValue(widthRef).offsetWidth;
    const containerWidth = getRefValue(containerWidthRef);
    let newOffSetX = getRefValue(offsetXRef);
    const diff = getRefValue(currentOffsetXRef) - newOffSetX;
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
    setMouseTouch(false);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    currentOffsetXRef.current = getRefValue(offsetXRef);
    setMouseTouch(true);
    startXRef.current = getTouchEventData(e).clientX;
    startYRef.current = getTouchEventData(e).clientY;

    containerWidthRef.current = getRefValue(containerRef).offsetWidth;

    minOffsetXRef.current =
      getRefValue(containerRef).offsetWidth -
      getRefValue(containerRef).scrollWidth;

    document.body.style.overflow = 'hidden';
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
      className={classNames(style.cardsSlider, {
        [style.cardsSlider__darkTheme]: theme,
      })}
    >
      <div className={style.cardsSlider__slider}>
        <div className={style.cardsSlider__cardHeader}>
          {isLoading ? (
            <Skeleton width={300} height={32} />
          ) : (
            <h2 className={style.cardsSlider__cardTitle}>{t(title)}</h2>
          )}

          {isLoading ? (
            <Skeleton width={80} height={32} />
          ) : (
            <div className={classNames(style.cardsSlider__cardNavBtns)}>
              <button className={style.cardsSlider__icons} onClick={handlePrev}>
                <IconLeft />
              </button>
              <button className={style.cardsSlider__icons} onClick={handleNext}>
                <IconRight />
              </button>
            </div>
          )}
        </div>

        <div
          className={style.cardsSlider__cardContainer}
          ref={containerRef}
          style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
          onTouchStart={onTouchStart}
          onTouchMove={e => onTouchMove(e)}
          onTouchEnd={onTouchEnd}
          onMouseDown={onTouchStart}
          onMouseMove={e => mouseTouch && onTouchMove(e)}
          onMouseUp={onTouchEnd}
        >
          <ul className={style.cardsSlider__cardsList} draggable={false}>
            {isLoading
              ? skeletonCartParams.map(({ height, width }, i) => (
                  <li key={i}>
                    <Skeleton
                      className={`${style.cardsSlider__cardContainer} ${style.cardsSlider__cardsList}`}
                      width={width}
                      height={height}
                    />
                  </li>
                ))
              : products.map(product => (
                  <li
                    key={product.itemId}
                    className={classNames(style.cardsSlider__container, {
                      [style.cardsSlider__darkTheme]: theme,
                    })}
                  >
                    <Card
                      product={product}
                      discount={discount}
                      widthRef={widthRef}
                    />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
