import { useEffect, useMemo, useRef, useState } from 'react';
import { ButtonWithErrow } from '../../../../components/UIKit/ButtonWithErrow';
import phoneSmall from '../../../../images/slider/phone.png';
import phoneBig from '../../../../images/slider/phone-1.png';
import tabletSmall from '../../../../images/slider/tablet.png';
import tabletBig from '../../../../images/slider/tablet-1.png';
import watchSmall from '../../../../images/slider/watch.png';
import watchBig from '../../../../images/slider/watch-1.png';
import { Link } from 'react-router-dom';
import { useWidth } from '../../../../hooks/useWidth';
import { MobileSwiper } from '../../../../components/MobileSwiper/MobileSwiper';
import styles from './BannerSlider.module.scss';
import classNames from 'classnames';

export const bannerSmall = [
  {
    name: 'Apple iPhone 14 Pro 128GB Space Black',
    id: 'apple-iphone-14-pro-128gb-spaceblack',
    img: phoneSmall,
  },
  {
    name: 'Accessories',
    id: 'accessories',
    img: watchSmall,
  },
  {
    name: 'Tablets',
    id: 'tablets',
    img: tabletSmall,
  },
];
export const bannerBig = [
  {
    name: 'Apple iPhone 14 Pro 128GB Space Black',
    id: 'phones/apple-iphone-14-pro-128gb-spaceblack',
    img: phoneBig,
  },
  {
    name: 'Accessories',
    id: 'accessories',
    img: watchBig,
  },
  {
    name: 'Tablets',
    id: 'tablets',
    img: tabletBig,
  },
];

export const BannerSlider = () => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const width = useWidth();
  const buttonClass = classNames(`${styles.slider__button}`, {
    button: width >= 640,
  });
  const displayedImg = useMemo(() => {
    if (width < 640) {
      return bannerSmall;
    } else {
      return bannerBig;
    }
  }, [width]);
  const timerId = useRef(0);

  //#region handle increase and decrease
  const handleIncrease = () => {
    setDisplayIndex(prevIndex => {
      if (prevIndex + 1 >= displayedImg.length) {
        return 0;
      }

      return prevIndex + 1;
    });
    window.clearInterval(timerId.current);
  };

  const handleDecrease = () => {
    setDisplayIndex(prevIndex => {
      if (prevIndex - 1 < 0) {
        return displayedImg.length - 1;
      }

      return prevIndex - 1;
    });
    window.clearInterval(timerId.current);
  };
  //#endregion

  useEffect(() => {
    window.clearInterval(timerId.current);
    timerId.current = window.setInterval(() => {
      setDisplayIndex(prevIndex => {
        if (prevIndex + 1 >= displayedImg.length) {
          return 0;
        }

        return prevIndex + 1;
      });
    }, 5000);
  }, [displayedImg]);

  const onSwipe = (diff: number) => {
    if (diff > 0) {
      handleDecrease();
    } else {
      handleIncrease();
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__middle}>
        <ButtonWithErrow className={buttonClass} onClick={handleDecrease} />

        <div className={styles.slider__container}>
          <div className={styles.slider__wrapper}>
            {displayedImg.map(banner1 => (
              <div
                className={styles.slider__img}
                key={banner1.img}
                style={
                  {
                    transition: displayIndex === 0 ? '' : 'transform 3s',
                    transform: `translateX(calc((-100% * ${displayIndex}) - 16px  * ${displayIndex})`,
                  } as React.CSSProperties
                }
              >
                <MobileSwiper onSwipe={onSwipe}>
                  <img
                    className={`${styles.slider__img} ${styles.slider__img_link} hover--scale`}
                    src={banner1.img}
                    alt={banner1.name}
                  />
                </MobileSwiper>

                <Link
                  to={`/${banner1.id}`}
                  className={`${styles.slider__button_small} link hover--scale`}
                >
                  ORDER NOW
                </Link>
              </div>
            ))}
          </div>
        </div>
        <ButtonWithErrow className={buttonClass} onClick={handleIncrease} />
      </div>
      <div className={styles.slider__bottom}>
        {displayedImg.map((_el, index) => {
          return (
            <div
              key={index}
              className={styles.rectangular}
              onClick={() => setDisplayIndex(index)}
              style={{
                backgroundColor: index === displayIndex ? '#313237' : '',
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
