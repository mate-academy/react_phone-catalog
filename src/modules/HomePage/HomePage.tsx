import { Slider } from './Components/Slider';
import s from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={s.home}>
      <Slider />
    </div>
  );
};
