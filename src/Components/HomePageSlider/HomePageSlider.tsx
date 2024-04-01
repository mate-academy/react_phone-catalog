import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../helper/ProductContext';
import './HomePageSlider.scss';

export const HomePageSlider = () => {
  const { dataImg } = useContext(ProductContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  function scrollLeft() {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? dataImg.length - 1 : prevIndex - 1,
    );
  }

  function scrollRight() {
    setCurrentIndex(prevIndex =>
      prevIndex === dataImg.length - 1 ? 0 : prevIndex + 1,
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === dataImg.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, dataImg.length]);

  return (
    <div className="homePageSlider__container">
      <div className="homePageSlider__items">
        <button className="homePageSlider__button" onClick={scrollLeft}>
          <i className={`homePageSlider__arr slider__img--right`} />
        </button>

        <div className="homePageSlider__pic-box">
          <img
            src={dataImg[currentIndex].url}
            alt=""
            className="homePageSlider__img"
          />
        </div>

        <div className="homePageSlider__button" onClick={scrollRight}>
          <i className={`homePageSlider__arr slider__img--left`} />
        </div>
      </div>

      <div className="homePageSlider__dots">
        <div
          className={cn('homePageSlider__dot', {
            'is-active': currentIndex === 0,
          })}
          onClick={() => setCurrentIndex(0)}
        />
        <div
          className={cn('homePageSlider__dot', {
            'is-active': currentIndex === 1,
          })}
          onClick={() => setCurrentIndex(1)}
        />
        <div
          className={cn('homePageSlider__dot', {
            'is-active': currentIndex === 2,
          })}
          onClick={() => setCurrentIndex(1)}
        />
      </div>
    </div>
  );
};
