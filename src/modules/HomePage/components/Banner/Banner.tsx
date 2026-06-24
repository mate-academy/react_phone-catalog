import style from './Banner.module.scss';
import { SwiperBanner } from '../../../../components/BannerSwiper';

export const Banner = () => {
  return (
    <div className={style.banner}>
      <h2 className={style.banner__text}>Welcome to Nice Gadgets store!</h2>
      <SwiperBanner />
    </div>
  );
};
