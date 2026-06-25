import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import bigSlider from './BigSlider.module.scss';
import { useRef } from 'react';
import classNames from 'classnames';
import { Arrow } from '../Arrow';
import { ArrowDirection } from '../../shared/IconArrow';
import slider0 from '../../imgs/slider/slider_0.png';
import slider1 from '../../imgs/slider/slider_1.png';
import slider2 from '../../imgs/slider/slider_2.png';
import sliderMobile0 from '../../imgs/slider/slider_mobile_0.png';
import sliderMobile1 from '../../imgs/slider/slider_mobile_1.png';
import sliderMobile2 from '../../imgs/slider/slider_mobile_2.png';

type SliderImage = {
  desktop: string;
  mobile: string;
};

function prepareSliderImages(): SliderImage[] {
  return [
    { desktop: slider0, mobile: sliderMobile0 },
    { desktop: slider1, mobile: sliderMobile1 },
    { desktop: slider2, mobile: sliderMobile2 },
  ];
}

export const BigSlider = () => {
  const imagesPaths = prepareSliderImages();
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  return (
    <section>
      <button
        ref={prevButtonRef}
        className={classNames(bigSlider.button, bigSlider.buttonPrev)}
      >
        <Arrow direction={ArrowDirection.Left} />
      </button>
      <button
        ref={nextButtonRef}
        className={classNames(bigSlider.button, bigSlider.buttonNext)}
      >
        <Arrow direction={ArrowDirection.Right} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        effect="fade"
        className={bigSlider.bigSlider}
        onBeforeInit={swiper => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = prevButtonRef.current;

            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = nextButtonRef.current;
          }
        }}
      >
        {imagesPaths.map((image, index) => (
          <SwiperSlide key={index}>
            <picture>
              <source media="(max-width: 639px)" srcSet={image.mobile} />
              <img src={image.desktop} alt={`Slider ${index}`} />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
