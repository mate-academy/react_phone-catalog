import React from 'react';
import Card from '../ProductCard/ProductCard';
import './ProductList.scss';

type Props = {
  preparedPhones: Item[];
};

const ProductList: React.FC<Props> = ({ preparedPhones }) => {
  return (
    <ul className="product-list">
      {preparedPhones.map((phone) => (
        <li key={phone.id}>
          <Card phone={phone} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
