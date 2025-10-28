import s from './PicturesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { slides } from '../../../../utils/variables/mainSliderSlides';
import { Swiper as SwiperType } from 'swiper/types';
import { BASE_URL } from '../../../../utils/variables/base';

export const PicturesSlider = () => {
  const location = useLocation();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [sliderReady, setSliderReady] = useState(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setSliderReady(true);
    }
  }, []);

  return (
    <section className={s.section} aria-labelledby="pictures-slider">
      <div className={s.sliderWrapper}>
        <button
          type="button"
          ref={prevRef}
          className={s.prev}
          aria-label="Previous slide"
        >
          ‹
        </button>

        {sliderReady && (
          <Swiper
            className={s.slider}
            modules={[Autoplay, Navigation]}
            onSwiper={setSwiper}
            onSlideChange={sw => setCurrent(sw.realIndex)}
            spaceBetween={0.1}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          >
            {slides.map((slide, i) => {
              const {
                promoTitle,
                promoSubtitle,
                itemURL,
                tagline,
                name,
                src,
                promoMobileButtonText,
                promoButtonText,
              } = slide;

              return (
                <SwiperSlide className={s.slide} key={i}>
                  <article className={s.promo}>
                    <div className={s.promoContent}>
                      <div className={s.promoContentTopSection}>
                        <h3 className={s.promoTitle}>{promoTitle}</h3>
                        <p className={s.promoSubtitle}>{promoSubtitle}</p>
                      </div>
                      <Link
                        to={itemURL}
                        className={s.promoButton}
                        state={{ from: location.pathname }}
                      >
                        {promoButtonText}
                      </Link>
                    </div>

                    <div className={s.promoProduct}>
                      <div className={s.productDescription}>
                        <h3 className={s.productName}>{name}</h3>
                        <span>{tagline}</span>
                      </div>

                      <Link
                        to={itemURL}
                        className={s.productLink}
                        state={{ from: location.pathname }}
                      >
                        <img
                          src={`${BASE_URL}${src}`}
                          alt={name}
                          className={s.productImg}
                        />
                      </Link>

                      <Link
                        to={itemURL}
                        className={`${s.promoButton} ${s.promoButtonMobile}`}
                        state={{ from: location.pathname }}
                      >
                        {promoMobileButtonText}
                      </Link>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        <button
          type="button"
          ref={nextRef}
          className={s.next}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className={s.dots}>
        {slides.map((_, i) => (
          <div className={s.dotWrapper} key={i}>
            <span
              className={`${s.dot} ${i === current ? s.dotActive : ''}`}
              onClick={() => swiper?.slideToLoop(i)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
