//react
import React from 'react';

//styles
import styles from './Slider.module.scss';

//services
import classNames from 'classnames';

//assets
import ArrowLeft from './assets/icons/Chevron (Arrow Left).svg';
import ArrowRight from './assets/icons/Chevron (Arrow Right).svg';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Slider: React.FC<Props> = ({ children, className }) => {
  const [index, setIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const next = () => {
    if (!containerRef.current) {
      return;
    }

    if (index < React.Children.count(children) - 1) {
      setIndex(prev => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(current => current - 1);
    }
  };

  const startX = React.useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) {
      next();
    }

    if (diff < -50) {
      prev();
    }
  };

  return (
    <div className={classNames(styles.slider, className)}>
      <div className={styles.header}>
        <button onClick={prev} className={styles.button}>
          <img src={ArrowLeft} alt="ArrowLeft" />
        </button>

        <div
          className={styles.window}
          ref={containerRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={styles.items}
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {children}
          </div>
        </div>

        <button onClick={next} className={styles.button}>
          <img src={ArrowRight} alt="ArrowRight" />
        </button>
      </div>
      <div className={styles.sliderBar}>
        <button
          onClick={() => setIndex(0)}
          className={classNames({
            [styles['sliderBar--selected']]: index === 0,
          })}
        ></button>
        <button
          onClick={() => setIndex(1)}
          className={classNames({
            [styles['sliderBar--selected']]: index === 1,
          })}
        ></button>
        <button
          onClick={() => setIndex(2)}
          className={classNames({
            [styles['sliderBar--selected']]: index === 2,
          })}
        ></button>
      </div>
    </div>
  );
};
