import React, { useContext, useEffect } from 'react';
import './ProductList.scss';
import type { Product } from '../../../../shared/types/Product';
import { CardItem } from '../../../../shared/components/CardItem';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Notification } from '../../../../shared/components/Notification';
import { StateContext } from '../../../../shared/reduce/NotificationReduce';
import { SortByAmount, SortByProp } from '../../../../shared/Enum/Sort';
import { getFilteredList } from '../../../../shared/servises/getFilteredList';

type ProductListProps = {
  products: Product[];
};

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const location = useLocation();
  const currentProduct = location.state?.productId;

  const state = useContext(StateContext); // notification

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortByProp) || SortByProp.YEAR;
  const perPage = (location.state?.perPage as SortByAmount) || SortByAmount.ALL;
  const page = (location.state?.page as string) || '1';

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let changed = false;

    if (!searchParams.get('sort')) {
      params.set('sort', SortByProp.YEAR);
      changed = true;
    }

    if (changed) {
      setSearchParams(params);
    }
  }, []);

  useEffect(() => {
    if (currentProduct) {
      const foundEl = document.getElementById(location.state?.productId);

      foundEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      return;
    }
  }, [currentProduct, location]);

  useEffect(() => {
    if (location.state?.productId) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.state?.productId, page]);

  const query = {
    sort,
    perPage,
    page,
  };

  const filteredList = getFilteredList(products, query);

  return (
    <div className="products-list">
      <Notification title={state.title} />
      {filteredList.map(product => (
        <CardItem product={product} cardSize={'normal'} key={product.id} />
      ))}
    </div>
  );
};
