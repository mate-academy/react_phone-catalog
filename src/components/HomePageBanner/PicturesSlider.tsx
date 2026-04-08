import { useEffect, useState } from 'react';
import './PicturesSlider.scss';

const images = [
  '/img/banner-phone.png',
  '/img/banner-ipad.png',
  '/img/banner-macbook.png',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="banner__container">
      <div className="banner__elements">
        <button
          className="banner__button banner__button--left"
          onClick={() =>
            setCurrentIndex(prevIndex => {
              if (prevIndex === 0) {
                return 2;
              }

              return prevIndex - 1;
            })
          }
        >
          &lt;
        </button>
        <div
          className="banner__news"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        >
          <div className="banner__news-container">
            <div className="banner__news-text">
              <h2 className="banner__text">
                Now available
                <br />
                in our store!👌
              </h2>
              <p className="banner__subtext">Be the first!</p>
            </div>
            <div className="banner__order">
              <button className="banner__order-button">order now</button>
            </div>
          </div>
        </div>
        <button
          className="banner__button banner__button--right"
          onClick={() =>
            setCurrentIndex(prevIndex => {
              if (prevIndex === 2) {
                return 0;
              }

              return prevIndex + 1;
            })
          }
        >
          &gt;
        </button>
      </div>
      <div className="banner__dots">
        <div
          className={`banner__dot ${currentIndex === 0 ? 'banner__dot--active' : undefined}`}
        ></div>
        <div
          className={`banner__dot ${currentIndex === 1 ? 'banner__dot--active' : undefined}`}
        ></div>
        <div
          className={`banner__dot ${currentIndex === 2 ? 'banner__dot--active' : undefined}`}
        ></div>
      </div>
    </div>
  );
};
