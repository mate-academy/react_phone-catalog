import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPhones } from '../../api/api';
import { ProductContext } from '../../ProductContext';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { Product } from '../../Type/Product';

import './ProductsList.scss';

interface Props {
  product?: Product[];
}

export const ProductsList: React.FC<Props> = ({ product }) => {
  const { phones, setPhones } = useContext(ProductContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const query = searchParams.get('query') || '';

  const sliseFrom = (+page - 1) * +perPage;
  const sliseTo = +perPage * +page;

  useEffect(() => {
    setLoading(true);

    getPhones()
      .then(setPhones)
      .finally(() => setLoading(false));
  }, [setPhones]);

  const filteredProduct = () => {
    const filteredPhones = phones;

    if (perPage !== 'all') {
      return filteredPhones.slice(sliseFrom, sliseTo);
    }

    switch (sort) {
      case 'age':
        return filteredPhones.sort((a, b) => b.year - a.year);

      case 'name':
        return filteredPhones.sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return filteredPhones.sort((a, b) => b.fullPrice - a.fullPrice);

      default:
        return filteredPhones;
    }
  };

  const filterByQuery = () => {
    const productToFilter = product ?? filteredProduct();

    if (query.trim()) {
      return productToFilter
        .filter(prod => prod.name
          .toLowerCase()
          .includes(query
            .toLowerCase()));
    }

    return productToFilter;
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="ProductsList" data-cy="productList">
      {filterByQuery().map(phone => (
        <ProductCard key={phone.id} product={phone} sale />
      ))}
    </div>
  );
};
