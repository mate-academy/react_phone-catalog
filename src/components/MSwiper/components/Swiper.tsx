import { Direction } from '../../../shared/types/direction';
import { useMSContext } from '../context/MSContext';
import { useMSCore } from '../hooks/useMSCore';
import { SwiperButton } from './SwiperButton/SwiperButton';
import { SwiperPagination } from './SwiperPagin/SwiperPagination';
import { SwiperSlide } from './SwiperSlide/SwiperSlide';

type Props = {
  btn: boolean;
  swCoeff: number;
  anSpeed: number;
  snap: boolean;
  treshold: number;
};
export const Swiper: React.FC<Props> = ({
  btn,
  swCoeff,
  anSpeed,
  snap,
  treshold,
}) => {
  const { VP, track, renderList, gap } = useMSContext();
  const { handlers, setByIndex } = useMSCore({
    swCoeff,
    anSpeed,
    snap,
    treshold,
  });

  return (
    <div className="swiper">
      {btn && (
        <SwiperButton
          dir={Direction.LEFT}
          className={'&__button-prev'}
          setByIndex={setByIndex}
        />
      )}
      <div className="swiper__viewport" ref={VP} {...handlers}>
        <ul
          className="swiper__track"
          ref={track}
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
        />
      )}
    </div>
  );
};
