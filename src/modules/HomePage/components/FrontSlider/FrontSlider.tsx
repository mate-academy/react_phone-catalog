import { useEffect, useState } from 'react';
import styles from './FrontSlider.module.scss';
import classNames from 'classnames';
import Baner from '../Baner';

const frontSliderData = [
  {
    id: 1,
    img: '/public/img/apple-iphone-16-pro-max-512gb-desert-titanium-4.webp',
    title: 'iPhone 16 Pro',
  },
  {
    id: 2,
    img: '/public/img/iphone-16-pro-max-256-gb-black-titanium-5.png.webp',
    title: 'iPhone 16 Pro',
  },
  {
    id: 3,
    img: '/public/img/desert-titanium-1-500x500.webp',
    title: 'All for you!',
  },
];

const FrontSlider = () => {
  const [currentId, setCurrentId] = useState(1);

  const moveSlideBack = () => {
    setCurrentId(prev => (prev === 1 ? 3 : prev - 1));
  };

  const moveSlideForward = () => {
    setCurrentId(prev => (prev === 3 ? 1 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSlideForward();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentId]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        <button className={styles.slider__back} onClick={moveSlideBack}>
          <span className="icon-arrow"></span>
        </button>
        <div className={styles.slider__track}>
          {frontSliderData.map(item => (
            <div
              key={item.id}
              className={classNames(styles.slider__slide, {
                [styles.active]: item.id === currentId,
              })}
            >
              <Baner item={item} />
            </div>
          ))}
        </div>

        <button className={styles.slider__next} onClick={moveSlideForward}>
          <span className="icon-arrow"></span>
        </button>

        <div className={styles.slider__pagination}>
          {frontSliderData.map(item => (
            <button
              key={item.id}
              className={classNames(styles.slider__paginationitem, {
                [styles.slider__paginationitem_active]: item.id === currentId,
              })}
              onClick={() => setCurrentId(item.id)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontSlider;
