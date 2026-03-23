import ProductList from '../ProductList/ProductList';
import './Catalog.scss';
import { useState, useEffect } from 'react';
import { getPhones } from '../../api';
import { Phone } from '../../types/Phone';

const Catalog = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  return (
    <div className="catalog">
      <h1 className="catalog__title">Mobile phones</h1>
      <p className="catalog__models--counter">{phones.length} models</p>
      <ProductList phones={phones} />
    </div>
  );
};

export default Catalog;
