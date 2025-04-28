import { useEffect, useState } from 'react';
import styles from './BanerSlider.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

const BanerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = [
    'img/phones/apple-iphone-11/black/00.webp',
    'img/phones/apple-iphone-11/green/00.webp',
    'img/phones/apple-iphone-11/yellow/00.webp',
  ];

  const handleClickLeft = () => {
    setCurrentIndex(prev => prev === 0 ? slider.length - 1 : prev - 1);
  };

  const handleClickRight = () => {
    setCurrentIndex(prev => prev === slider.length - 1 ? 0 : prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev === slider.length - 1 ? 0 : prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [slider.length]);

  return (
    <div className={styles.container}>
      <h1>Welcome to Nice Gadgets store!</h1>

      <div className={styles.main}>
        <button onClick={handleClickLeft}>
          <img src="/images/icons/VectorLeft.png"/>
        </button>

        <div className={styles.content}>
          <div className={styles.content__left}>
            <h2>Now available in our store!</h2>
            <h3>Be the first!</h3>
            <Link
              to={'/phones/apple-iphone-11-128gb-black'}
              className={styles.content__link}>
              <button>ORDER NOW</button>
            </Link>
          </div>
          <div className={styles.content__right}>
            <img src={slider[currentIndex]} />
          </div>
        </div>

        <button onClick={handleClickRight}>
          <img src="/images/icons/VectorRight.png" />
        </button>
      </div>

      <div className={styles.dots}>
        {slider.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(styles.dots__dot, {
              [styles.dots__activeDot]: index === currentIndex,
            })}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default BanerSlider;
