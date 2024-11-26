import { MainSlider } from '../../components/MainSlider/MainSlider';
import style from './HomePage.module.scss';

export const HomePage = () => (
  <div className={style.homePage}>
    <div className={style.homePage__header}>
      <h1 style={{ visibility: 'hidden' }}>Product Catalog</h1>
      <h2 className={style.homePage__title}>Welcome to Nice Gadgets store!</h2>

      <MainSlider />
    </div>
  </div>
);
