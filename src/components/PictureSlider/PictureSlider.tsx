import { useEffect, useState } from 'react';
import styles from './PictureSlider.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import { PicturesSliderMap } from '../../helpers/PicturesSliderMap';

const PictureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % PicturesSliderMap.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? PicturesSliderMap.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === PicturesSliderMap.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <section className={styles.slider}>
      <button
        className={classNames(styles.button, styles.prev)}
        onClick={handlePrevClick}
      >
        <img
          src={`${BASE_URL}/icons/ArrowLeft.svg`}
          alt="Previous"
          className={styles.buttonIcon}
        />
      </button>
      <div className={styles.container}>
        {PicturesSliderMap.map(({ id, src, title }) => (
          <Link to={`/${title}`} key={id} className={styles.link}>
            <img
              src={`${BASE_URL}/${src}`}
              alt={`Slide ${title}`}
              className={styles.image}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            />
          </Link>
        ))}
      </div>
      <button
        className={classNames(styles.button, styles.next)}
        onClick={handleNextClick}
      >
        <img src={`${BASE_URL}/icons/ArrowRight.svg`} alt="Next" />
      </button>

      <div className={styles.dashes}>
        {PicturesSliderMap.map(({ id }, index) => (
          <span
            key={id}
            tabIndex={0}
            className={styles.dashContainer}
            onClick={() => setCurrentIndex(index)}
            onKeyDown={() => setCurrentIndex(index)}
          >
            <div
              className={classNames(styles.dash, {
                [styles.active]: index === currentIndex,
              })}
            />
          </span>
        ))}
      </div>
    </section>
  );
};

export default PictureSlider;
