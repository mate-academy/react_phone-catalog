import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import { getProducts } from '../../helpers/api';
import { sortProducts } from '../../helpers/sortProducts';
import Sort from '../Sort/Sort';
import './PhonesPage.scss';

type Props = { product: Product[]};

const PhonesPage: React.FC<Props> = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);

  useEffect(() => {
    getProducts()
      .then(product => setPhones(product.filter((item: Product) => item.type === 'phone')));
  }, []);

  const visiblePhones = useMemo(() => {
    return phones.filter((phone) => (
      (phone.name + phone.screen + phone.capacity).toLowerCase().includes(query.toLowerCase())
    ));
  }, [query, phones]);

  const visibleProducts = useMemo(() => {
    return sortProducts(visiblePhones, sortBy);
  }, [visiblePhones, sortBy]);

  // console.log(visibleProducts)

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
        <ProductList products={visibleProducts} />

      </div>

    </>
  );
};

export default PhonesPage;
