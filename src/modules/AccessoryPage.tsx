

import React, { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { Header } from '../components/Header/Header';

type ContextType = {
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
  setActiveAside: (arg: boolean) => void;
  width: number;
  setWidth: (arg: number) => void;
};

export const AccessoryPage: React.FC = () => {
  const { accessoryId } = useParams();
  const { disabledIds, setDisabledIds, setActiveAside, width, setWidth } = useOutletContext<ContextType>();

  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, [setWidth]);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
};