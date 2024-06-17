import { Categories } from '../../components/Categories/Categories';
import { GadgetsSlider } from '../../components/GadgetsSlider/GadgetsSlider';
import { HotPrices } from '../../components/HotPrices/HotPrices';

export const HomePage = () => {
  return (
    <main className="main">
      <div className="container">
        <GadgetsSlider />
        <Categories />
        <HotPrices title={'Hot prices'} />
      </div>
    </main>
  );
};
