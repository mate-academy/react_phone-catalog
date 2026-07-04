// usePhones.ts

import { useEffect, useState } from 'react';
import { getPhones } from '../services/api';
import { Phone } from '../types/Phone';

export const usePhones = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  return { phones };
};
