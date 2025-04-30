import React from 'react';
import { useSearchParams } from 'react-router-dom';

import './ProductPgageList.scss';
import { DropDownMenu } from '../DropDownMenu';
import { ListOfProducts } from '../ListOfProducts';
import { Product } from '../../types/Product';

type SortBy = 'Newest' | 'Low to High' | 'High to Low';
type ItemsOnPage = '16' | '20' | '24';

type Props = {
  products: Product[];
};

export const ProductPgageList: React.FC<Props> = ({ products }) => {
  const sortByOptions: SortBy[] = ['Newest', 'Low to High', 'High to Low'];
  const itemsOnPageOptions: ItemsOnPage[] = ['16', '20', '24'];

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortBy) || 'Newest';
  const items = (searchParams.get('items') as ItemsOnPage) || '16';

  const handleChangeItemsPage = (value: ItemsOnPage) => {
    const params = new URLSearchParams(searchParams);

    params.set('items', value);
    setSearchParams(params);
  };

  const handleFilterProducts = (value: SortBy) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  return (
    <div className="product-page-list">
      <p className="product-page-list__models">
        {`${products ? products.length : 0} models`}
      </p>
      <div className="product-page-list__filters">
        <div className="filters__sort-by">
          <p className="sort-by__title">Sort by</p>
          <div className="sort-by__dropdown">
            <DropDownMenu
              options={sortByOptions}
              selected={sortBy}
              handleChange={handleFilterProducts}
            />
          </div>
        </div>

        <div className="filters__items-on-page">
          <p className="items-on-page__title">Items on page</p>
          <div className="items-on-page__dropdown">
            <DropDownMenu
              options={itemsOnPageOptions}
              selected={items}
              handleChange={handleChangeItemsPage}
            />
          </div>
        </div>
      </div>
      <div className="product-page-list__products-list">
        <ListOfProducts products={products} itemsPerPage={items} />
      </div>
    </div>
  );
};
