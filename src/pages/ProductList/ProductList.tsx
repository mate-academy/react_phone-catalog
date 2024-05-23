import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { SortByItem } from '../../helpers/sortBy';
import './ProductList.scss';
import React, { useEffect } from 'react';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import { PhoneTablAccessCard } from '../../components/PhoneTablAccessCard/PhoneTablAccessCard';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { useLocalStorage } from '../../LocaleStorage/LocaleStorage';

interface Props {
  products: TabAccessPhone[];
  sortBy?: SortByItem | undefined;
}

export const ProductList: React.FC<Props> = ({ products }) => {
  const { loading } = useAppSelector(state => state.products);

  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [choosenItems, setChoosenItems] = useLocalStorage<TabAccessPhone[] | []>('products', []);

  const sort = searchParams.get('sortBy') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? choosenItems.length : perPage;
  const firstItemIndex = (+currentPage - 1) * +itemsPerPage;
  const lastItemIndex = Math.min((+currentPage) * (+itemsPerPage), choosenItems.length);

  useEffect(() => {
    if (products.length) {
      setChoosenItems(products)
    }
  }, [products])

  function filteredProducts(items: TabAccessPhone[]) {
    switch (sort) {
      // case SortByItem.Age:
      //   return items?.sort((a, b) => (a.year - b.year ? 1 : -1));
      case SortByItem.Name:
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case SortByItem.Price:
        return items.sort((a, b) => a.priceDiscount - b.priceDiscount);
      default:
        return items;
    }
  }

  const toBeFiltered = filteredProducts(choosenItems);

  const filtered = toBeFiltered.slice(firstItemIndex, lastItemIndex);

  console.log('sort', sort)
  console.log('toBeFiltered', toBeFiltered)
  console.log('filtered', filtered)

  const showPagination = filtered.length < choosenItems.length;

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
                <PhoneTablAccessCard product={product} key={product.id}/>
              </NavLink>
            );
          })
        )}
      </ul>
      {showPagination ? <Pagination products={choosenItems} /> : null}
    </>
  );
};
