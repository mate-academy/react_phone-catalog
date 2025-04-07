import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { HeaderSlider } from '../components/HeaderSlider/HeaderSlider';
import { Main } from '../components/Main/Main';
import { HeaderTitle } from '../components/HeaderTitle/HeaderTitle';
import { useOutletContext } from 'react-router-dom';

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
      <Header setActiveAside={setActiveAside} width={width} />
      <HeaderTitle />
      <HeaderSlider width={width} />
      <Main disabledIds={disabledIds} setDisabledIds={setDisabledIds} />
      <Footer disabledIds={disabledIds} />
    </>
  );
};
