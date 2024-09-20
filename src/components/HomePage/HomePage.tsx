import { useEffect, useState } from 'react';
import { Header } from './Header/Header';
import { HomeFace } from './Welcome/HomeFace';
import { CuteLoader } from '../loader/CuteLoader';

export const HomePage = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>

      {loader ? (
        <CuteLoader />
      ) : (
        <main>
          <HomeFace />
        </main>
      )}
    </>
  );
};
