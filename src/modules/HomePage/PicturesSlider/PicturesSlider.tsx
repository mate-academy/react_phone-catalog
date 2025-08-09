import React, { useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { Arrow } from '../../../components/Arrow';

export const PicturesSlider: React.FC = () => {
  const [currentPicture, setCurrentPicture] = useState(0);

  function handleArrowClick(direction: 'left' | 'right') {
    if (direction === 'left') {
      setCurrentPicture(
        currentPicture === 0
          ? 2
          : currentPicture - 1
      );
    }

    if (direction === 'right') {
      setCurrentPicture(
        currentPicture === 2
          ? 0
          : currentPicture + 1
      );
    }
  }

  return (
    <div className={styles.slider}>
      <div className={styles.carousel}>
        <div className={styles.onTablet}>
          <Arrow
            direction="left"
            height="100%"
            onClick={() => handleArrowClick('left')}
          />
        </div>
        <div className={styles.products}>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className={styles.onTablet}>
          <Arrow
            direction="right"
            height="100%"
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div className={styles.dashes}>
        <div
          onClick={() => setCurrentPicture(0)}
          className={`
            ${styles.dash} 
            ${currentPicture === 0 ? styles.activeDash : ''}
          `}
        ></div>
        <div
          onClick={() => setCurrentPicture(1)}
          className={`
            ${styles.dash} 
            ${currentPicture === 1 ? styles.activeDash : ''}`
          }
        ></div>
        <div
          onClick={() => setCurrentPicture(2)}
          className={`
            ${styles.dash} 
            ${currentPicture === 2 ? styles.activeDash : ''}
          `}
        ></div>
      </div>
    </div>
  );
};
