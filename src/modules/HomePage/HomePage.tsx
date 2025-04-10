import { BanerSlider } from './Components/BanerSlider';
import { Categories } from './Components/Categories';
import { HotPrices } from './Components/HotPrices';
import { NewModelsSlider } from './Components/NewModelsSlider';
import s from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={s.home}>
      <h1 className={s.title}>Product catalog!</h1>
      <BanerSlider />
      <NewModelsSlider />
      <Categories />
      <HotPrices />
    </div>
  );
};
