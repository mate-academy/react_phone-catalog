import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import { getProducts } from '../../helpers/api';
import Sort from '../Sort/Sort';
import './PhonesPage.scss';


type Props = { product: Product[]};
const PhonesPage: React.FC<Props> = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    getProducts()
      .then(data => setPhones(data.filter((product: Product) => product.type === 'phone')));
  }, []);

  const visiblePhones = useMemo(() => {
    return phones.filter((phone) => (
      (phone.name + phone.screen + phone.capacity).toLowerCase().includes(query.toLowerCase())
    ));
  }, [query, phones]);


  return (

    <>
      <div className="PhonesPage">
        <div className="PhonesPage__title">
          <p className="PhonesPage__name">Mobile Phones</p>
          <span className="PhonesPage__quantity">
            {visiblePhones.length}
            {' '}
            models
          </span>
        </div>
        <Sort />
        <ProductList products={visiblePhones} />
      </div>
    </>
  );
};

export default PhonesPage;
