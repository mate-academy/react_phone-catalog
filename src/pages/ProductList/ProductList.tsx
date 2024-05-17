import { useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { SortByItem } from '../../helpers/sortBy';
import './ProductList.scss';
import React from 'react';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import { PhoneTablAccessCard } from '../../components/PhoneTablAccessCard/PhoneTablAccessCard';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';

interface Props {
  productItems: TabAccessPhone[];
}

export const ProductList: React.FC<Props> = ({ productItems }) => {
  const { loading } = useAppSelector(state => state.products);

  const [sortBy] = useState<string>();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? productItems.length : perPage;
  const firstItemIndex = (+currentPage - 1) * +itemsPerPage;
  const lastItemIndex = Math.min(
    +currentPage * +itemsPerPage,
    productItems.length,
  );

  function filteredProducts(items: TabAccessPhone[]) {
    switch (sortBy) {
      // case SortByItem.Age:
      //   return items?.sort((a, b) => (a.year - b.year ? 1 : -1));
      case SortByItem.Name:
        return items?.sort((a, b) => a.name.localeCompare(b.name));
      case SortByItem.Price:
        return items?.sort((a, b) => a.priceRegular - b.priceDiscount);
      default:
        return items;
    }
  }

  const filtered = filteredProducts(productItems).slice(
    firstItemIndex,
    lastItemIndex,
  );

  const showPagination = filtered.length < productItems.length;

  return (
    <>
      <ul className="productsPage__list">
        {loading ? (
          <Loader />
        ) : (
          filtered?.map((product: TabAccessPhone) => {
            return (
              <NavLink
                key={product.id}
                to={{ pathname: `${pathname}/${product.id}` }}
                className="productsPage__link"
              >
                <PhoneTablAccessCard product={product} />
              </NavLink>
            );
          })
        )}
      </ul>
      {showPagination ? <Pagination products={productItems} /> : null}
    </>
  );
};
