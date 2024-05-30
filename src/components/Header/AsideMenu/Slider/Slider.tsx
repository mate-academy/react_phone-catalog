import style from './Slider.module.scss';
import first from '../../../../image/BannerImage/first.png';
import second from '../../../../image/BannerImage/second.png';
import third from '../../../../image/BannerImage/third.jpg';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  count: number;
};

export const Slider: React.FC<Props> = ({ count }) => {
  const myRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

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
      >
        <img src={first} alt="Banner" className={style.slider__image} />
        <img src={second} alt="Banner" className={style.slider__image} />
        <img src={third} alt="Banner" className={style.slider__image} />
      </div>
    </div>
  );
};
