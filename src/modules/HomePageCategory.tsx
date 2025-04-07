import React, { useEffect } from 'react';
import { MobileCategory } from '../components/MobileCategory/MobileCategory';
import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import accessories from '../../public/api/accessories.json';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';

import { Phone } from '../types/Phone';

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

  let category: Phone[];

  switch (url) {
    case 'accessories':
      category = accessories;
      break;
    case 'phones':
      category = phones;
      break;
    case 'tablets':
      category = tablets;
      break;
    default:
      category = [];
  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setWidth]);

  return (
    <>
      <Header setActiveAside={setActiveAside} width={width} />
      {!productId ? (
        <MobileCategory
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          categoryName={category}
        />
      ) : (
        <Outlet context={{ disabledIds, setDisabledIds, category }} />
      )}
      <Footer disabledIds={disabledIds} />
    </>
  );
};
