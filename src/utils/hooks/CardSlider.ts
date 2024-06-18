import { RefObject, useRef, useState } from 'react';
import { getTouchEventData } from './dom';
import { useStateRef } from './hooks';

export function getRefValue<C>(ref: RefObject<C>) {
  return ref.current as C;
}

type EventsType =
  | React.TouchEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement>;

export const CardSlider = (
  containerRef: RefObject<HTMLDivElement>,
  widthRef: RefObject<HTMLLIElement>,
  lengthImgList: number,
  MIN_SWIPE_REQUIRED: number,
  gapBetween = 0,
  defaulIndex = 0,
): [
  (e: EventsType) => void,
  () => void,
  () => void,
  number,
  number,
  (v: number) => void,
  (v: number) => void,
] => {
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [currentIndex, setCurrentIndex] = useState(defaulIndex);
  const minOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const containerWidthRef = useRef(0);

  const indicatorOnClick = (ind: number) => {
    setCurrentIndex(ind);
    setOffsetX(-((getRefValue(widthRef).offsetWidth + gapBetween) * ind));
  };

  const onTouchMove = (e: MouseEvent | TouchEvent) => {
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
  };

  const onTouchEnd = () => {
    const widthCard = getRefValue(widthRef).offsetWidth;
    const containerWidth = getRefValue(containerWidthRef);
    let newOffSetX = getRefValue(offsetXRef);
    const diff = getRefValue(currentOffsetXRef) - newOffSetX;
    const cardWidthGap = Math.floor(containerWidth / widthCard) * gapBetween;
    const cardsPerScroll = Math.floor(containerWidth / widthCard);
    const widthVisibleCards = widthCard * cardsPerScroll + cardWidthGap;

    document.body.style.overflowY = 'auto';

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
  };

  const onTouchStart = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    document.body.style.overflowY = 'hidden';
    currentOffsetXRef.current = getRefValue(offsetXRef);

    startXRef.current = getTouchEventData(event).clientX;
    containerWidthRef.current = getRefValue(containerRef).offsetWidth;

    minOffsetXRef.current =
      getRefValue(containerRef).offsetWidth -
      getRefValue(containerRef).scrollWidth;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
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

  return [
    onTouchStart,
    handleNext,
    handlePrev,
    offsetX,
    currentIndex,
    setCurrentIndex,
    indicatorOnClick,
  ];
};
