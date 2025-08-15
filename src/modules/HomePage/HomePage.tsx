import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import scss from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={scss.home}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
    </div>
  );
};
