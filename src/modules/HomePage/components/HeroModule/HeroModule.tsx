import { useCallback, useEffect, useState } from 'react';
import style from './HeroModule.module.scss';
import { desktopImages, mobileImages } from '../data/images';
import { Directions, IconId } from '../../../../types/icons';
import { Icons } from '../../../../shared/ui/Icons/Icons';

export const HeroModule = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const images = isMobile ? mobileImages : desktopImages;
  const autoScroll = true;

  const showNextImg = useCallback(() => {
    setImgIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const showPrevImg = () => {
    setImgIndex(prev => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!autoScroll) {
      return;
    }

    const slideInterval = setInterval(showNextImg, 5000);

    return () => clearInterval(slideInterval);
  }, [autoScroll, showNextImg]);

  return (
    <section className={style.slider}>
      <div className={style.bannerSlider}>
        <button onClick={showPrevImg} className={style.sliderBtn}>
          <Icons id={IconId.Chevron} directions={Directions.Left} />
        </button>
        <div className={style.sliderWrapper}>
          <div
            className={style.photoWrapper}
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}
          >
            {images.map(img => (
              <a href={img.link} className={style.linkPhoto} key={img.id}>
                <img
                  src={img.url}
                  alt={img.name}
                  className={isMobile ? style.mobilePhoto : style.desktopPhoto}
                />
              </a>
            ))}
          </div>
        </div>
        <button onClick={showNextImg} className={style.sliderBtn}>
          <Icons id={IconId.Chevron} directions={Directions.Right} />
        </button>
      </div>

      <div className={style.group__dots}>
        {images.map((_, index) => (
          <a
            key={index}
            className={style.button__dots}
            onClick={e => {
              e.preventDefault();
              setImgIndex(index);
            }}
          >
            <div
              className={imgIndex === index ? style.active : style.img__dots}
            ></div>
          </a>
        ))}
      </div>
    </section>
  );
};
