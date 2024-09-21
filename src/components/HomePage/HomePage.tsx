import { useEffect, useState } from 'react';
import { HomeFace } from './Welcome/HomeFace';
import { CuteLoader } from '../loader/CuteLoader';
import { Header } from './Header/HeaderComponent';

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
