import { bannerList } from '../../components/temp/bannerList';
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
    </>
  );
};
