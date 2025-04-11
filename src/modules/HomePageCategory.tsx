import React, { Suspense, useEffect } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
const ProductCategory = React.lazy(
  () => import('../components/ProductCategory/ProductCategory'),
);
const Header = React.lazy(
  () => import('../components/Header/Header'),
);
const Footer = React.lazy(
  () => import('../components/Footer/Footer'),
);

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
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </>
  );
};
