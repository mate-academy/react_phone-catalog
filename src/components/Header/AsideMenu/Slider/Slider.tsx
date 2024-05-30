import style from './Slider.module.scss';
import first from '../../../../image/BannerImage/first.png';
import second from '../../../../image/BannerImage/second.png';
import third from '../../../../image/BannerImage/third.jpg';
import { useContext } from 'react';
import { BreakPointsContext } from '../../../../store/BreakPointsProvider';

type Props = {
  count: number;
};

export const Slider: React.FC<Props> = ({ count }) => {
  const { isLaptop } = useContext(BreakPointsContext);

  const dimension = isLaptop ? 490 : 1040;

  return (
    <div className={style.slider}>
      <div
        className={style.slider__container}
        style={{ transform: `translateX( -${count * dimension}px)` }}
      >
        <img src={first} alt="Banner" className={style.slider__image} />
        <img src={second} alt="Banner" className={style.slider__image} />
        <img src={third} alt="Banner" className={style.slider__image} />
      </div>
    </div>
  );
};
