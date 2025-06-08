import { useResize } from './model/hooks/useResize';
import { useSwiperContext } from './model/SwiperContext';
import { SwiperPagination } from './ui/SwiperPagination/SwiperPagination';
import { SwiperSlide } from './ui/SwiperSlide/SwiperSlide';
import { useSwiperCore } from './model/hooks/useSwiperCore';
import './Swiper.scss';
import { SwiperButton } from './ui/SwiperButton/SwiperButton';
import { ArrDir } from './model/types';

export const SwiperI: React.FC = () => {
  const { VPRef, trackRef, renderList } = useSwiperContext();

  const { handlers, handleByIndex } = useSwiperCore();

  useResize();

  return (
    <div className="swiper">
      <SwiperButton dir={ArrDir.Previous} className={'&__button-prev'} />
      <div className="swiper__viewport" ref={VPRef} {...handlers}>
        <ul className="swiper__track" ref={trackRef}>
          {renderList.map(el => (
            <SwiperSlide key={el.id} item={el} />
          ))}
        </ul>
      </div>
      <SwiperButton dir={ArrDir.Next} className={'&__button-next'} />
      <SwiperPagination
        className={'swiper__pagination'}
        swapper={handleByIndex}
      />
    </div>
  );
};
