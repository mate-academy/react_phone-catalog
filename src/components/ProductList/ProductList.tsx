import { getPhones } from '../../api';
import './ProductList.scss';
import { useEffect, useState } from 'react';
import { Phone } from '../../types/Phone';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  return (
    <div className="product__list">
      {phones.map(phone => (
        <ProductCard key={phone.id} phone={phone} />
      ))}
    </div>
  );
};

export default ProductList;
