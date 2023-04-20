import { useEffect, useState } from 'react';
import { Phone } from '../types/Phone';

export const API_URL
= 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

export const useFetch = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isErrorPhones, setIsErrorPhones] = useState(false);
  const [isPhonesLoading, seIsPhonesLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        seIsPhonesLoading(true);
        const response = await fetch(API_URL);
        const api = await response.json();

        setPhones(api);
      } catch (err) {
        setIsErrorPhones(true);
      } finally {
        seIsPhonesLoading(false);
      }
    };

    fetchData();
  }, []);

  return { phones, isErrorPhones, isPhonesLoading };
};
