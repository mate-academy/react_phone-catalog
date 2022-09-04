import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Img } from '../../types/Img';
import './Carousel.scss';

type Props = {
  imgs: Img[]
};

export const Carousel:React.FC<Props> = ({ imgs }) => {
  const containerRef = useRef<HTMLUListElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalRef = useRef<any>(null);
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  const slides = useMemo(() => {
    if (imgs.length > 1) {
      const items = imgs.map((img) => (
        <li key={img.id} className="carousel__slide">
          <img src={img.path} alt={img.desc} />
        </li>
      ));

      return [
        <li key={imgs[0].id - 1} className="carousel__slide">
          <img
            src={imgs[imgs.length - 1].path}
            alt={imgs[imgs.length - 1].desc}
          />
        </li>,
        ...items,
        <li key={imgs[imgs.length - 1].id + 1} className="carousel__slide">
          <img src={imgs[0].path} alt={imgs[0].desc} />
        </li>,
      ];
    }

    return (
      <li className="carousel__slide">
        {imgs[0]}
      </li>
    );
  }, [imgs]);

  const actionHandler = useCallback((mode: string) => {
    if (containerRef.current) {
      containerRef.current.style.transitionDuration = '400ms';

      if (mode === 'prev') {
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(imgs.length);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1));
          setCurrent((prev) => prev - 1);
        }
      } else if (mode === 'next') {
        if (current >= imgs.length) {
          setTranslateX(containerRef.current.clientWidth * (imgs.length + 1));
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent((prev) => prev + 1);
        }
      }
    }
  }, [current, imgs]);

  useEffect(() => {
    const transitionEnd = () => {
      if (containerRef.current) {
        if (current <= 1) {
          containerRef.current.style.transitionDuration = '0ms';
          setTranslateX(containerRef.current.clientWidth * current);
        }

        if (current >= imgs.length) {
          containerRef.current.style.transitionDuration = '0ms';
          setTranslateX(containerRef.current.clientWidth * imgs.length);
        }
      }
    };

    document.addEventListener('transitionend', transitionEnd);

    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current, imgs]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setTranslateX(containerRef.current.clientWidth * current);
    }
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      actionHandler('next');
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [actionHandler]);

  return (
    <div className="carousel">
      <div className="carousel__body">
        <button
          type="button"
          className="carousel__button"
          onClick={() => actionHandler('prev')}
        >
          <img src="/img/Vector (Stroke).svg" alt="Prev" />
        </button>

        <div className="carousel__wrapper">
          <ul
            ref={containerRef}
            className="carousel__container"
            style={
              { transform: `translate3d(${-translateX}px, 0, 0)` }
            }
          >
            {slides}
          </ul>
        </div>

        <button
          type="button"
          className="carousel__button"
          onClick={() => actionHandler('next')}
        >
          <img
            src="/img/Vector (Stroke).svg"
            alt="Next"
            className="carousel__mirrored"
          />
        </button>
      </div>

      <div className="carousel__info">
        {imgs.map((_, index) => (
          <div
            key={Math.random()}
            className={classNames(
              'carousel__info-tile',
              { 'carousel__active-tile': index + 1 === current },
            )}
          />
        ))}
      </div>
    </div>
  );
};
