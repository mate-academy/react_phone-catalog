/* eslint-disable @typescript-eslint/indent */
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { Swiper as TSwiper, SwiperModule, SwiperOptions } from 'swiper/types';
// import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

export interface SlideContent {
  id: number;
  content: React.ReactNode;
}

interface SliderProps<T extends SlideContent[]> {
  slidesContent: T;
  options: SwiperOptions;
  modules?: SwiperModule[];
  className?: string;
  classNameSlide?: string;
  onSwiper?: (swiper: TSwiper) => void;
}

export const Slider = <T extends SlideContent[]>(props: SliderProps<T>) => {
  const {
    slidesContent,
    options,
    className,
    classNameSlide,
    modules,
    onSwiper,
  } = props;

  return (
    <Swiper
      className={classNames(className)}
      modules={modules}
      {...options}
      onSwiper={onSwiper}
    >
      {slidesContent?.map(slide => (
        <SwiperSlide className={classNameSlide} key={slide?.id}>
          {slide?.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
