import { PicturesSlider } from './components/PicturesSlider';
import s from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <div className={s.container}>
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <div className={s.sliderWrapper}>
        <PicturesSlider />
      </div>
    </>
  );
};
