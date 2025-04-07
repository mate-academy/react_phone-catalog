/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styles from './HeaderSlider.module.scss';
import classNames from 'classnames';

type Props = {
  width: number;
};

export const HeaderSlider: React.FC<Props> = ({ width }) => {
  const [index, setIndex] = useState(0);
  const ImageCollectionPhone = [
    {
      src: '/img/banners/header-slider-for-phone.png',
      alt: 'iphone banner',
    },
    {
      src: '/img/banners/tablet-banner.png',
      alt: 'tablets banner',
    },
    {
      src: '/img/banners/laptop-banner.png',
      alt: 'accessories banner',
    },
  ];
  const ImageCollectionTablet = [
    {
      src: '/img/banners/big-banner.png',
      alt: 'iphone banner',
    },
    {
      src: '/img/banners/big-banner.png',
      alt: 'tablets banner',
    },
    {
      src: '/img/banners/big-banner.png',
      alt: 'accessories banner',
    },
  ];
  const ImageCollectionDesktop = [
    {
      src: '/img/banners/desktop-banner.png',
      alt: 'iphone banner',
    },
    {
      src: '/img/banners/desktop-banner.png',
      alt: 'tablets banner',
    },
    {
      src: '/img/banners/desktop-banner.png',
      alt: 'accessories banner',
    },
  ];

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

  return (
    <>
      {width < 640 && (
        <div className={`${styles.slider_container}`}>
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
        </div>
      )}
      {width >= 640 && (
        <div className={`${styles.slider_container}`}>
          <div className={`${styles.slider_img_and_buttons_container}`}>
            <button className={`${styles.slider_swipe_button_container}`}>
              <img
                src="/img/icons/main-default-arrow.svg"
                alt="arrow left"
                className={`${styles.swipe_button} ${styles.left_arrow}`}
              />
            </button>

            <div className={`${styles.slider_img_wrapper}`}>
              {width < 1200
                ? ImageCollectionTablet.map((image, id) => {
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
                  })
                : ImageCollectionDesktop.map((image, id) => {
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

            <button className={`${styles.slider_swipe_button_container}`}>
              <img
                src="/img/icons/main-default-arrow.svg"
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
                      [styles.marked]: index === idNum,
                    })}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
