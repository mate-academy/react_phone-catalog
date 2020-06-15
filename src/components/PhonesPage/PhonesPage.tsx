import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList/ProductList';
import { getProducts } from '../../helpers/api';
import Sort from '../Sort/Sort';


type Props = { phones: Product[]};
const PhonesPage: React.FC<Props> = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setPhones(data.filter((product: Product) => product.type === 'phone')));
  }, []);

  return (

    <>

      <div className="PhonesPage__title">
        <p className="PhonesPage__name">Mobile Phones</p>
        <span className="PhonesPage__quantity">
          {phones.length}
          {' '}
          models
        </span>
      </div>
      <Sort />
      <ProductList products={phones} />

    </>
  );
};

export default PhonesPage;
