import { Carusel } from '../carusel';
import './MainPage.scss';

export const MainPage = () => {
  return (
    <div className="main-page">
      <h1 className="main-page__hello">Welcome to Nice Gadgets store!</h1>

      <Carusel />
    </div>
  );
};
