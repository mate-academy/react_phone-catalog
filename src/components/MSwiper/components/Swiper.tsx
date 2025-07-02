import { Direction } from '@shtypes/direction';
import { useMSContext } from '../context/MSContext';
import { useMSCore } from '../hooks/useMSCore';
import { SwiperButton } from './SwiperButton/SwiperButton';
import { SwiperPagination } from './SwiperPagin/SwiperPagination';
import { SwiperSlide } from './SwiperSlide/SwiperSlide';
import './Swiper.scss';

type Props = {
  btn: boolean;
  swCoeff: number;
  anSpeed: number;
  snap: boolean;
  treshold: number;
  classNames: {
    main: string;
    viewport: string;
    pagination: string;
    buttonPrev: string;
    buttonNext: string;
  };
};
export const Swiper: React.FC<Props> = ({
  btn,
  swCoeff,
  anSpeed,
  snap,
  treshold,
  classNames,
}) => {
  const { VP, track, renderList, gap } = useMSContext();
  const { handlers, setByIndex } = useMSCore({
    swCoeff,
    anSpeed,
    snap,
    treshold,
  });

  const { main, viewport, buttonPrev, buttonNext, pagination } = classNames;

  return (
    <div className={main}>
      {btn && (
        <SwiperButton
          dir={Direction.LEFT}
          className={buttonPrev}
          setByIndex={setByIndex}
        />
      )}
      <div className={viewport} ref={VP} {...handlers}>
        <ul
          className="swiper-track"
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
      <SwiperPagination className={pagination} setByIndex={setByIndex} />
      <SwiperButton
        dir={Direction.RIGHT}
        className={buttonNext}
        setByIndex={setByIndex}
      />
    </div>
  );
};
