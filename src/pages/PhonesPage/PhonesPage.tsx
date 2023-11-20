import React, { useEffect, useState } from 'react';
import iphone from 'public/_new/img/phones/apple-iphone-11/black/00.jpg';
import { Phone } from '../../Types/Phone';

// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => response.json());
}

const getPhones = () => getData<Phone[]>('');

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPhones();

        setPhones(data);
      } catch (error) {
        // console.error('Error fetching data:', error);
        throw new Error();
      }
    };

    fetchData();
  }, []);

  // console.log(phones[0].image);

  return (
    <>
      <h1>Phones Page</h1>
      <img src={iphone} alt="ihpah" />

      {phones.map(phone => (
        <ul key={phone.id}>
          <h1>{phone.name}</h1>
          <img src={phone.image} alt={phone.name} />
          <p>url</p>
        </ul>
      ))}
    </>
  );
};
