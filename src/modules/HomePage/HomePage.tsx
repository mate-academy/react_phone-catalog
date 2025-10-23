// import { HeroSection } from './components/HeroSection';
import { NewModels } from './components/NewModels/NewModels';

import style from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <main className={style.main}>
        {/* <HeroSection /> */}
        <NewModels />
      </main>
    </>
  );
};
