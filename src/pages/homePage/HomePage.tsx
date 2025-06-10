import { bannerList } from '../../components/MySwiperProto/Temp/bannerList';
import { MeinSwiper } from '../../components/MySwiperProto';
import { Direction } from '../../components/MySwiperProto/types/MSPtypes';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <h1 className="welcome">Welcome to Nice Gadgets store!</h1>

      <MeinSwiper
        dataset={bannerList}
        infinite
        buttons
        pagination
        autoplay
        direction={Direction.RIGHT}
        delay={5000}
        times={3}
      />
      <MeinSwiper dataset={bannerList} clamp pagination gap={20} />
      <MeinSwiper dataset={bannerList} />
    </>
  );
};
