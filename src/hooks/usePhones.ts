import { useEffect, useState } from 'react';
import phonesData from '../../public/api/phones.json';

export const usePhones = () => {
  const [phones, setPhones] = useState<typeof phonesData>([]);

  useEffect(() => {
    setPhones(phonesData);
  }, []);

  return phones;
};
