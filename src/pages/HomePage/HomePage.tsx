import { Categories } from '../../components/Categories/Categories';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import SwiperSlider from '../../components/SwiperSlider/SwiperSlider';

export const HomePage = () => {
  return (
    <main className="main">
      <div className="container">
        <SwiperSlider />
        <Categories />
        <HotPrices title={'Hot prices'} />
      </div>
    </main>
  );
};
