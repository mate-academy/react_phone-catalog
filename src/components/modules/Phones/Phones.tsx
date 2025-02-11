import { useEffect, useState } from 'react';
import { PhoneCard } from '../../shared/PhoneCard/PhoneCard';
import './Phones.style.scss';

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

  return (
    <div className='phone-catalog'>
      {phonesList.length > 0 &&
        phonesList.map((phone: Phone) => {
          return <PhoneCard key={phone.id} phone={phone} />;
        })}
    </ div>
  );
};
