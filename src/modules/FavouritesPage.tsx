import React, { Suspense, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Favourites, Footer, Header } from '../utils/lazyComponents';

type ContextType = {
  setActiveAside: (arg: boolean) => void;
  width: number;
  disabledIds: number[];
  setWidth: (arg: number) => void;
};

const FavouritesPage: React.FC = () => {
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

export default FavouritesPage;
