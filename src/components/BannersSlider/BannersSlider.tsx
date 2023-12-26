import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './BannersSlider.scss';

const BANNERS = [
  {
    name: 'phones',
    url: '/phones',
    img: './img/banner-phones.png',
  },
  {
    name: 'tablets',
    url: '/tablets',
    img: './img/banner-tablets.png',
  },
  {
    name: 'accessories',
    url: '/accessories',
    img: './img/banner-accessories.png',
  },
];

export function BannersSlider() {
  const [counter, setCounter] = useState(0);
  const [width, setWidth] = useState(1040);
  const container = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (viewport.current) {
        setWidth(viewport.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setWidth(viewport.current ? viewport.current.offsetWidth : 0);
    const translation = width * counter;

    if (container.current) {
      container.current.style.transform = `translateX(-${translation}px)`;
    }
  }, [counter, width]);

  function toPrew() {
    if (counter === 0) {
      setCounter(BANNERS.length - 1);
    } else {
      setCounter(prev => prev - 1);
    }
  }

  function toNext() {
    if (counter === BANNERS.length - 1) {
      setCounter(0);
    } else {
      setCounter(prev => prev + 1);
    }
  }

  const imgStyle = {
    width,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      toNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="slider">
      <div className="slider__top">
        <button
          type="button"
          className="slider__button slider__button--prev"
          aria-label="prev"
          onClick={toPrew}
        />

        <div
          className="slider__viewport"
          ref={viewport}
        >
          <div className="slider__links" ref={container}>
            {BANNERS.map(item => (
              <Link
                className={`slider__link slider__link--${item.name}`}
                style={imgStyle}
                key={item.name}
                to={item.url}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="slider__button slider__button--next"
          aria-label="next"
          onClick={toNext}
        />
      </div>

      <div className="slider__dots">
        <button
          aria-label="dot"
          type="button"
          className={classNames(
            'slider__dot',
            { 'slider__dot--active': counter === 0 },
          )}
          onClick={() => setCounter(0)}
        />
        <button
          aria-label="dot"
          type="button"
          className={classNames(
            'slider__dot',
            { 'slider__dot--active': counter === 1 },
          )}
          onClick={() => setCounter(1)}
        />
        <button
          aria-label="dot"
          type="button"
          className={classNames(
            'slider__dot',
            { 'slider__dot--active': counter === 2 },
          )}
          onClick={() => setCounter(2)}
        />
      </div>
    </div>
  );
}
