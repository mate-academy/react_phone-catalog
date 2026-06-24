import { useEffect, useState } from 'react';
import { getAccessories } from '../services/api';
import { Accessory } from '../types/Accessory';

export const useAccessories = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  useEffect(() => {
    getAccessories().then(setAccessories);
  }, []);

  return { accessories };
};
