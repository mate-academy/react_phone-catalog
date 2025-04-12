import { useOutletContext } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Header from '../components/Header/Header';
import Cart from '../components/Cart/Cart';
import Footer from '../components/Footer/Footer';


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
      <Suspense>
        <Header setActiveAside={setActiveAside} width={width} />
        <Cart />
        <Footer disabledIds={disabledIds} />
      </Suspense>
    </>
  );
};
