import { useOutletContext } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import React, { useEffect } from 'react';
const Cart = React.lazy(() => import('../components/Cart/Cart'));

type ContextType = {
  setActiveAside: (arg: boolean) => void;
  width: number;
  disabledIds: number[];
  setWidth: (arg: number) => void;
};

export const CartPage = () => {
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
      <Cart />
      <Footer disabledIds={disabledIds} />
    </>
  );
};
