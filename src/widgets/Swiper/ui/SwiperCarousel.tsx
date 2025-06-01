import { bannerList } from '../assets/bannerList';
import { useSwiper } from '../model/useSwiperHooks';
import { SwiperElement } from './SwiperElement';

export const SwiperCarousel = () => {
  const { activeIndex, setPause, handleTouchStart, handleTouchEnd } = useSwiper(
    bannerList.length,
  );

  return (
    <div
      className="swiper"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="swiper__carousel"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          width: `${bannerList.length * 100}%`,
        }}
      >
        {bannerList.map(element => (
          <SwiperElement
            key={element.id}
            SwiperLink={element}
            lazy={element.id !== activeIndex}
          />
        ))}
      </div>
    </div>
  );
};
