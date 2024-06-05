import { useEffect, useState } from 'react';

import Heading from '../../UI/Heading/Heading';
import Product from '../../Types/Product';
import ProductsList from '../shared/ProductsList/ProductsList';
import { getPhones } from '../../api/getProduct';
import s from './PhonesPage.module.css';

const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  return (
    <div className={s.content}>
      <div className="container">
        <Heading className={s.title} as="h1">
          Mobile phones
        </Heading>
        <p className={s.quantity}>{phones.length} models</p>
        <ProductsList products={phones} />
      </div>
    </div>
  );
};

export default PhonesPage;
