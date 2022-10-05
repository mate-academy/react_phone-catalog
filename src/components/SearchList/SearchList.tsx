import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard';

import './SearchList.scss';

type Props = {
  devices: Product[],
};

export const SearchList: React.FC<Props> = ({ devices }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  let products = devices;

  useMemo(() => {
    products = devices.filter(device => device.name
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()));
  }, [search]);

  return (
    <div className="SearchList">
      <div className="SearchList__count">
        {products.length}
        {' '}
        results
      </div>
      <div className="SearchList__list">
        {
          products
            .map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </div>
  );
};
