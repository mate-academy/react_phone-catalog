import { Direction } from '../../MySwiperProto/types/MSPtypes';
import { useMSContext } from '../context/MSContext';
import { useMSCore } from '../hooks/useMSCore';
import { SwiperButton } from './SwiperButton/SwiperButton';
import { SwiperPagination } from './SwiperPagin/SwiperPagination';
import { SwiperSlide } from './SwiperSlide/SwiperSlide';

type Props = {
  btn: boolean;
  clmp: boolean;
  swCoeff: number;
  gap: number;
  anSpeed: number;
  snap: boolean;
};
export const Swiper: React.FC<Props> = ({
  btn,
  clmp,
  swCoeff,
  gap,
  anSpeed,
  snap,
}) => {
  const { VPRef, trackRef, renderList } = useMSContext();
  const { handlers, setByIndex } = useMSCore({
    clmp,
    swCoeff,
    gap,
    anSpeed,
    snap,
  });

  return (
    <div className="swiper">
      {btn && (
        <SwiperButton
          dir={Direction.LEFT}
          className={'&__button-prev'}
          setByIndex={setByIndex}
          clmp={clmp}
        />
      )}
      <div className="swiper__viewport" ref={VPRef} {...handlers}>
        <ul
          className="swiper__track"
          ref={trackRef}
          style={
            {
              '--gap': `${gap}px`,
              '--transition-duration': `${anSpeed}ms`,
            } as React.CSSProperties
          }
        >
          {renderList.map(el => (
            <SwiperSlide key={el.id} item={el} />
          ))}
        </ul>
      </div>
      <SwiperPagination
        className={'swiper__pagination'}
        setByIndex={setByIndex}
      />
      {btn && (
        <SwiperButton
          dir={Direction.RIGHT}
          className={'&__button-next'}
          setByIndex={setByIndex}
          clmp={clmp}
        />
      )}
    </div>
  );
};
