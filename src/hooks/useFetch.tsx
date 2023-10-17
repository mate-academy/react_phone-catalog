import { useEffect, useState } from 'react';
import { Fetch } from '../enum/Fetch';
import { Phone } from '../types/Phone';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getPhones,
} from '../utils/fetchClient';

export const useFetch = (method: Fetch): [
  phones: Phone[],
  isLoading: boolean,
  isError: boolean,
] => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  let newPhones = null;

  useEffect(() => {
    setIsLoading(true);

    switch (method) {
      case Fetch.allProducts:
        newPhones = getPhones();
        break;

      case Fetch.hotProducts:
        newPhones = getHotPriceProducts();
        break;

      case Fetch.newProducts:
        newPhones = getBrandNewProducts();
        break;

      default:
        newPhones = getPhones();
        break;
    }

    newPhones
      .then(setPhones)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return [phones, isLoading, isError];
};
