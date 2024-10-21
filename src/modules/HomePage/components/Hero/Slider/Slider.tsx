import styles from './Slider.module.scss';

// import classNames from 'classnames';
import { imagesHero } from '../../../../../constants/imagesHero';
// import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';

import './SwiperLibrary.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CTAId } from '../../../../../types/CTAId';

export const Slider = () => {
  // const [activeImgIndex, setActiveImgIndex] = useState(1);
  // const [isTransitioning, setIsTransitioning] = useState(true);

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  // const imgs = [
  //   imagesHero[imagesHero.length - 1],
  //   ...imagesHero,
  //   imagesHero[0],
  // ];

  const imgs = [...imagesHero];

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setActiveImgIndex(prevIndex =>
  //       prevIndex !== imgs.length - 1 ? prevIndex + 1 : 1,
  //     );
  //   }, 3000);
  //
  //   return () => window.clearInterval(intervalId);
  // }, [activeImgIndex, imgs.length]);
  //
  // useEffect(() => {
  //   if (activeImgIndex === imgs.length - 1) {
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setActiveImgIndex(1);
  //     }, 1000);
  //
  //     setTimeout(() => {
  //       setIsTransitioning(true);
  //       setActiveImgIndex(2);
  //     }, 3000);
  //   }
  // }, [activeImgIndex, imgs.length]);
  //
  // const handleSlideCount = (index: number) => {
  //   setActiveImgIndex(index);
  //
  //   if (imagesHero.length < activeImgIndex) {
  //     setIsTransitioning(false);
  //     setActiveImgIndex(1);
  //
  //     setTimeout(() => {
  //       setIsTransitioning(true);
  //       setActiveImgIndex(index);
  //     }, 1000);
  //
  //     return;
  //   }
  //
  //   setIsTransitioning(true);
  // }

  return (
    <div className={styles.sliderContainer}>
      <div
      // className={classNames(styles.sliderImgContainer, {
      //   [styles.sliderImgContainerTransition]:
      //     imgs.length - 1 === activeImgIndex,
      // })}
      // style={{
      //   transition: isTransitioning ? 'all 1s ease-out' : 'none',
      //   transform: `translateX(${-100 * activeImgIndex}%)`,
      // }}
      >
        <div className={styles.swiperContainer}>
          <Swiper
            pagination={pagination}
            spaceBetween={10}
            modules={[Pagination, Autoplay, Navigation, Keyboard]}
            className={'mySlider'}
            keyboard={{
              enabled: true,
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {imgs.map(({ id, srcSmall, srcLarge }, i) => (
              <SwiperSlide key={id}>
                <div
                  className={classNames(styles.ctaContainer, {
                    [styles.ctaContainerRight]: id === 'Apple watch 10',
                  })}
                >
                  <p
                    className={classNames(styles.ctaText, {
                      [styles.ctaTextBlack]: id === CTAId.iphone,
                      [styles.ctaTextOrange]: id === CTAId.watch,
                    })}
                  >
                    {id === CTAId.ipad ? (
                      <span>
                        Now available
                        <br /> in our store!
                      </span>
                    ) : id === CTAId.iphone ? (
                      <span>
                        AI-opening
                        <br /> possibilities.
                      </span>
                    ) : (
                      <span>
                        New finish.
                        <br /> Never quit.
                      </span>
                    )}
                  </p>
                  <div>
                    <Link
                      to=".."
                      className={classNames(styles.ctaBtn, {
                        [styles.ctaBtnBlack]: id === CTAId.iphone,
                        [styles.ctaBtnWhite]: id === CTAId.watch,
                      })}
                    >
                      Order now
                    </Link>
                  </div>
                </div>
                <picture key={id + i}>
                  <source media="(max-width: 639px)" srcSet={srcSmall} />
                  <source media="(min-width: 640px)" srcSet={srcLarge} />
                  <img
                    src={srcSmall}
                    alt={id}
                    // className={styles.sliderImg}
                  />
                </picture>
                {/*<img*/}
                {/*  key={id + i}*/}
                {/*  src={srcSmall}*/}
                {/*  alt={id}*/}
                {/*  // className={styles.sliderImg}*/}
                {/*/>*/}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/*<button onClick={() => swiper.slideNext()}>Ola</button>*/}
      {/*<div className={styles.positionBtnContainer}>*/}
      {/*  {imagesHero.map((img, index) => (*/}
      {/*    <button*/}
      {/*      key={img.id}*/}
      {/*      id={`btn${index}`}*/}
      {/*      onClick={() => handleSlideCount(index + 1)}*/}
      {/*      className={classNames(styles.positionBtn, {*/}
      {/*        [styles.positionBtnActive]:*/}
      {/*          index + 1 === activeImgIndex*/}
      {/*      })}*/}
      {/*    ></button>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
};
