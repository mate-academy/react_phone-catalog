import { useEffect, useState } from 'react';
import { PhoneCard } from '../../shared/PhoneCard/PhoneCard';

import { Phone } from '../../../types/Phone';
import { getPhones } from '../../../api/phones';

export const Phones = () => {
  const [phonesList, setPhonesList] = useState<Phone[]>([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const res = await getPhones();
        setPhonesList(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    phonesList.forEach(phone => console.log(phone.images));
  }, [phonesList]);

  return (
    <>
      <p>Hello</p>
      {phonesList.length > 0 &&
        phonesList.map((phone: Phone) => {
          return <PhoneCard key={phone.id} phone={phone} />;
        })}
    </>
  );
};
