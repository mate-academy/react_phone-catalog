import style from './Slider.module.scss';
import first from '../../../../image/BannerImage/first.png';
import second from '../../../../image/BannerImage/phone-bunner.jpg';
import third from '../../../../image/BannerImage/phone-third.png';
import secondPortrait from '../../../../image/BannerImage/portrain-second.jpg';
import thirdPortrait from '../../../../image/BannerImage/phone-four.webp';
import {
  // MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BreakPointsContext } from '../../../../store/BreakPointsProvider';
import { StateContext } from '../../../../store/StateProvider';

export const Slider = () => {
  const myRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useContext(BreakPointsContext);
  const { setAutoPlay, count, setCount } = useContext(StateContext);
  const [width, setWidth] = useState(0);
  const [clientX, setClientX] = useState(0);
  const [clientXEnd, setClientXEnd] = useState(0);
  // console.log(clientX);
  // console.log('clientXEnd', clientXEnd);

  const handleMouseEvent = (startX: number, endX: number) => {
    if (startX > endX && count !== 2) {
      setCount(prevCount => prevCount + 1);
      setAutoPlay(true);
      // console.log('First Condition');
    } else if (startX < endX && count !== 0) {
      setCount(prevCount => prevCount - 1);
      setAutoPlay(true);
      // console.log('Second Condition');
    }
  };

  useEffect(() => {
    handleMouseEvent(clientX, clientXEnd);
  }, [clientX, clientXEnd]);

  const handleResize = useCallback(() => {
    if (myRef.current) {
      setWidth(myRef.current.offsetWidth);
    }
  }, [myRef]);

  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef, handleResize]);

  return (
    <div className={style.slider}>
      <div
        ref={myRef}
        className={style.slider__container}
        style={{ transform: `translateX( -${count * width}px)` }}
        onMouseEnter={() => setAutoPlay(true)}
        onMouseLeave={() => setAutoPlay(false)}
        onTouchStart={e => setClientX(e.touches[0].clientX)}
        onTouchEnd={e => setClientXEnd(e.changedTouches[0].clientX)}
      >
        {!isMobile ? (
          <>
            <img src={first} alt="Banner" className={style.slider__image} />
            <img src={second} alt="Banner" className={style.slider__image} />
            <img src={third} alt="Banner" className={style.slider__image} />
          </>
        ) : (
          <>
            <img src={first} alt="Banner" className={style.slider__image} />
            <img
              src={secondPortrait}
              alt="Banner"
              className={style.slider__image}
            />
            <img
              src={thirdPortrait}
              alt="Banner"
              className={style.slider__image}
            />
          </>
        )}
      </div>
    </div>
  );
};
