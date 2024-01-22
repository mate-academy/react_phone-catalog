import { useState } from 'react';
import { HomePage } from '../../pages/HomePage/HomePage';
import './Content.scss';
import { TypeCard } from '../../types/TypeCard';

export const Content = (() => {
  const [phones, setPhones] = useState<TypeCard[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://mate-academy.github.io/react_phone-catalog/_new/products.json',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setPhones(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  fetchData();

  return (
    <main className="main">
      <h1>React Phone Catalog</h1>
      <HomePage phones={phones} />
    </main>
  );
});
