import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import { getFilteredProducts } from '../../helpers/utils/getFilteredProducts';
import { Product } from '../../helpers/types/Product';
import { ProductsCard } from '../ProductsCard';
import { Pagination } from '../Pagination';
import { Dropdown } from '../Dropdown';
import './ProductsList.scss';
import { Option } from '../../helpers/types/Option';
import { NoSearchResults } from '../NoSearchResults';

type Props = {
  products: Product[];
};

const sortByOptions: Option[] = [
  { name: 'age', alias: 'Newest' },
  { name: 'name', alias: 'Alphabetically' },
  { name: 'price', alias: 'Cheapest' }];

const perPageOptions: Option[] = [
  { name: 'all', alias: 'All' },
  { name: '4', alias: '4' },
  { name: '8', alias: '8' },
  { name: '16', alias: '16' },
];

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const location = useLocation();
  const pathName = location.pathname;

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '8';

  const filteredProducts = useMemo(() => {
    return getFilteredProducts(products, sort, query);
  }, [products, sort, query]);

  useEffect(() => {
    if (perPage !== 'all') {
      const fromItem = (+page - 1) * +perPage + 1;
      const toItem = Math.min(+page * +perPage, filteredProducts.length);

      setVisibleProducts(filteredProducts.slice(fromItem - 1, toItem));
    } else {
      setVisibleProducts([...filteredProducts]);
    }
  }, [filteredProducts, page, perPage]);

  const handleSortChange = (option: string) => {
    searchParams.set('sort', option);
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (option: string) => {
    searchParams.set('perPage', option);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className="ProductsList">
      {pathName !== '/favorites' && !!filteredProducts.length && (
        <div className="ProductsList__selections">
          <div className="ProductsList__select">
            <p className="ProductsList__label">Sort by</p>
            <Dropdown
              parameterOptions={sortByOptions}
              currentOptionName={sort}
              onChange={handleSortChange}
            />
          </div>

          {filteredProducts.length >= 4 && (
            <div className="ProductsList__select ProductsList__select--narrow">
              <p className="ProductsList__label">Items on page</p>
              <Dropdown
                parameterOptions={perPageOptions}
                currentOptionName={perPage}
                onChange={handlePerPageChange}
              />
            </div>
          )}
        </div>
      )}

      {!filteredProducts.length && (
        <NoSearchResults />
      )}

      <ul className="ProductsList__content" data-cy="productList">
        {visibleProducts.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </ul>

      {perPage !== 'all' && filteredProducts.length > +perPage && (
        <Pagination
          totalItems={filteredProducts.length}
          onPage={+perPage}
        />
      )}
    </div>
  );
};
