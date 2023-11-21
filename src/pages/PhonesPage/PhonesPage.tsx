import React, { useEffect } from 'react';
import { Phone } from '../../Types/Phone';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';

// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => response.json());
}

const getPhones = () => getData<Phone[]>('');

export const PhonesPage: React.FC = () => {
  const { phones, setPhones } = useProducts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPhones();

        setPhones(data);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhones]);

  // setTimeout(() => {
  //   console.log(phones);
  // }, 1000);

  return (
    <>
      <h1>Phones Page</h1>
      <p>{`phones arr length is: ${phones.length}`}</p>

      <ProductsSlider />

      {/* {phones.map(phone => (
        <ul key={phone.id}>
          <h1>{phone.name}</h1>
          <img src={`_new/${phone.image}`} alt={phone.name} />
          <p>url</p>
        </ul>
      ))} */}
    </>
  );
};
