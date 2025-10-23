import { HomeCarusel } from '../HomeCarusel/HomeCarusel';
import style from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className={`${style.title} title`}>
            Welcome to Nice Gadgets store!
          </h1>
        </div>

        <div className={style.container}>
          <HomeCarusel />
        </div>
      </section>
    </>
  );
};
