import React, { Dispatch, SetStateAction, Suspense, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';

const HeaderTitle = React.lazy(
  () => import('../components/HeaderTitle/HeaderTitle'),
);
const HeaderSlider = React.lazy(
  () => import('../components/HeaderSlider/HeaderSlider'),
);
const Main = React.lazy(() => import('../components/Main/Main'));
const Header = React.lazy(() => import('../components/Header/Header'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));

type ContextType = {
  setActiveAside: (arg: boolean) => void;
  width: number;
  setWidth: (arg: number) => void;
  disabledIds: number[];
  setDisabledIds: Dispatch<SetStateAction<number[]>>;
};

export const HomePage: React.FC = () => {
  const { setActiveAside, width, setWidth, disabledIds, setDisabledIds } =
    useOutletContext<ContextType>();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setWidth]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header setActiveAside={setActiveAside} width={width} />
        <HeaderTitle />
        <HeaderSlider width={width} />
        <Main
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          width={width}
        />
        <Footer disabledIds={disabledIds} />
      </Suspense>
    </>
  );
};
