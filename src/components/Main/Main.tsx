import style from './Main.module.scss';
import PicturesSlider from '../../Functional/PicturesSlider/PicturesSlider';

export const Main = () => {
  return (
    <main className={style.container}>
      <h2 className={style.title}>Welcome to Nice Gadgets store!</h2>
      <div className={style.swiperWrapper}>
        <PicturesSlider />
      </div>
    </main>
  );
};
