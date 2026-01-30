import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { Icon } from '../../../shared/components/Icon';
import { allPosters } from '../../../../mocks/Data/posters';
import { PicturesSliderNavigator } from './PicturesSliderNavigator';

export const PicturesSlider: React.FC = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const timerId = useRef(0);

  const goRight = useMemo(() => {
    return () => {
      setImgIndex(currentIdx => {
        if (currentIdx === allPosters[0].length - 1) {
          return 0;
        }

        return currentIdx + 1;
      });
    };
  }, []);

  function goLeft() {
    setImgIndex(currentIdx => {
      if (currentIdx === 0) {
        return allPosters[0].length - 1;
      }

      return currentIdx - 1;
    });
  }

  const swipeHandler = useSwipeable({
    onSwipedLeft: () => goLeft(),
    onSwipedRight: () => goRight(),
  });

  useEffect(() => {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      goRight();
    }, 5000);
  }, [imgIndex, timerId, goRight]);

  return (
    <section className="picturesSlider" {...swipeHandler}>
      {allPosters.map((posters, i) => {
        return (
          <div
            key={i}
            className={cn('picturesSlider__photoContainer', {
              'picturesSlider__photoContainer--mobile': i === 0,
              'picturesSlider__photoContainer--tablet': i === 1,
            })}
          >
            <img src={posters[imgIndex]} className="picturesSlider__photo" />
          </div>
        );
      })}
      <button
        onClick={goRight}
        className={cn(
          'button',
          'picturesSlider__button',
          'picturesSlider__button--right',
        )}
      >
        <Icon iconSlug="ChevronRight" />
      </button>
      <button
        onClick={goLeft}
        className={cn(
          'button',
          'picturesSlider__button',
          'picturesSlider__button--left',
        )}
      >
        <Icon iconSlug="ChevronLeft" />
      </button>

      <PicturesSliderNavigator
        amountOfItems={allPosters[0].length}
        activeIndex={imgIndex}
        onClick={setImgIndex}
      />
    </section>
  );
};
