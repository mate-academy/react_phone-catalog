import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phones } from '../../types/Phones';
import './productList.scss';

type Props = {
  dataPhones: Phones[]
};

export const ProductList: React.FC<Props> = ({ dataPhones }) => {
  return (
    <div className="productList">
      {dataPhones.map(phone => (
        <ProductCard
          key={phone.id}
          productData={phone}
          priceToken={phone.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
