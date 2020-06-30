import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import { getProducts } from '../../helpers/api';
import Sort from '../Sort/Sort';
import './TabletsPage.scss';
import { sortProducts } from '../../helpers/sortProducts';

type Props = { product: Product[]};

const TabletsPage: React.FC<Props> = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);

  useEffect(() => {
    getProducts()
      .then(data => setTablets(data.filter((product: Product) => product.type === 'tablet')));
  }, []);

  const visibleTablets = useMemo(() => {
    return tablets.filter((tablet) => (
      (tablet.name + tablet.screen + tablet.capacity).toLowerCase().includes(query.toLowerCase())
    ));
  }, [query, tablets]);

  const visibleProducts = useMemo(() => {
    return sortProducts(visibleTablets, sortBy);
  }, [visibleTablets, sortBy]);

  return (

    <>
      <div className="TabletsPage">
        <div className="TabletsPage__title">
          <p className="TabletsPage__name">Tablets</p>
          <span className="TabletsPage__quantity">
            {visibleTablets.length}
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

export default TabletsPage;
