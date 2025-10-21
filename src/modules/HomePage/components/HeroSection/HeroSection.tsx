import { Carusel } from '../Carusel/Carusel';
import style from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <>
      <div className="container">
        <h1 className={`${style.title} title`}>
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <Carusel />
    </>
  );
};
