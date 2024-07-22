import bannerAcs from '../../img/HomeImgs/banner-accessories.png';
import bannerPhones from '../../img/HomeImgs/banner-phones.png';
import bannerTablets from '../../img/HomeImgs/banner-tablets.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import config from '../../utils/config';

export const Banner: React.FC = () => {
  const baseImages = [bannerAcs, bannerPhones, bannerTablets];
  const images = [
    baseImages[baseImages.length - 1],
    ...baseImages,
    baseImages[0],
  ];
  const [current, setCurrent] = useState(1);
  const [currentDot, setCurrenDot] = useState(current);
  const timer = config.transitionTime;
  const [transition, setTransition] = useState(timer);
  const [disableButtons, setDisableButtons] = useState(false);

  const handleNext = () => {
    setTransition(timer);
    setDisableButtons(true);
    setCurrent(current + 1);
    setCurrenDot(current + 1);

    setTimeout(() => {
      setDisableButtons(false);
    }, timer);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    if (current === 4) {
      setCurrenDot(1);

      setTimeout(() => {
        setCurrent(1);
        setTransition(0);
      }, timer);
    }

    if (current === 0) {
      setCurrenDot(3);

      setTimeout(() => {
        setTransition(0);
        setCurrent(3);
      }, timer);
    }
  }, [current]);

  const handlePrev = () => {
    setTransition(timer);
    setDisableButtons(true);
    setCurrent(current - 1);
    setCurrenDot(current - 1);

    setTimeout(() => {
      setDisableButtons(false);
    }, timer);
  };

  const styles = {
    transform: `translateX(-${current * 100}%)`,
    transition: `transform ${transition}ms ease-out`,
  };

  return (
    <section className="banner">
      <div className="banner__img-buttons">
        <button
          disabled={disableButtons}
          onClick={handlePrev}
          className={classNames("banner__button button-slider b-left", {
            "button-slider__disabled b-left-g": disableButtons,
          })}
        >
        </button>
        <div className="banner__carusel-container">
          <ul
            className="banner__carusel"
            style={{ width: `${100 * images.length}%` }}
          >
            {images.map((image, index) => (
              <li className="banner__img-container" style={styles} key={index}>
                <Link to={'/'}>
                  <img className="banner__img" src={image} alt="" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          disabled={disableButtons}
          onClick={handleNext}
          className={classNames("banner__button button-slider b-right", {
            "button-slider__disabled b-right-g": disableButtons,
          })}
        >
        </button>
      </div>
      <div className="button__dots">
        {baseImages.map((image, index) => (
          <button
            key={image}
            onClick={() => {
              setCurrent(index + 1);
              setCurrenDot(index + 1);
              setTransition(timer);
            }}
            className={classNames('banner__dot', {
              'is-acitve-dot': index + 1 === currentDot,
            })}
          />
        ))}
      </div>
    </section>
  );
};
