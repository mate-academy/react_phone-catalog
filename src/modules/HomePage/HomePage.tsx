import style from './Home.Page.module.scss';
import { PicturesSlider } from './PicturesSlider';

export const HomePage = () => {
  return (
    <div className={style.homePage}>
      <h1>Product Catalog</h1>
      <h1 className={style.homePage__title}>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
    </div>
  );
};
