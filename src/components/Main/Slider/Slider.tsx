import style from './Slider.module.scss';
import { useCallback, useContext, useRef, useState } from 'react';
import { BreakPointsContext } from '../../../store/BreakPointsProvider';
import { StateContext } from '../../../store/StateProvider';
import { DeskTopBannerImages, MobileBannerImages } from '../../../constant';

export const Slider = () => {
  const myRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useContext(BreakPointsContext);
  const { setAutoPlay, count, setCount } = useContext(StateContext);
  const [clientX, setClientX] = useState(0);
  const [clientXEnd, setClientXEnd] = useState(0);

  const handleMouseEvent = useCallback(
    (startX: number, endX: number, currentCount: number) => {
      if (startX > endX && count !== DeskTopBannerImages.length - 1) {
        setCount(count + 1);
        setAutoPlay(false);
      } else if (startX < endX && count !== 0) {
        setCount(count - 1);
        setAutoPlay(false);
      }

      return currentCount;
    },
    [clientX],
  );

  const position = handleMouseEvent(clientX, clientXEnd, count);
  // const handleResize = useCallback(() => {
  //   if (myRef.current) {
  //     setWidth(myRef.current.offsetWidth);
  //   }
  // }, [myRef]);

  // useEffect(() => {
  //   window.addEventListener('load', handleResize);
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('load', handleResize);
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [myRef, handleResize]);

  return (
    <div className={style.slider}>
      <div
        ref={myRef}
        className={style.slider__container}
        style={{ transform: `translateX( ${-100 * position}%)` }}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        onTouchStart={e => setClientX(e.touches[0].clientX)}
        onTouchEnd={e => setClientXEnd(e.changedTouches[0].clientX)}
      >
        {!isMobile ? (
          <>
            {DeskTopBannerImages.map(item => (
              <img
                key={item.src}
                src={item.src}
                alt="Banner"
                className={style.slider__image}
              />
            ))}
          </>
        ) : (
          <>
            {MobileBannerImages.map(item => (
              <img
                key={item.src}
                src={item.src}
                alt="Banner"
                className={style.slider__image}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
