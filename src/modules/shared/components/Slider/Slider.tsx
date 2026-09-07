import styles from './Slider.module.scss';
import { useSlider } from '../../hooks/useSlider';
import { initialSliderParams } from '../../types/initialSliderParams';
import { SliderButton } from '../../../../shared/UI/Buttons/SliderButton';
import { DashesPanel } from '../../../../shared/components/DashesPanel';
import React from 'react';
import cn from 'classnames';
import { ImgDashPanel } from '../../../../shared/components/ImgDashPanel';

interface Props {
  children: React.ReactNode;
  type: 'baner' | 'product';
  loop?: boolean;
  autoplay?: { enabled: boolean; interval: number };
  draggable?: boolean;
  breakpoints: { [width: number]: number };

  showButton?: boolean;
  showDots?: boolean;
  dotsType?: 'dash' | 'img';

  dotsClassNames?: string;
  buttonsClassNames?: string;
  leftButtonClassNames?: string;
  rightButtonClassNames?: string;
}

const loopParser = (childrenArr: React.ReactNode, isLooping: boolean) => {
  const childArr = React.Children.toArray(childrenArr);

  if (!isLooping || childArr.length <= 1) {
    return childArr;
  }

  const firstItem = childArr[0];
  const lastItem = childArr[childArr.length - 1];

  const cloneFirstItem = React.isValidElement(firstItem)
    ? React.cloneElement(firstItem, { key: `${firstItem.key ?? 0}-clone-f` })
    : firstItem;
  const clonelastItem = React.isValidElement(lastItem)
    ? React.cloneElement(lastItem, { key: `${lastItem.key ?? 1}-clone-l` })
    : lastItem;

  return [clonelastItem, ...childArr, cloneFirstItem];
};

export const Slider = ({
  children,
  type,
  loop = false,
  autoplay = { enabled: false, interval: 5000 },
  draggable = false,
  breakpoints,

  showButton,
  showDots,
  dotsType = 'dash',

  dotsClassNames,
  buttonsClassNames,
  leftButtonClassNames,
  rightButtonClassNames,
}: Props) => {
  const baseItemArr = React.Children.toArray(children);
  const realCount = baseItemArr.length;

  const ItemArrLooping = loopParser(baseItemArr, loop);
  const itemLoopingCount = ItemArrLooping.length;

  const sliderParams: initialSliderParams = {
    itemsCount: itemLoopingCount,
    initialIndex: loop ? 1 : 0,
    loop,
    autoplay,
    draggable,
    breakpoints: loop ? { 1: 1 } : breakpoints,
  };

  const {
    translateX,
    currentIndex,
    slidesPerView,
    viewPortRef,
    next,
    prev,
    goTo,
    maxIndex,
    pointerDown,
    pointerMove,
    pointerUp,
    isMovingRef,
    preventClickRef,
    trackRef,
    isTransitionOnRef,
  } = useSlider(sliderParams);

  const itemWidth = `${100 / slidesPerView}%`;

  const realIndex = loop
    ? (currentIndex - 1 + realCount) % realCount
    : currentIndex;

  const handleWrapperClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (preventClickRef.current) {
      e.preventDefault();
      e.stopPropagation();

      preventClickRef.current = false;
    }
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.wrapper}
        ref={viewPortRef}
        onClickCapture={e => handleWrapperClick(e)}
        onPointerDown={e => pointerDown(e)}
        onPointerMove={e => pointerMove(e)}
        onPointerUp={e => pointerUp(e)}
        onPointerCancel={e => pointerUp(e)}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          ref={trackRef}
          className={cn(styles.track, {
            [styles.dragging]: isMovingRef.current,
          })}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitionOnRef.current
              ? 'transform 0.8s ease'
              : 'none',
          }}
        >
          {ItemArrLooping.map((item, i) => (
            <div
              key={React.isValidElement(item) ? item.key : i}
              className={cn(styles.item, {
                [styles.product]: type === 'product',
                [styles.banner]: type === 'baner',
              })}
              style={{ width: itemWidth }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {showDots && dotsType === 'dash' && (
        <div className={dotsClassNames}>
          <DashesPanel
            goTo={goTo}
            dashCount={realCount}
            activeDash={realIndex}
          />
        </div>
      )}

      {showDots && dotsType === 'img' && (
        <ImgDashPanel
          item={baseItemArr}
          onClick={goTo}
          active={realIndex}
          classNames={dotsClassNames}
        />
      )}

      {showButton && (
        <div className={buttonsClassNames}>
          <SliderButton
            className={leftButtonClassNames}
            onClick={prev}
            disabled={!loop && realIndex === 0}
            direction="left"
          />
          <SliderButton
            className={rightButtonClassNames}
            onClick={next}
            disabled={!loop && realIndex >= maxIndex}
            direction="right"
          />
        </div>
      )}
    </div>
  );
};
