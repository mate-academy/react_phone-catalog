import React, { Suspense, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { useOutletContext } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Loader } from '../components/Loader/Loader';
const Favourites = React.lazy(
  () => import('../components/Favourites/Favourites'),
);

type ContextType = {
  setActiveAside: (arg: boolean) => void;
  width: number;
  disabledIds: number[];
  setWidth: (arg: number) => void;
};

export const FavouritesPage: React.FC = () => {
  const { setActiveAside, width, disabledIds, setWidth } =
    useOutletContext<ContextType>();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setWidth]);

  return (
    <>
      <Header setActiveAside={setActiveAside} width={width} />
      <Suspense fallback={<Loader />}>
        <Favourites />
      </Suspense>
      <Footer disabledIds={disabledIds} />
    </>
  );
};
