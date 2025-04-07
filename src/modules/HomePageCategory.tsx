import React, { useEffect } from 'react';
import { MobileCategory } from '../components/MobileCategory/MobileCategory';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

type ContextType = {
  setActiveAside: (arg: boolean) => void;
  width: number;
  disabledIds: number[];
  setWidth: (arg: number) => void;
  setDisabledIds: (arg: number[]) => void;
};

export const HomePageCategory: React.FC = () => {
  const { phoneId } = useParams();
  const { accessoryId } = useParams();
  console.log(phoneId);

  const { setActiveAside, width, disabledIds, setWidth, setDisabledIds } =
    useOutletContext<ContextType>();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setWidth]);

  return (
    <>
      <Header setActiveAside={setActiveAside} width={width} />
      {!phoneId ? (
        <MobileCategory
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
        />
      ) : (
        <Outlet context={{ disabledIds, setDisabledIds }} />
      )}
      <Footer disabledIds={disabledIds} />
    </>
  );
};
