import { useEffect, useState } from 'react';
import { getTablets } from '../services/api';
import { Tablet } from '../types/Tablet';

export const useTablets = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);

  useEffect(() => {
    getTablets().then(setTablets);
  }, []);

  return { tablets };
};
