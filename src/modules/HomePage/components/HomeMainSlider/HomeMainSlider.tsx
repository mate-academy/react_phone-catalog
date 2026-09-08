/* eslint-disable max-len */
import styles from './HomeMainSlider.module.scss';
// import bannerImg from '../../../../../public/img/homepage/img1__slider.png';
// import banner2Img from '../../../../../public/img/homepage/category-tablets.webp';
// import banner3Img from '../../../../../public/img/homepage/category-accessories.webp';
import banner1Img from '../../../../assets/images/homePage/banner1.png';
import banner2Img from '../../../../assets/images/homePage/banner2.png';
import banner3Img from '../../../../assets/images/homePage/banner3.png';
import banner1MobImg from '../../../../assets/images/homePage/banner1phone.png';
import banner2MobImg from '../../../../assets/images/homePage/banner2phone.png';
import banner3MobImg from '../../../../assets/images/homePage/banner3phone.png';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import HomeMainTitle from '../HomeMainTitle/HomeMainTitle';

const HomeMainSlider = () => {
  const [scroll, setScroll] = useState(0);
  const [startX, setStartX] = useState(0);
  const ref = useRef<HTMLLIElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(ref.current?.offsetWidth || 0);

    updateWidth(); // Встановлюємо ширину при першому рендері
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handlePrev = () => {
    const posibleIndex = scroll - 1;
    const newIndex = posibleIndex < 0 ? 2 : posibleIndex;

    setScroll(newIndex);
  };

  const handleNext = () => {
    const posibleIndex = scroll + 1;
    const maxIndex = 2;
    const newIndex = posibleIndex > maxIndex ? 0 : posibleIndex;

    setScroll(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX); // Визначаємо початкову точку
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endX = e.changedTouches[0].clientX; // Кінцева точка
    const deltaX = startX - endX; // Різниця для визначення напрямку

    if (deltaX > 50) {
      handleNext();
    } else if (deltaX < -50) {
      handlePrev();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => handleNext(), 5000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <section className={styles.intro}>
      <HomeMainTitle />
      <div className={styles.slider}>
        <button type="button" className={styles.arrow} onClick={handlePrev}>
          &#60;
        </button>
        <div
          className={styles.wrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ul
            className={styles.sliderList}
            style={{
              transition: `all 1500ms ease`,
              transform: `translateX(-${scroll * width}px)`,
            }}
          >
            <li className={styles.sliderItem} ref={ref}>
              <picture>
                <source media="(max-width: 649px)" srcSet={banner1MobImg} />
                <img src={banner1Img} alt="banner1" className={styles.banner} />
              </picture>
            </li>
            <li className={styles.sliderItem}>
              <picture>
                <source media="(max-width: 649px)" srcSet={banner2MobImg} />
                <img src={banner2Img} alt="banner2" className={styles.banner} />
              </picture>
            </li>
            <li className={styles.sliderItem}>
              <picture>
                <source media="(max-width: 649px)" srcSet={banner3MobImg} />
                <img src={banner3Img} alt="banner3" className={styles.banner} />
              </picture>
            </li>
          </ul>
        </div>
        <button type="button" className={styles.arrow} onClick={handleNext}>
          &#62;
        </button>
      </div>
      <div className={styles.sliderBtns}>
        {[0, 1, 2].map(el => (
          <button
            key={el}
            className={classNames(styles.sliderBtn, {
              [styles.sliderBtnActive]: scroll === el,
            })}
            onClick={() => setScroll(el)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HomeMainSlider;
