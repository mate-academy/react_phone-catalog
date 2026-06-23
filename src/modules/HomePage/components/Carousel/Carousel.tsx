import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import style from './Carousel.module.scss';
import cn from 'classnames';
import next from '../../../../../public/img/my-icon/back.svg';
import blackPrev from '../../../../../public/img/theme-dark/arrow-right.svg';
import prev from '../../../../../public/img/my-icon/next.svg';
import blackNext from '../../../../../public/img/theme-dark/back.svg';
import { ThemeContext } from '../../../../provider/ThemeContextProvider';

export const Carousel = ({ slider }: { slider: string[] }) => {
  const { theme } = useContext(ThemeContext);
  const arrow = {
    left: theme === 'white' ? prev : blackPrev,
    right: theme === 'white' ? next : blackNext,
  };

  const newArray = useMemo(() => {
    return [slider[slider.length - 1], ...slider, slider[0]];
  }, [slider]);
  const transitionDuration = 500;

  const [transform, setTransform] = useState(-100);
  const [transition, setTransition] = useState(transitionDuration);
  const [itemActive, setItemActive] = useState(1);
  const [click, setClick] = useState(false);

  const handleRightClick = useCallback(() => {
    if (!click) {
      setClick(true);
      setTransform(currentTransform => {
        const maxTransform = -100 * (newArray.length - 1);

        return Math.max(maxTransform, currentTransform - 100);
      });

      setItemActive(currentActive => currentActive + 1);
    }

    setTimeout(() => {
      setClick(false);
    }, transitionDuration);
  }, [click, newArray.length]);

  const handleLeftClick = useCallback(() => {
    if (!click) {
      setClick(true);
      setTransform(currentTransform => Math.min(0, currentTransform + 100));
      setItemActive(currentActive => currentActive - 1);
    }

    setTimeout(() => {
      setClick(false);
    }, transitionDuration);
  }, [click]);

  useEffect(() => {
    if (transition === 0) {
      setTimeout(() => {
        setTransition(transitionDuration);
      }, 0);
    }
  }, [transition]);

  useEffect(() => {
    if (itemActive === 0) {
      setItemActive(newArray.length - 2);

      setTimeout(() => {
        setTransition(0);
        setTransform((newArray.length - 2) * -100);
      }, transitionDuration);
    }

    if (itemActive === newArray.length - 1) {
      setItemActive(1);

      setTimeout(() => {
        setTransition(0);
        setTransform(-100);
      }, transitionDuration);
    }
  }, [itemActive, newArray.length]);

  useEffect(() => {
    const intervale = setInterval(() => {
      handleRightClick();
    }, 5000);

    return () => clearInterval(intervale);
  }, [handleRightClick, handleLeftClick]);

  return (
    <div className={style.carousel}>
      <div className={style.carousel__window}>
        <div
          className={style.carousel__container}
          style={{
            transform: `translateX(${transform}%)`,
            transition: `${transition}ms`,
          }}
        >
          {newArray.map((item, i) => (
            <div key={i} className={style.carousel__item}>
              <div className={style.banner}>
                <div className={style.banner__block}>
                  <p className={style.banner__title}>
                    Now available in our store!
                  </p>
                  <p className={style.banner__text}>Be the first</p>
                </div>
                <button className={style.banner__button}>order now</button>
              </div>
              <img className={style.carousel__image} src={item} />
            </div>
          ))}
        </div>
      </div>
      <div className={style.carousel__anchors}>
        {newArray.slice(1, -1).map((__, i) => (
          <button
            key={i}
            className={cn(style.carousel__anchor, {})}
            onClick={() => {
              setItemActive(i + 1);
              setTransform((i + 1) * -100);
            }}
          >
            <div
              className={cn(style.carousel__img, {
                [style['carousel__img--active']]: itemActive === i + 1,
              })}
            ></div>
          </button>
        ))}
      </div>
      <button
        className={`${style.carousel__button} ${style['carousel__button--prev']}`}
        onClick={() => handleLeftClick()}
      >
        <img src={arrow.right} />
      </button>
      <button
        className={style.carousel__button}
        onClick={() => handleRightClick()}
      >
        <img src={arrow.left} />
      </button>
    </div>
  );
};
