import { HeroSection } from './components/HeroSection';
import { Category } from './components/Category/Category';
import style from './HomePage.module.scss';
import { HotPrice } from './components/HotPrice/HotPrice';
import { NewModels } from './components/NewModels/NewModels';
import { useState } from 'react';

export const HomePage = () => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <>
        <p className={style.errorMessage}>
          Oops, something went wrong. Please reload the page.
        </p>
      </>
    );
  }

  return (
    <>
      <main className="main">
        <HeroSection />
        <NewModels onSetError={setIsError} />
        <Category />
        <HotPrice />
      </main>
    </>
  );
};
