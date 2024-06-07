import { useEffect, useState } from 'react';
import { Slider } from '../Slider';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getImageSrc = () => {
    if (windowWidth >= 640) {
      return `img/slider/banner-slider_1.png`;
    } else {
      return `img/slider/mobile_banner-slider_1.png`;
    }
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles['header__title-hiden']}>Product Catalog</h1>
          <h2 className={styles.header__title}>
            Welcome to Nice Gadgets store!
          </h2>
        </div>
      </div>

      <div
        className={classNames(styles.header__slider, {
          [styles.container]: windowWidth >= 640,
        })}
      >
        <Slider infinite>
          <img src={getImageSrc()} alt={`Banner image`} />
          <img src={getImageSrc()} alt={`Banner image`} />
          <img src={getImageSrc()} alt={`Banner image`} />
        </Slider>
      </div>
    </header>
  );
};
