import { HeroSection } from './components/HeroSection';
import style from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <main className={style.main}>
        <div className="container">
          <HeroSection />
        </div>
      </main>
    </>
  );
};
