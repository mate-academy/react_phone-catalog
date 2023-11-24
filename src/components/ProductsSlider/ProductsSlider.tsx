import { useEffect, useState } from 'react';
import { Phone } from '../../Types/Phone';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { client } from '../../helpers/utils/fetchData';

function getHotPriceProducts(phonesWithDiscount: Phone[], type: string) {
  const preparedPhones = [...phonesWithDiscount];

  preparedPhones.filter(phone => phone.category === type);

  preparedPhones.sort((a, b) => {
    return (b.fullPrice - b.price) - (a.fullPrice - a.price);
  });

  return preparedPhones;
}

enum Categories {
  Phones = 'phones',
}

export const ProductsSlider: React.FC = () => {
  const { phones, setPhones } = useProducts();
  const [sorted, setSorted] = useState<Phone[]>([]);

  useEffect(() => {
    setSorted(getHotPriceProducts(phones, Categories.Phones));
  }, [phones]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchPhones();

        setPhones(data);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhones]);

  return (
    <>
      <h1>Products Slider</h1>
      <p>{sorted.length}</p>
    </>
  );
};
