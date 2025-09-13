import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Gadget } from '../types/Gadget';

export const GetGadget = (): Promise<Gadget> => {
  const typeOfProducts = useMemo(() => {
    const location = useLocation();

    return location.pathname.split('/')[1];
  }, [location.pathname]);

  return fetch(`./api/${typeOfProducts}.json`).then(response => {
    return response.json();
  });
};
