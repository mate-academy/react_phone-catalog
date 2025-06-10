import { useResize } from '../hooks/useResize';
import { useSwiperContext } from '../context/MSPContext';
import { MSPPagination } from './MSPPagination/MSPPagination';
import { MSPSlide } from './MSPSlide/MSPSlide';
import './Swiper.scss';
import { MSPButton } from './MSPButton/MSPButton';
import { Autoplay, Direction } from '../types/MSPtypes';
import { useMSPCore } from '../hooks/useMSPCore';

type Props = {
  clamp: boolean;
  buttons: boolean;
  pagination: boolean;
  autoplay: Autoplay | false;
  animationSpeed: number;
  gap: number;
};
export const MSPSwiper: React.FC<Props> = ({
  clamp,
  buttons,
  pagination,
  autoplay,
  animationSpeed,
  gap,
}) => {
  const { VPRef, trackRef, renderList } = useSwiperContext();

  const { handlers, handleByIndex, buttonHandler } = useMSPCore({
    clamp,
    autoplay,
    animationSpeed,
  });

  useResize();

  return (
    <div className="swiper">
      {buttons && (
        <MSPButton
          dir={Direction.LEFT}
          className={'&__button-prev'}
          onClick={() => buttonHandler(Direction.LEFT)}
        />
      )}
      <div className="swiper__viewport" ref={VPRef} {...handlers}>
        <ul
          className="swiper__track"
          ref={trackRef}
          style={
            {
              '--gap': `${gap}px`,
              '--transition-duration': `${animationSpeed}ms`,
            } as React.CSSProperties
          }
        >
          {renderList.map(el => (
            <MSPSlide key={el.id} item={el} />
          ))}
        </ul>
      </div>
      {buttons && (
        <MSPButton
          dir={Direction.RIGHT}
          className={'&__button-next'}
          onClick={() => buttonHandler(Direction.RIGHT)}
        />
      )}
      {pagination && (
        <MSPPagination
          className={'swiper__pagination'}
          swapper={handleByIndex}
        />
      )}
    </div>
  );
};
