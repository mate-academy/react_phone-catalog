import cn from 'classnames';

import { Link } from 'react-router-dom';
import cl from './ImgSlider.module.scss';
import { useEffect, useRef, useState } from 'react';

const dotsIds = [0, 1, 2];

export const ImgSlider: React.FC = () => {
  const [shownSlide, setShownSlide] = useState(0); // 0 | 1 | 2
  const [slideWidth, setSlideWidth] = useState(0); // w in px
  const sliderRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      setSlideWidth(sliderRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className={cl.slider}>
      <div className={cl.slider__topWrapper}>
        <button
          className={cl.arrowButton}
          onClick={() => setShownSlide(curr => (curr === 0 ? 2 : curr - 1))}
        >
          <svg className={cl.arrowButton__iconLeft} />
        </button>

        <ol className={cl.slider__list}>
          <li
            className={cl.sliderItem}
            ref={sliderRef}
            style={{
              transform: `translateX(-${shownSlide * slideWidth}px)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            <Link to={'#'} className={cl.sliderItem__text1}>
              Check brand <br /> new models!
            </Link>
            <Link
              to="#"
              className={`${cl.sliderLink} ${cl.sliderLink__1} ${cl.sliderItem__link1}`}
            />
          </li>
          <li
            className={cl.slider__item}
            style={{
              transform: `translateX(-${shownSlide * slideWidth}px)`,
              transition: 'transform 0.5s ease-in-out',
              // width: `${slideWidth}`, doesn't work
            }}
          >
            <Link to="#" className={`${cl.sliderLink} ${cl.sliderLink__2}`} />
          </li>
          <li
            className={cl.slider__item}
            style={{
              transform: `translateX(-${shownSlide * slideWidth}px)`,
              transition: 'transform 0.5s ease-in-out',
              // width: `${slideWidth}`, doesn't work
            }}
          >
            <Link to="#" className={`${cl.sliderLink} ${cl.sliderLink__3}`}>
              <Link to={'#'} className={cl.sliderLink__3__text}>
                Contact us!
              </Link>
            </Link>
          </li>
        </ol>

        <button
          className={cl.arrowButton}
          onClick={() => setShownSlide(curr => (curr === 2 ? 0 : curr + 1))}
        >
          <svg className={cl.arrowButton__iconRight} />
        </button>
      </div>

      <ol className={`${cl.slider__dots} ${cl.dots}`}>
        {dotsIds.map(dotId => (
          <li className={cl.dots__dotItem} key={dotId}>
            <button
              className={cn(cl.dots__dotButton, {
                [cl.dots__dotButtonActive]: dotId === shownSlide,
              })}
              onClick={() => setShownSlide(dotId)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};
