import style from './Slider.module.scss';
import first from '../../../../image/BannerImage/first.png';
import second from '../../../../image/BannerImage/second.png';
import third from '../../../../image/BannerImage/third.jpg';
// import { useContext, useEffect } from 'react';
// import { BreakPointsContext } from '../../../../store/BreakPointsProvider';

type Props = {
  count: number;
};

export const Slider: React.FC<Props> = ({ count }) => {
  // const { isLaptop, isMobile, isDesktop } = useContext(BreakPointsContext);

  // const checkDimension = () => {
  //   if (isDesktop) {
  //     return 1040;
  //   } else if (isLaptop) {
  //     return 490;
  //   } else if (isMobile) {
  //     return 320;
  //   }

  //   return 0;
  // };

  // console.log(checkDimension());

  // useEffect(() => {
  //   checkDimension();
  // }, [isLaptop, isMobile, isDesktop, checkDimension]);

  return (
    <div className={style.slider}>
      <div
        className={style.slider__container}
        style={{ transform: `translateX( ${count * 490}px)` }}
      >
        <img src={first} alt="Banner" className={style.slider__image} />
        <img src={second} alt="Banner" className={style.slider__image} />
        <img src={third} alt="Banner" className={style.slider__image} />
      </div>
    </div>
  );
};
