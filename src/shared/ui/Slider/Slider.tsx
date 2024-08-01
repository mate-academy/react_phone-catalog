import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { SwiperModule, SwiperOptions } from 'swiper/types';
import 'swiper/css';
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
  modules: SwiperModule[];
  className?: string;
  classNameSlide?: string;
}

export const Slider = <T extends SlideContent[]>(props: SliderProps<T>) => {
  const { slidesContent, options, className, classNameSlide, modules } = props;

  return (
    <Swiper className={classNames(className)} modules={modules} {...options}>
      {slidesContent?.map(slide => (
        <SwiperSlide className={classNameSlide} key={slide.id}>
          {slide.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
