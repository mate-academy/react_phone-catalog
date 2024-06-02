import style from './Slider.module.scss';
import first from '../../../../image/BannerImage/first.png';
import second from '../../../../image/BannerImage/phone-bunner.jpg';
import third from '../../../../image/BannerImage/phone-third.png';
import secondPortrait from '../../../../image/BannerImage/portrain-second.jpg';
import thirdPortrait from '../../../../image/BannerImage/phone-four.webp';
import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BreakPointsContext } from '../../../../store/BreakPointsProvider';
import { StateContext } from '../../../../store/StateProvider';

type Props = {
  count: number;
};

export const Slider: React.FC<Props> = ({ count }) => {
  const myRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useContext(BreakPointsContext);
  const { setAutoPlay } = useContext(StateContext);
  const [width, setWidth] = useState(0);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [onMouseDown, setOnMouseDown] = useState(false);
  console.log(startX);
  console.log(onMouseDown);

  const handleOnMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setOnMouseDown(true);
  };

  const handleOnMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!onMouseDown || !myRef.current) {
      return;
    }

    e.preventDefault();

    const deltaX = (e.clientX - startX) * 0.115;

    myRef.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleOnMouseUp = () => {
    setOnMouseDown(false);
  };

  const handleOnScroll = () => {
    if (myRef.current) {
      setScrollLeft(myRef.current.scrollLeft);
    }
  };

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
        style={{ transform: `translateX( -${startX}px)` }}
        onMouseEnter={() => setAutoPlay(true)}
        onMouseLeave={() => setAutoPlay(false)}
        onMouseDown={e => handleOnMouseDown(e)}
        onMouseMove={e => handleOnMouseMove(e)}
        onMouseUp={handleOnMouseUp}
        onScroll={() => {
          handleOnScroll();
        }}
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
