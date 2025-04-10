import React, { useEffect } from 'react';
import { ProductCategory } from '../components/ProductCategory/ProductCategory';
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

type Props = {
  url: string;
};

export const HomePageCategory: React.FC<Props> = ({ url }) => {
  const { productId } = useParams();
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
      {!productId ? (
        <ProductCategory
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          url={url}
        />
      ) : (
        <Outlet context={{ disabledIds, setDisabledIds }} />
      )}
      <Footer disabledIds={disabledIds} />
    </>
  );
};
