/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styles from './HeaderSlider.module.scss';
import classNames from 'classnames';
import { useTheme } from '../ThemeContext/ThemeContext';
import {
  ImageCollectionDesktop,
  ImageCollectionPhone,
} from '../../utils/Banners';

type Props = {
  width: number;
};

const HeaderSlider: React.FC<Props> = ({ width }) => {
  const [index, setIndex] = useState(0);
  const [imageId, setImageId] = useState(0);
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < 2) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [index]);

  const handleSwipeLeft = (id: number) => {
    switch (id) {
      case 0:
        setImageId(2);
        break;
      default:
        setImageId(prev => prev - 1);
        break;
    }
  };

  const handleSwipeRight = (id: number) => {
    switch (id) {
      case 2:
        setImageId(0);
        break;
      default:
        setImageId(prev => prev + 1);
        break;
    }
  };

  return (
    <>
      {width < 640 && (
        <section className={`${styles.slider_container}`}>
          <div className={`${styles.slider_img_wrapper}`}>
            {ImageCollectionPhone.map((image, id) => {
              return (
                <img
                  key={id}
                  src={image.src}
                  alt={image.alt}
                  className={classNames(`${styles.slider_img}`, {
                    [styles.active]: index === id,
                  })}
                />
              );
            })}
          </div>
          <div className={`${styles.slider_button_container}`}>
            <div className={`${styles.slider_button_inner_container}`}>
              {ImageCollectionPhone.map((_, idNum) => (
                <div className={styles.slider_button_wrapper} key={idNum}>
                  <div
                    className={classNames(styles.slider_button, {
                      [styles.marked]: index === idNum,
                    })}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {width >= 640 && (
        <section className={`${styles.slider_container}`}>
          <div className={`${styles.slider_img_and_buttons_container}`}>
            <button
              className={`${styles.slider_swipe_button_container}`}
              onClick={() => handleSwipeLeft(imageId)}
            >
              <img
                src={
                  isLightTheme
                    ? './img/icons/main-default-arrow.svg'
                    : './img/icons/dark-theme-arrow.svg'
                }
                alt="arrow left"
                className={`${styles.swipe_button} ${styles.left_arrow}`}
              />
            </button>

            <div className={`${styles.slider_img_wrapper}`}>
              {ImageCollectionDesktop.map((image, id) => {
                return (
                  <img
                    key={id}
                    src={image.src}
                    alt={image.alt}
                    className={classNames(`${styles.slider_img}`, {
                      [styles.active]: imageId === id,
                    })}
                  />
                );
              })}
            </div>

            <button
              className={`${styles.slider_swipe_button_container}`}
              onClick={() => handleSwipeRight(imageId)}
            >
              <img
                src={
                  isLightTheme
                    ? './img/icons/main-default-arrow.svg'
                    : './img/icons/dark-theme-arrow.svg'
                }
                alt="arrow right"
                className={`${styles.swipe_button}`}
              />
            </button>
          </div>

          <div className={`${styles.slider_button_container}`}>
            <div className={`${styles.slider_button_inner_container}`}>
              {ImageCollectionPhone.map((_, idNum) => (
                <div className={styles.slider_button_wrapper} key={idNum}>
                  <div
                    className={classNames(styles.slider_button, {
                      [styles.marked]: imageId === idNum,
                    })}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeaderSlider;
