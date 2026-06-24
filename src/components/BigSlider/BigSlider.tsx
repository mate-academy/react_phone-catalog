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

function prepareSliderImages() {
  const array: string[] = [];
  const imagesPath = './img/slider/slider_';

  for (let i = 0; i < 5; i++) {
    array.push(imagesPath + i + '.png');
  }

  return array;
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
            <img src={image} alt={index.toString()} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
