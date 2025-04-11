import React, { Suspense, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
const Favourites = React.lazy(
  () => import('../components/Favourites/Favourites'),
);
const Header = React.lazy(() => import('../components/Header/Header'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));

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
      <Suspense>
        <Header setActiveAside={setActiveAside} width={width} />
        <Favourites />
        <Footer disabledIds={disabledIds} />
      </Suspense>
    </>
  );
};
