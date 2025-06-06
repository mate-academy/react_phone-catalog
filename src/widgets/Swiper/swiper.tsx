import { useResize } from './model/hooks/useResize';
import { useSwiperContext } from './model/SwiperContext';
import { SwiperPagination } from './ui/SwiperPagination/SwiperPagination';
import { SwiperSlide } from './ui/SwiperSlide/SwiperSlide';
import { useSwiperCore } from './model/hooks/useSwiperCore';
import './Swiper.scss';

export const SwiperI: React.FC = () => {
  const { VPRef, trackRef } = useSwiperContext();

  const { handlers, toRender, handleByIndex } = useSwiperCore();

  useResize();

  return (
    <div className="swiper">
      <div className="swiper__viewport" ref={VPRef} {...handlers}>
        <ul className="swiper__track" ref={trackRef}>
          {toRender.map(el => (
            <SwiperSlide key={el.id} item={el} />
          ))}
        </ul>
      </div>
      <SwiperPagination
        className={'swiper__pagination'}
        swapper={handleByIndex}
      />
    </div>
  );
};
