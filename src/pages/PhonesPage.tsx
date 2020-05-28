import React, { useEffect, useState } from 'react';
import PhoneCard from '../components/PhoneCard/PhoneCard';
import { getPhones } from '../helpers/api';


export const PhonesPage = () => {
  const [phones, setPhones] = useState<Products[]>([]);

  useEffect(() => {
    getPhones().then(data => {
      setPhones(data);
    });
  }, []);

  return (
    <section className="PhonePages">
      {phones.map(phone => (
        <PhoneCard key={phone.age} phone={phone} />
      ))}
    </section>
  );
};
