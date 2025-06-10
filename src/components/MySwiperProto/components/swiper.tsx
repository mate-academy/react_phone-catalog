import { useMSPContext } from '../context/useMSPContext';
import { MSPPagination } from './MSPPagination/MSPPagination';
import { MSPSlide } from './MSPSlide/MSPSlide';
import './Swiper.scss';
import { MSPButton } from './MSPButton/MSPButton';
import { Direction } from '../types/MSPtypes';
import { useMSPCore } from '../hooks/useMSPCore';

type Props = {
  buttons: boolean;
  pagination: boolean;
};
export const MSPSwiper: React.FC<Props> = ({ buttons, pagination }) => {
  const { VPRef, trackRef, renderList, animationSpeed, gap } = useMSPContext();

  const { handlers, handleByIndex, buttonHandler, getIndex } = useMSPCore();

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
          getIndex={getIndex}
        />
      )}
    </div>
  );
};
