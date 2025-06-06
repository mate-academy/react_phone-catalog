import { bannerList } from '../../widgets/Swiper/assets/bannerList';
import { SwiperProvider } from '../../widgets/Swiper/model/SwiperContext';
import { SwiperI } from '../../widgets/Swiper/swiper';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <h1 className="welcome">Welcome to Nice Gadgets store!</h1>

      <SwiperProvider dataset={bannerList}>
        <SwiperI />
      </SwiperProvider>
    </>
  );
};
