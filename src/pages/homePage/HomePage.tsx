import { bannerList } from '../../components/MySwiperProto/Temp/bannerList';
import { MeinSwiper } from '../../components/MySwiperProto';
import { Direction } from '../../components/MySwiperProto/types/MSPtypes';
import './HomePage.scss';
import { MSwiper } from '../../components/MSwiper';

export const HomePage = () => {
  return (
    <>
      <h1 className="welcome">Welcome to Nice Gadgets store!</h1>

      <MSwiper
        dataset={bannerList}
        clamp
        buttons
        swipeCoeff={1.2}
        gap={15}
        animationSpeed={300}
        snap
        infinite
      />

      <MeinSwiper
        dataset={bannerList}
        infinite
        buttons
        pagination
        autoplay
        direction={Direction.RIGHT}
        delay={2000}
        times={3}
      />
      <MeinSwiper dataset={bannerList} buttons pagination />
    </>
  );
};
